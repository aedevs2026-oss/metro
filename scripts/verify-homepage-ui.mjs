import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { launchBrowser } from "./browser.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "verify");
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const refPath = path.join(root, "public", "homepage", "design-reference.png");

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle0", timeout: 120000 });
  await new Promise((r) => setTimeout(r, 4000));

  const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewport({ width: 1440, height: Math.min(fullHeight, 12000), deviceScaleFactor: 1 });
  const builtPath = path.join(outDir, "homepage-built-1440.png");
  await page.screenshot({ path: builtPath, fullPage: true });
  await browser.close();

  const refExists = fs.existsSync(refPath);
  console.log(JSON.stringify({
    built: builtPath,
    reference: refExists ? refPath : null,
    pageHeight: fullHeight,
    baseUrl,
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
