import BuilderDevTools from '@builder.io/dev-tools/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = BuilderDevTools()({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
});

export default nextConfig;
