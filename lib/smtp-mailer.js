import net from "node:net";
import tls from "node:tls";
import { business } from "@/data/business";

function waitForSocket(socket, eventName) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      socket.removeListener(eventName, onReady);
      socket.removeListener("error", onError);
    };
    const onReady = () => { cleanup(); resolve(); };
    const onError = (error) => { cleanup(); reject(error); };
    socket.once(eventName, onReady);
    socket.once("error", onError);
  });
}

class SmtpSession {
  constructor(socket) {
    this.socket = socket;
    this.socket.setTimeout(20000, () => {
      this.socket.destroy(new Error("SMTP operation timed out"));
    });
    this.buffer = "";
    this.lines = [];
    this.waiters = [];
    this.failure = null;
    this.onData = (chunk) => {
      this.buffer += Buffer.isBuffer(chunk) ? chunk.toString("utf8") : String(chunk);
      let end;
      while ((end = this.buffer.indexOf("\r\n")) >= 0) {
        const line = this.buffer.slice(0, end);
        this.buffer = this.buffer.slice(end + 2);
        const waiter = this.waiters.shift();
        if (waiter) waiter.resolve(line);
        else this.lines.push(line);
      }
    };
    this.onError = (error) => {
      this.failure = error;
      while (this.waiters.length) this.waiters.shift().reject(error);
    };
    this.onClose = () => {
      if (this.waiters.length) {
        const error = new Error("SMTP connection closed unexpectedly");
        while (this.waiters.length) this.waiters.shift().reject(error);
      }
    };
    socket.on("data", this.onData);
    socket.on("error", this.onError);
    socket.on("close", this.onClose);
  }

  detach() {
    this.socket.removeListener("data", this.onData);
    this.socket.removeListener("error", this.onError);
    this.socket.removeListener("close", this.onClose);
  }

  nextLine() {
    if (this.lines.length) return Promise.resolve(this.lines.shift());
    if (this.failure) return Promise.reject(this.failure);
    return new Promise((resolve, reject) => this.waiters.push({ resolve, reject }));
  }

  async readReply() {
    const lines = [];
    let code = null;
    while (true) {
      const line = await this.nextLine();
      lines.push(line);
      const match = line.match(/^(\d{3})([ -])([\s\S]*)$/);
      if (!match) throw new Error("Invalid SMTP server response");
      if (code === null) code = Number(match[1]);
      if (Number(match[1]) !== code) throw new Error("Inconsistent SMTP multiline response");
      if (match[2] === " ") break;
    }
    return { code, lines };
  }

  async command(command, acceptedCodes) {
    this.socket.write(`${command}\r\n`);
    const reply = await this.readReply();
    if (!acceptedCodes.includes(reply.code)) {
      throw new Error(`SMTP command failed with response ${reply.code}`);
    }
    return reply;
  }

  async startTls(host) {
    const rawSocket = this.socket;
    this.detach();
    const secureSocket = tls.connect({
      socket: rawSocket,
      servername: host,
      rejectUnauthorized: true,
    });
    await waitForSocket(secureSocket, "secureConnect");
    return new SmtpSession(secureSocket);
  }

  close() {
    try { this.socket.end(); } catch {}
  }
}

function encodeHeader(value) {
  const text = String(value || "");
  if (/^[\x20-\x7E]*$/.test(text)) return text;
  return `=?UTF-8?B?${Buffer.from(text, "utf8").toString("base64")}?=`;
}

function normaliseEmail(value) {
  const email = String(value || "").trim();
  if (!email || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    throw new Error("SMTP email address is invalid");
  }
  return email;
}

function base64Lines(value) {
  return Buffer.from(String(value || ""), "utf8").toString("base64").match(/.{1,76}/g)?.join("\r\n") || "";
}

export function getMailConfigurationStatus() {
  const port = Number(process.env.SMTP_PORT || 465);
  return {
    configured: Boolean(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      (process.env.SMTP_TO || process.env.ENQUIRY_NOTIFY_EMAIL || business.email)
    ),
    hostConfigured: Boolean(process.env.SMTP_HOST),
    port,
    toConfigured: Boolean(process.env.SMTP_TO || process.env.ENQUIRY_NOTIFY_EMAIL || business.email),
  };
}

