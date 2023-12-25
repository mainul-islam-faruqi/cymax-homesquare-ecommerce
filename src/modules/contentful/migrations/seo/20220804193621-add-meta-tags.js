module.exports.description =
  'Adding field Meta Tags to seo content type AUG 4th 2022'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const seo = migration.editContentType('seo')
  seo
    .createField('metaTags')
    .name('Meta Tags')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['metaTags'],
        },
      ],

      linkType: 'Entry',
    })
}

module.exports.down = (migration) => {
  const seo = migration.editContentType('seo')

  seo.deleteField('metaTags')
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
}
