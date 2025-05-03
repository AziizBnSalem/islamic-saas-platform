import withPWA from 'next-pwa';
/** @type {import('next').NextConfig} */



const pwaConfig = withPWA({
  dest: 'public', // Where service worker and assets will be generated
  register: true, // Automatically register the service worker
  skipWaiting: true, // Skip waiting for service worker activation
  disable: process.env.NODE_ENV === 'development', // Optional: Disable PWA in development
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    esmExternals: "loose",
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      util: false,
    };
    return config;
  },
};

export default nextConfig;