/**
 * Sends a plain-text enquiry email using SMTP over TLS.
 * SMTP_PORT=465 uses implicit TLS; other ports must use STARTTLS before authentication.
 */
export async function sendSmtpMail({ subject, text, to } = {}) {
  const host = String(process.env.SMTP_HOST || "").trim();
  const username = String(process.env.SMTP_USER || "").trim();
  const password = String(process.env.SMTP_PASS || "");
  const configuredTo = to || process.env.SMTP_TO || process.env.ENQUIRY_NOTIFY_EMAIL || business.email;
  const rawRecipients = String(configuredTo || "").split(/[;,]/).map((item) => item.trim()).filter(Boolean);
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE.toLowerCase() === "true"
    : port === 465;

  if (!host || !username || !password || !rawRecipients.length) {
    return { sent: false, configured: false, reason: "smtp_not_configured" };
  }

  const recipients = rawRecipients.map(normaliseEmail);
  const from = normaliseEmail(process.env.SMTP_FROM || username);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return { sent: false, configured: true, reason: "smtp_port_invalid" };
  }

  let session;
  try {
    const socket = secure
      ? tls.connect({ host, port, servername: host, rejectUnauthorized: true })
      : net.createConnection({ host, port });
    socket.setTimeout(20000, () => socket.destroy(new Error("SMTP connection timed out")));
    await waitForSocket(socket, secure ? "secureConnect" : "connect");
    session = new SmtpSession(socket);
    const greeting = await session.readReply();
    if (greeting.code !== 220) throw new Error(`SMTP greeting failed with response ${greeting.code}`);

    const ehloName = String(process.env.SMTP_EHLO_DOMAIN || "localhost").replace(/[^a-zA-Z0-9.-]/g, "") || "localhost";
    await session.command(`EHLO ${ehloName}`, [250]);

    if (!secure) {
      if (process.env.SMTP_STARTTLS === "false") {
        throw new Error("Refusing to send SMTP credentials without TLS");
      }
      await session.command("STARTTLS", [220]);
      session = await session.startTls(host);
      await session.command(`EHLO ${ehloName}`, [250]);
    }

    await session.command("AUTH LOGIN", [334]);
    await session.command(Buffer.from(username, "utf8").toString("base64"), [334]);
    await session.command(Buffer.from(password, "utf8").toString("base64"), [235]);

    await session.command(`MAIL FROM:<${from}>`, [250]);
    for (const recipient of recipients) {
      await session.command(`RCPT TO:<${recipient}>`, [250, 251]);
    }
    await session.command("DATA", [354]);

    const date = new Date().toUTCString();
    const messageId = `<${Date.now()}.${Math.random().toString(16).slice(2)}@${ehloName}>`;
    const toHeader = recipients.join(", ");
    const subjectHeader = encodeHeader(subject || "New Metro Furniture enquiry");
    const body = base64Lines(text || "New website enquiry received.");
    const messageHeadersAndBody = [
      `From: Metro Furniture Website <${from}>`,
      `To: ${toHeader}`,
      `Subject: ${subjectHeader}`,
      `Date: ${date}`,
      `Message-ID: ${messageId}`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: base64",
      "",
      body,
    ].join("\r\n");
    // SMTP DATA terminator must be exactly one dot line; do not send bytes after it.
    session.socket.write(`${messageHeadersAndBody}\r\n.\r\n`);
    const result = await session.readReply();
    if (result.code !== 250) throw new Error(`SMTP message delivery failed with response ${result.code}`);
    await session.command("QUIT", [221]);
    session.close();
    return { sent: true, configured: true, recipientCount: recipients.length };
  } catch (error) {
    session?.close();
    // Server logs get the transport detail; callers receive only a generic status.
    console.error("[smtp-mailer] Enquiry email failed:", error?.message || "unknown SMTP error");
    return { sent: false, configured: true, reason: "smtp_delivery_failed" };
  }
}
