/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    experimental: {
        reactCompiler: true,
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    images: { unoptimized: true }
};

module.exports = nextConfig;
