/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  productionBrowserSourceMaps: true,
  generateBuildId: async () => {
    return "Valentine.v2026";
  },
};

export default nextConfig;
