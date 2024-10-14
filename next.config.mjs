/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    eslint: {
        ignoreDuringBuilds: true,
      },
    images: {
      unoptimized: true,
      domains: ["gaming-app.s3.amazonaws.com"],
    },
};

export default nextConfig;
