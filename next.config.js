/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com']
  },
  async rewrites() {
    return [
      {
        source: '/shop/product/:id/:slug',
        destination: '/shop/product/[...slug]'
      },
      {
        source: '/shop',
        destination: '/shop'
      }
    ];
  }
};

module.exports = nextConfig;
