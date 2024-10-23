/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'a1tvj0wtyb3ubfje.public.blob.vercel-storage.com',
			},
		],
	},
};

export default nextConfig;
