/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: 'http://localhost:3000/api'
  }
}

module.exports = nextConfig
