/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'http://localhost:3333',
      'localhost',
      'https://rentx-webservice.onrender.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rentx-webservice.onrender.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
