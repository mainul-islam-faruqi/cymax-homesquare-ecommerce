module.exports.description = 'Create content model for Sitemap Index'

module.exports.up = (migration) => {
  const sitemapPage = migration
    .createContentType('sitemapPage')
    .name('Sitemap Page')
    .displayField('title')
    .description('Stores sitemap product page content')

  sitemapPage
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])

  sitemapPage
    .createField('created')
    .name('created')
    .type('Date')
    .localized(false)
    .required(true)
    .validations([])

  sitemapPage
    .createField('updated')
    .name('updated')
    .type('Date')
    .localized(false)
    .required(true)
    .validations([])

  sitemapPage
    .createField('expirationDate')
    .name('expiration date')
    .type('Date')
    .localized(false)
    .required(true)
    .validations([])

  sitemapPage
    .createField('page')
    .name('Page')
    .type('Integer')
    .localized(false)
    .validations([])

  sitemapPage
    .createField('xmlFile')
    .name('Total Products')
    .type('Link')
    .linkType('Asset')
    .localized(false)
    .validations([])
}

module.exports.down = (migration) => migration.deleteContentType('sitemapPage')
