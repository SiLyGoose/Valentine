/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	productionBrowserSourceMaps: true,
	generateBuildId: async () => {
		return "SiLyGoose.WebFolio-v2.0";
	},
};

export default nextConfig;
