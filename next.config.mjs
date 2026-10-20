/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "content.jdmagicbox.com",
      },
      {
        protocol: "https",
        hostname: "content2.jdmagicbox.com",
      },
      {
        protocol: "https",
        hostname: "akam.cdn.jdmagicbox.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/furniture", destination: "/shop", permanent: true },
      { source: "/offers", destination: "/shop", permanent: true },
      { source: "/custom-design", destination: "/contact", permanent: true },
      { source: "/branches", destination: "/contact", permanent: true },
      // Legacy product URLs after the refreshed sofa catalogue naming.
      { source: "/product/dollar-corner", destination: "/product/zara-corner", permanent: true },
      { source: "/product/cairo-sofa", destination: "/product/sagar-corner", permanent: true },
      { source: "/product/stuart-sofa", destination: "/product/stuart-sofa-44999", permanent: true },
      { source: "/product/dinesh-sofa", destination: "/product/samson-sofa", permanent: true },
      { source: "/product/rolex-sofa", destination: "/product/stuart-sofa-44999", permanent: true },
      { source: "/product/monaco-corner", destination: "/product/venus-sofa", permanent: true },
      { source: "/product/sierra-sofa", destination: "/product/atlas-sofa", permanent: true },
      { source: "/product/windsor-recliner-sofa", destination: "/product/kisan-sofa", permanent: true },
      { source: "/product/oxford-corner", destination: "/product/metro-sofa", permanent: true },
      { source: "/product/ruby-velvet-sofa", destination: "/product/stuart-sofa-43999", permanent: true },
      { source: "/product/nova-corner", destination: "/product/unique-sofa", permanent: true },
      { source: "/product/grand-bay-corner", destination: "/product/alaska-corner", permanent: true },
      { source: "/product/onyx-leather-sofa", destination: "/product/rocker-sofa", permanent: true },
    ];
  },
};

export default nextConfig;
