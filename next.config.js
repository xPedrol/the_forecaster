/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        API_GEO_LOCATION_TOKEN: 'NG9IUHRZbUl0cVA3WXhnQmtsbTFkVE9VYmxSS1F0bVlDTUdOa043SQ==',
        API_GEO_LOCATION_URL: 'https://api.countrystatecity.in/v1',
        API_WEATHER_URL: 'https://api.openweathermap.org/data/2.5',
        API_WEATHER_TOKEN: '03b8ccb4a95de7bd543b4d8ccc9bb33b'
    }
};

module.exports = nextConfig;
