/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	productionBrowserSourceMaps: true,
	generateBuildId: async () => {
		return "Valentine.v2025";
	},
};

export default nextConfig;
