import { siteUrl } from "@/data/business";

const privatePrefixes = [
  "/dashboard",
  "/pos",
  "/login",
  "/products",
  "/sales",
  "/customers",
  "/inventory",
  "/payments",
  "/returns",
  "/reports",
  "/settings",
  "/users",
  "/analytics",
  "/categories",
  "/price-tags",
  "/invoice",
  "/api",
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePrefixes,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl.replace(/\/$/, ""),
  };
}
