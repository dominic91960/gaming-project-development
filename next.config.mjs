/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["gaming-app.s3.amazonaws.com"],
  },
};

export default nextConfig;
