/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60,
  },
  logging: {
    fetches: {
      level: 'error',
    },
  },
};

export default nextConfig;
