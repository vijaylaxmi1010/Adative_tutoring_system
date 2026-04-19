/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  // Skip type-check during `next build` — run `npm run typecheck` separately
  typescript: { ignoreBuildErrors: true },

  // Limit concurrent workers so the build stays within 500 MB RAM
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
