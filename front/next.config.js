/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      'storage.googleapis.com',
      'api-rentx-john.s3.sa-east-1.amazonaws.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'api-rentx-john.s3.sa-east-1.amazonaws.com',
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
