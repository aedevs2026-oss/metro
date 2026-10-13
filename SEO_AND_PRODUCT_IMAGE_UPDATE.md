# Metro Furniture — Product Image Blend + SEO Keyword Update

## Product image display
Product catalogue photos now use an ivory/champagne image canvas and a multiply-blend treatment in product cards, detail galleries and related-product cards. This makes pale edges and neutral photo backdrops visually blend into the card background while preserving the actual product photos (including light upholstery and mattress detail). The source product images and catalogue paths remain unchanged; no destructive automatic background deletion has been performed.

## 5,000-keyword research library
- `seo/metro-furniture-keyword-research-5000.csv`
- `seo/metro-furniture-keyword-research-5000.json`

The library contains exactly 5,000 unique product/brand/location phrases covering all 46 current catalogue products and 13 Dharmapuri / Tamil Nadu service-area variants. Each row includes the phrase, brand, product name, slug, model, category, location and intent.

## Applied SEO code
- `data/seo-targets.js` creates small page-specific keyword sets from actual product/category data.
- Product detail metadata uses actual product name, model, category, tags and Dharmapuri terms.
- Category metadata uses the actual category and local showroom terms.
- Shop and Collections metadata use a concise locally relevant keyword subset.

## SEO use warning
Do not publish the complete 5,000-term list as hidden text, a keyword block on the website, or the meta-keywords field on every page. Google's documentation says the meta keywords tag is ignored for ranking and warns against keyword stuffing. Use the list for research, ad groups, content planning and mapping relevant terms to useful pages.

## Verification status
- 5,000 unique phrases generated and count checked.
- All 46 catalogue products represented and 13 localities represented.
- Product image paths and referenced local assets are validated.
- JavaScript/JSX/TypeScript parsing and ZIP integrity checks are run during packaging.
- Full Next.js production build/browser QA still needs to be run in an npm-enabled environment.


## Verification results
- Keyword rows: 5000; unique phrases: 5000; product slugs covered: 46; locality variants: 13.
- Product data files checked: 46 products and all referenced local image files.
- TypeScript parser: 241 JavaScript/JSX/TypeScript files, zero parse diagnostics.
- CSS braces balanced and image-blend classes wired into four product views.
- Full Next.js production build and screenshot-based browser QA remain pending.
