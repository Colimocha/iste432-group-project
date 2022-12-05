/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['placeimg.com', 'avatars.dicebear.com'],
  },
};

module.exports = nextConfig;
