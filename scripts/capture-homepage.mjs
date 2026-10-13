/**
 * Capture full-page homepage screenshot after production build.
 * Usage: node scripts/capture-homepage.mjs [port]
 */
import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.argv[2] || "3000";
const outDir = path.join(__dirname, "..", "pages");
const outFile = path.join(outDir, "homepage-built-screenshot.png");
const url = `http://localhost:${port}/`;

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });
await page
  .waitForFunction(
    () => !document.querySelector('[aria-label="Loading Metro Furniture"]'),
    { timeout: 15000 },
  )
  .catch(() => {});
await new Promise((r) => setTimeout(r, 600));
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const step = Math.max(window.innerHeight * 0.75, 500);
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await delay(450);
    }
    window.scrollTo(0, 0);
    await delay(500);
  });
await mkdir(outDir, { recursive: true });
await page.screenshot({ path: outFile, fullPage: true });
await browser.close();
console.log(`Saved ${outFile}`);
