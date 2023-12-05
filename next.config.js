/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.googleusercontent.**' },
      { protocol: 'https', hostname: '**.googleapis.**' },
    ],
  },
};

module.exports = nextConfig;
