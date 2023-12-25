const {
  removeTrailingSlash,
} = require('./src/modules/app/utils/removeTrailingSlash.js')

const siteUrl =
  removeTrailingSlash(process.env.APP_DOMAIN) || 'https://www.cymax.com'

/** @type { import('next-sitemap')IConfig} */
module.exports = {
  siteUrl: siteUrl,
  sitemapSize: 5000 /** Number of URLs in each sitemap file */,
  exclude: ['/csa-login', '/account*', '/cart*', '/checkout*', '/sitemap-*'],
  /** Robots.txt settings */
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: ['*'],
        disallow: [
          '/cart',
          '/csa-login',
          '/checkout/',
          '/account/',
          '/api/',
          '/account/csa-profile',
        ],
      },
      {
        userAgent: ['Yandex', 'Pinterestbot', 'PetalBot', 'Scrapy'],
        disallow: ['/'],
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap-nodes.xml`,
      `${siteUrl}/sitemap-pages.xml`,
      `${siteUrl}/sitemap-products-index.xml`,
    ],
  },
}
