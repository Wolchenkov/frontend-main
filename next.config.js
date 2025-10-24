/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
    domains: ['brave.aic.ru'],
  },
};

module.exports = nextConfig;
