module.exports.description = 'Adds site field to sitemapIndex'

module.exports.up = (migration) => {
  const sitemapIndex = migration.editContentType('sitemapIndex')

  sitemapIndex
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
  const sitemapIndex = migration.editContentType('sitemapIndex')
  sitemapIndex.deleteField('site')
}
