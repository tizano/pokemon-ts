import createJiti from 'jiti';
import { fileURLToPath } from 'node:url';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/config/env.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tcgdex.net',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: '**.pokemon.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     console.log('isServer');
  //     // Ne pas inclure les modules 'path' et autres modules Node.js côté client
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       path: false,
  //       fs: false,
  //       // Ajoutez d'autres modules Node.js si nécessaire
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
