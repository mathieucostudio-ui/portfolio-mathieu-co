import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['googleapis', 'google-auth-library'],
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/d/**',
      },
    ],
  },
}

export default nextConfig
