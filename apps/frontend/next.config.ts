import type { NextConfig } from "next";

import { fileURLToPath } from "node:url";

const getRoot = (rootPath = "/") => fileURLToPath(new URL(rootPath, import.meta.url));

const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
	devIndicators: {
		position: "bottom-right",
	},

	...(isDev && {
		turbopack: {
			root: getRoot(),
		},
	}),

	eslint: {
		ignoreDuringBuilds: true,
	},

	images: {
		remotePatterns: [
			{
				hostname: "health.gov",
				pathname: "/**",
				port: "",
				protocol: "https",
			},
			{
				hostname: "odphp.health.gov",
				pathname: "/**",
				port: "",
				protocol: "https",
			},
			{
				hostname: "res.cloudinary.com",
				pathname: "/**",
				port: "",
				protocol: "https",
			},
			{
				hostname: "avatar.iran.liara.run",
				pathname: "/**",
				port: "",
				protocol: "https",
			},
		],
	},

	typescript: {
		ignoreBuildErrors: true,
	},
} satisfies NextConfig;

export default nextConfig;
