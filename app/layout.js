import { Playfair_Display, Inter, Noto_Sans_Tamil, Manrope } from "next/font/google";
import { business, seoKeywords, siteUrl } from "@/data/business";
import { absoluteUrl, defaultOgImage, localGeo, localSeoKeywords } from "@/data/seo-local";
import CampaignAttributionCapture from "@/components/marketing/CampaignAttributionCapture";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-pos",
  display: "swap",
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-noto-tamil",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | ${business.tagline}`,
    template: `%s | ${business.shortName}`,
  },
  description: `${business.name} — ${business.tagline}. Visit our Salem Main Road, Senthil Nagar showroom in Dharmapuri for sofas, dining sets, beds, lighting and custom furniture. ${business.taglineSecondary}`,
  keywords: [...seoKeywords, ...localSeoKeywords],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  authors: [{ name: business.name }],
  openGraph: {
    title: business.name,
    description: `${business.tagline}. Sofas, beds, dining, wardrobes & more in Dharmapuri.`,
    url: siteUrl,
    siteName: business.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: `${business.name} Dharmapuri` }],
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    description: business.tagline,
    images: [defaultOgImage],
  },
  other: {
    "geo.region": localGeo.region,
    "geo.placename": localGeo.placename,
    "geo.position": `${localGeo.latitude};${localGeo.longitude}`,
    ICBM: localGeo.icbm,
    locality: business.address.city,
    region: business.address.state,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/metro-mark.png", type: "image/png", sizes: "512x512" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${inter.variable} ${notoTamil.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full antialiased"><CampaignAttributionCapture />{children}</body>
    </html>
  );
}
