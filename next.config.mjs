const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['localhost', 'pokemon.com', 'example.com'],
    remotePatterns: [
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ne pas inclure les modules 'path' et autres modules Node.js côté client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        path: false,
        fs: false,
        // Ajoutez d'autres modules Node.js si nécessaire
      };
    }
    return config;
  },
};

export default nextConfig;
