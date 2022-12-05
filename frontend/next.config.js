/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['placeimg.com', 'avatars.dicebear.com', 'randomuser.me'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

https: module.exports = nextConfig;
