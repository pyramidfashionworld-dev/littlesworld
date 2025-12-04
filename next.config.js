module.exports = {
  images: {
    domains: ['littlesworld.co.in'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  swcMinify: true,
  experimental: {
    isrMemoryCacheSize: 50 * 1024 * 1024,
  }
}