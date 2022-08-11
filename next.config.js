/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        API_URL: 'https://apiadvisor.climatempo.com.br/api',
        API_TOKEN: '58cc85da276b2de25ae44e2704b174e8'
    }
};

module.exports = nextConfig;
