/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        API_GEO_LOCATION_TOKEN: '',
        API_GEO_LOCATION_URL: '',
        API_WEATHER_URL: '',
        API_WEATHER_TOKEN: ''
    }
};

module.exports = nextConfig;
