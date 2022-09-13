/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        API_GEO_LOCATION_TOKEN: process.env.API_GEO_LOCATION_TOKEN,
        API_GEO_LOCATION_URL: process.env.API_GEO_LOCATION_URL,
        API_WEATHER_URL: process.env.API_WEATHER_URL,
        API_WEATHER_TOKEN: process.env.API_WEATHER_TOKEN
    }
};

module.exports = nextConfig;
