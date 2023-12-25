module.exports.description = 'Create content model for Sitemap Index'

module.exports.up = (migration) => {
  const sitemapIndex = migration
    .createContentType('sitemapIndex')
    .name('Sitemap Index')
    .displayField('title')
    .description('Stores sitemap product index')

  sitemapIndex
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([{ unique: true }])

  sitemapIndex
    .createField('created')
    .name('created')
    .type('Date')
    .localized(false)
    .validations([])

  sitemapIndex
    .createField('updated')
    .name('updated')
    .type('Date')
    .localized(false)
    .validations([])

  sitemapIndex
    .createField('expirationDate')
    .name('expiration date')
    .type('Date')
    .localized(false)
    .validations([])

  sitemapIndex
    .createField('currentPage')
    .name('Current Page')
    .type('Integer')
    .localized(false)
    .validations([])

  sitemapIndex
    .createField('totalProducts')
    .name('Total Products')
    .type('Integer')
    .localized(false)
    .validations([])

  sitemapIndex
    .createField('totalPages')
    .name('Total Pages')
    .type('Integer')
    .validations([])

  sitemapIndex
    .createField('cursor')
    .name('Cursor')
    .type('Symbol')
    .validations([])

  sitemapIndex
    .createField('data')
    .name('Data')
    .type('RichText')
    .validations([
      {
        enabledMarks: [],
        message: 'Marks are not allowed',
      },
      {
        enabledNodeTypes: [],
        message: 'Nodes are not allowed',
      },
      {
        nodes: {},
      },
    ])
}

module.exports.down = (migration) => migration.deleteContentType('sitemapIndex')
