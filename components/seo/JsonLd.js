/**
 * Renders JSON-LD for SEO / AEO / GEO. Pass a single object or { @graph: [...] }.
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  const payload = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
