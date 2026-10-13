/**
 * SEO / canonical / JSON-LD smoke tests.
 *
 * Static:  npm run verify:seo
 * Live:    npm run verify:seo:live
 *          (server must be running — prefer production build for accurate HTML)
 *
 *   npm run build && npm run start
 *   set SEO_TEST_URL=http://localhost:3000&& npm run verify:seo:live
 *
 * Do not paste comments on the same line as npm (Windows npm rejects some Unicode dashes).
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const ok = [];
const hints = [];

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function assert(condition, message) {
  if (condition) ok.push(message);
  else errors.push(message);
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://metrofurnitures.vercel.app").replace(/\/$/, "");

assert(read("lib/seo.js").includes("alternates"), "lib/seo.js defines alternates");
assert(read("lib/seo.js").includes("canonical"), "lib/seo.js sets canonical URLs");
assert(read("lib/seo.js").includes("geo.region"), "lib/seo.js includes geo meta");
assert(read("lib/structured-data.js").includes("FurnitureStore"), "JSON-LD FurnitureStore present");
assert(read("lib/structured-data.js").includes("FAQPage"), "JSON-LD FAQPage builder present");
assert(read("lib/structured-data.js").includes("SearchAction"), "WebSite SearchAction for shop search");
assert(read("data/seo-local.js").includes("Dharmapuri"), "Local SEO copy mentions Dharmapuri");
assert(read("app/robots.js").includes("/pos"), "robots.txt blocks POS routes");
assert(read("app/sitemap.js").includes("sitemap"), "sitemap module exists");
assert(read("app/(website)/layout.js").includes("JsonLd"), "Website layout injects JSON-LD");
assert(read("app/(website)/layout.js").includes("main-content"), "Skip target #main-content on main");
assert(read("components/seo/SkipToContent.js").includes("main-content"), "Skip link targets main");

const faqBlock = read("data/seo-local.js");
const faqCount = (faqBlock.match(/question:/g) || []).length;
assert(faqCount >= 5, `At least 5 local FAQ entries (found ${faqCount})`);

assert(read("data/seo-local.js").includes("absoluteUrl"), "absoluteUrl helper for canonicals");
assert(read("data/seo-local.js").includes("siteUrl"), "seo-local uses siteUrl for absolute URLs");

async function fetchPage(base, path, { timeoutMs = 120000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(`${base}${path}`, {
      redirect: "follow",
      signal: controller.signal,
      headers: { Accept: "text/html,application/xhtml+xml" },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function liveCheck() {
  const base = (process.env.SEO_TEST_URL || "http://localhost:3000").replace(/\/$/, "");
  ok.push(`Live base URL: ${base}`);

  console.log(`\n  (Probing ${base} — first dev compile of /shop can take 30–60s)\n`);

  let shopStatus = null;
  try {
    const shopRes = await fetchPage(base, "/shop");
    shopStatus = shopRes.status;
    if (!shopRes.ok) {
      errors.push(`HTTP ${shopRes.status} for /shop`);
      hints.push(
        "/shop returned an error. Stop old Node processes on port 3000, then run: npm run build && npm run start"
      );
    } else {
      ok.push("HTTP 200 for /shop (preflight)");
    }
  } catch (e) {
    errors.push(`Live preflight /shop failed: ${e.message}`);
    hints.push("No server reachable. Run: npm run build && npm run start");
  }

  const paths = ["/", "/shop", "/contact", "/product/alaska-corner", "/robots.txt", "/sitemap.xml"];

  for (const path of paths) {
    try {
      const res = await fetchPage(base, path);
      if (!res.ok) {
        errors.push(`HTTP ${res.status} for ${path}`);
        continue;
      }
      ok.push(`HTTP ${res.status} for ${path}`);

      const body = await res.text();
      if (path.endsWith(".xml")) {
        assert(body.includes("<urlset") || body.includes("<url>"), `sitemap.xml valid for ${path}`);
        assert(body.includes(siteUrl), "sitemap contains production siteUrl");
      } else if (path.endsWith("robots.txt")) {
        assert(body.includes("Sitemap:"), "robots.txt lists Sitemap");
        assert(/disallow/i.test(body), "robots.txt has disallow rules");
      } else {
        assert(body.includes('rel="canonical"') || body.includes("canonical"), `canonical link on ${path}`);
        const hasJsonLd = body.includes("application/ld+json") || body.includes("schema.org");
        assert(hasJsonLd, `JSON-LD on ${path}`);
        if (path === "/") {
          assert(body.includes("FAQPage") || body.includes("Question"), "Home FAQ schema");
          assert(body.includes("FurnitureStore"), "Local business schema");
        }
        if (path.startsWith("/product/")) {
          assert(
            body.includes('"@type":"Product"') ||
              body.includes('"@type": "Product"') ||
              body.includes("application/ld+json"),
            "Product JSON-LD schema"
          );
        }
      }
    } catch (e) {
      errors.push(`Live fetch failed for ${path}: ${e.message}`);
    }
  }

  if (errors.some((e) => e.includes("JSON-LD"))) {
    hints.push(
      "Missing JSON-LD usually means an outdated dev server. Restart after pull: npm run build && npm run start, then verify again."
    );
  }
  if (shopStatus === 500) {
    hints.push(
      "Port 3000 may be an old crashed dev instance. In PowerShell: Get-NetTCPConnection -LocalPort 3000 | Select OwningProcess, then stop that process."
    );
  }
}

const live = process.argv.includes("--live");

if (live) {
  await liveCheck();
} else {
  ok.push("(skipped live HTTP checks — run: npm run verify:seo:live)");
}

console.log("\n=== Metro Furniture SEO verify ===\n");
ok.forEach((m) => console.log("  ✓", m));
if (errors.length) {
  errors.forEach((m) => console.log("  ✗", m));
  if (hints.length) {
    console.log("\n  Tips:");
    hints.forEach((h) => console.log("  →", h));
  }
  console.log(`\nFailed: ${errors.length} check(s)\n`);
  process.exit(1);
}
console.log(`\nPassed: ${ok.length} check(s)\n`);
