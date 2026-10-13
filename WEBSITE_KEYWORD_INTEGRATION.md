# Metro Furniture — Website Keyword Integration

## What is integrated into the website
- `data/seo-keyword-map.json` contains compact, page-specific selections drawn from the 5,000-keyword research library.
- `data/seo-targets.js` returns curated keywords for actual product, category, shop and collections pages.
- Product metadata now uses product-specific name/model/category/colour/material/location phrases from the mapped library.
- Category metadata uses category/location/showroom phrases.
- Main shop and collections metadata uses a concise set of core product and local showroom terms.
- `lib/seo.js` now avoids repeating the same full global keyword list on every page when a page-specific keyword list is supplied.
- `components/seo/LocalFurnitureContent.js` adds visible, useful copy with product/category details, showroom address and hours, links to measurement/booking tools, and availability/quote guidance on product, category, shop and collections pages.

## Keyword library files
- `seo/metro-furniture-keyword-research-5000.csv`
- `seo/metro-furniture-keyword-research-5000.json`
- Both files contain 5,000 unique keyword phrases covering 46 catalogue products and 13 location variants.

## SEO note
The entire 5,000-term file is for research, content planning and future phrase-to-page mapping. It is not inserted wholesale into page content or metadata. Google's guidance says the meta-keywords tag is ignored for Search ranking and warns against keyword stuffing. The website uses relevant page-specific terms and visible user-serving local copy instead.

## Validation results
- 5,000 research phrases and unique count verified.
- Active page mapping verified for 46 products and 8 categories.
- Product/category/shop/collections metadata and visible content component wiring verified.
- 242 JavaScript/JSX/TypeScript files parsed with zero syntax diagnostics.
- All referenced local product image/gallery paths verified.
- CSS braces balanced.
- Full Next.js production build and screenshot-based browser QA remain to be run in an npm-enabled environment.

## Before deployment
```bash
npm ci
npm run lint
npm run build
```
