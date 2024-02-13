/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.tpx.cz',
                port: ''
            },
        ]
    }
};

export default nextConfig;
