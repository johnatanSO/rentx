/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  productionBrowserSourceMaps: true,
  generateEtags: false,
}

module.exports = nextConfig
