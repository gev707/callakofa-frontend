const withImages = require('next-images')
const withFonts = require('next-fonts')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  cssModules: true,
  eslint: {
    // !! WARN !!
    // This can slow down how long pages take to compile during development
    // !! WARN !!
    dev: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = withBundleAnalyzer(withFonts(withImages(nextConfig)))
