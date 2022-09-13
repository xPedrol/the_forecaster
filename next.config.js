/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        NEXT_PUBLIC_API_GEO_LOCATION_TOKEN: process.env.NEXT_PUBLIC_API_GEO_LOCATION_TOKEN,
        NEXT_PUBLIC_API_GEO_LOCATION_URL: process.env.NEXT_PUBLIC_API_GEO_LOCATION_URL,
        NEXT_PUBLIC_API_WEATHER_URL: process.env.NEXT_PUBLIC_API_WEATHER_URL,
        NEXT_PUBLIC_API_WEATHER_TOKEN: process.env.NEXT_PUBLIC_API_WEATHER_TOKEN
    }
};

module.exports = nextConfig;
