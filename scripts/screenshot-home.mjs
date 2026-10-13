import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { launchBrowser } from "./browser.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "verify");
const baseUrl = process.env.BASE_URL || "http://localhost:3000";

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 734, height: 2141, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle0", timeout: 120000 });
  await new Promise((r) => setTimeout(r, 5000));
  await page.evaluate(async () => {
    const step = 320;
    const max = document.body.scrollHeight;
    for (let y = 0; y < max; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 800));

  const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewport({ width: 734, height: Math.min(fullHeight, 4000), deviceScaleFactor: 1 });
  const shotPath = path.join(outDir, "homepage-built-734.png");
  await page.screenshot({ path: shotPath, fullPage: true });
  await browser.close();
  console.log("Saved", shotPath, "height", fullHeight);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
