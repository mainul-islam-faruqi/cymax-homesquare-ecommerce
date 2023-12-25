const { StatsWriterPlugin } = require('webpack-stats-plugin')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const imageUnoptmized =
  typeof process.env.IMAGE_UNOPTMIZED !== undefined &&
  process.env.IMAGE_UNOPTMIZED == 'false'
    ? false
    : true

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 3600 * 24 * 30,
    domains: [
      'images.ctfassets.net',
      'media.cymaxstores.com',
      's3-us-east-2.amazonaws.com',
      'files-na.epusercontent.com',
      'cdn.pixabay.com',
      'pandora-cpd.imgix.net',
      '0e8e4047a847b1569b05-4d44a9f7ddd78f414d7cd516abb401eb.ssl.cf1.rackcdn.com',
      'c8.staticflickr.com',
    ],
    unoptimized: imageUnoptmized,
  },
  experimental: {
    esmExternals: false,
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  webpack(config, { isServer }) {
    if (process.env.ANALYZE === 'true' && !isServer) {
      config.optimization.usedExports = true
      config.plugins.push(
        new StatsWriterPlugin({
          filename: '../webpack-stats-plugin.json',
          stats: {
            assets: true,
            chunks: true,
            chunksModule: true,
            modules: true,
          },
        })
      )
    }
    return config
  },
  async headers() {
    return []
  },
  async rewrites() {
    return [
      {
        source: '/sitemap-products-:pid.xml',
        destination: '/sitemap-products/:pid',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/MyAccount/Login.aspx',
        destination: '/account/login',
        permanent: false,
      },
      {
        source: '/Portal/Account/CreateAccount.aspx',
        destination: '/account/login',
        permanent: false,
      },
      {
        source: '/Portal/Account/OrderStatus.aspx',
        destination: '/contact-us',
        permanent: false,
      },
      {
        source: '/Portal/Pages/Help.aspx',
        destination: '/contact-us',
        permanent: false,
      },
      {
        source: '/sales--p1.htm',
        destination: '/Furniture--PC100078.htm',
        permanent: false,
      },
      {
        source: '/promotiononsalenow-office-furniture--C0.htm',
        destination: '/Furniture--PC100078.htm',
        permanent: false,
      },
      {
        source: '/Portal/BusinessProgram/InquiryForm.aspx',
        destination: '/contact-us',
        permanent: false,
      },
      {
        source: '/Portal/Pages/OrderingInfo.aspx',
        destination: '/ordering-information-receivingmyorder',
        permanent: false,
      },
      {
        source: '/Portal/Pages/Returns.aspx',
        destination: '/returns-returnspolicy',
        permanent: false,
      },
      {
        source: '/Portal/Pages/Contact.aspx',
        destination: '/contact-us',
        permanent: false,
      },
      {
        source: '/Portal/Pages/AccessibilityPolicy.aspx',
        destination: '/accessibility-statement',
        permanent: false,
      },
      {
        source: '/Portal/Pages/TermsAndConditions.aspx',
        destination: '/terms-conditions',
        permanent: false,
      },
      {
        source: '/Portal/Pages/PrivacyPolicy.aspx',
        destination: '/privacy-policy',
        permanent: false,
      },
      {
        source: '/Portal/Pages/CookiePolicy.aspx',
        destination: '/cookie-policy',
        permanent: false,
      },
      {
        source: '/Portal/Pages/SecurityPractices.aspx',
        destination: '/security-policy',
        permanent: false,
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)
