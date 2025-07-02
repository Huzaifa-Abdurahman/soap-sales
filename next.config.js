/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/soap-sales-tracker' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/soap-sales-tracker/' : '',
}

module.exports = nextConfig
