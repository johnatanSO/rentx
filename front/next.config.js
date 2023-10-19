/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['http://localhost:3333', 'localhost'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
