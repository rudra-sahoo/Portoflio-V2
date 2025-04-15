/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Remove output configuration and add font configuration
  experimental: {
    appDir: true,
  }
};

module.exports = nextConfig;
