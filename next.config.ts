import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "raw.githubusercontent.com",
        port: '',
        search: ''
      },
      {
        protocol: 'https',
        hostname: "pokeapi.co",
        port: '',
        search: ''
      }
    ]
  }
};

export default nextConfig;
