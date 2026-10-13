import { launchBrowser } from "./browser.mjs";

const widths = [390, 734, 1024, 1280, 1440, 1920];

const browser = await launchBrowser();
const page = await browser.newPage();

for (const w of widths) {
  await page.setViewport({ width: w, height: 900 });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() =>
    page.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded", timeout: 60000 })
  );
  await new Promise((r) => setTimeout(r, 2000));
  const m = await page.evaluate(() => {
    const el = document.querySelector("header .container");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      rectWidth: Math.round(r.width),
      maxWidth: cs.maxWidth,
      paddingLeft: cs.paddingLeft,
      paddingRight: cs.paddingRight,
      marginLeft: cs.marginLeft,
      marginRight: cs.marginRight,
    };
  });
  console.log(`viewport ${w}px:`, m);
}

await browser.close();
