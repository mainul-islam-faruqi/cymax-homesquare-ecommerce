module.exports.description = 'Adds site field to sitemapPage'

module.exports.up = (migration) => {
  const sitemapPage = migration.editContentType('sitemapPage')

  sitemapPage
    .createField('site')
    .name('Site')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        in: ['cymax', 'homesquare'],
      },
    ])
    .disabled(false)
    .omitted(false)
}

module.exports.down = (migration) => {
  const sitemapPage = migration.editContentType('sitemapPage')
  sitemapPage.deleteField('site')
}
