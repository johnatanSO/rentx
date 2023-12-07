/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'http://localhost:3333',
      'localhost',
      'https://rentx-webservice.onrender.com',
      'rentx-webservice.onrender',
      'rentx-webservice',
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
