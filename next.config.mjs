/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DIRECTUS_URL: process.env.DIRECTUS_URL
    }
};

export default nextConfig;
