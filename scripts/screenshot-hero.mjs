import { launchBrowser } from "./browser.mjs";

const browser = await launchBrowser();
const page = await browser.newPage();
await page.setViewport({ width: 734, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 120000 });
await new Promise((r) => setTimeout(r, 5000));
const el = await page.$("main section");
await el.screenshot({ path: "public/verify/hero-element.png" });
await browser.close();
