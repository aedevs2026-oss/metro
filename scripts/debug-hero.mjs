import { launchBrowser } from "./browser.mjs";

const browser = await launchBrowser();
const page = await browser.newPage();
await page.setViewport({ width: 734, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 120000 });
await new Promise((r) => setTimeout(r, 5000));
const info = await page.evaluate(() => {
  const img = document.querySelector("main section img");
  const section = document.querySelector("main section");
  if (!img || !section) return { error: "missing" };
  const imgStyle = getComputedStyle(img);
  const rect = img.getBoundingClientRect();
  return {
    src: img.currentSrc || img.src,
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    opacity: imgStyle.opacity,
    sectionBg: getComputedStyle(section).backgroundColor,
    imgRect: { w: rect.width, h: rect.height },
  };
});
const pixel = await page.evaluate(() => {
  const img = document.querySelector("main section img");
  const canvas = document.createElement("canvas");
  canvas.width = 20;
  canvas.height = 20;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, 20, 20);
  const d = ctx.getImageData(10, 10, 1, 1).data;
  return [...d];
});
console.log(info);
console.log("img pixel rgba", pixel);
await browser.close();
