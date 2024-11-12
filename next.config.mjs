/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    eslint: {
        ignoreDuringBuilds: true,
      },
    images: {
      unoptimized: true,
      domains: ["gaming-app.s3.amazonaws.com", "store.thevingame.com", "lh3.googleusercontent.com"],
    },
};

export default nextConfig;
