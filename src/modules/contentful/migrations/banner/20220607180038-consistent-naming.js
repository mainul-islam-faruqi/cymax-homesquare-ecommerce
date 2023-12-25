module.exports.description = 'Create internal name for banner'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const banner = migration.editContentType('banner')

  banner
    .createField('name')
    .name('Internal Name')
    .type('Symbol')
    .required(true)
    .validations([
      {
        unique: true,
      },
      {
        regexp: {
          pattern: '^[a-z0-9\\-\\_]+$',
          flags: null,
        },

        message:
          'Internal Name may only contain lower case characters, underscores, digits and/or dashes',
      },
    ])
    .disabled(false)
    .omitted(false)

  banner.displayField('name')

  banner.moveField('name').toTheTop()

  migration.transformEntries({
    contentType: 'banner',
    from: ['title'],
    to: ['name'],
    transformEntryForLocale: (fields, locale) => {
      let currentValue = fields?.title && fields.title[locale]
      if (currentValue) {
        currentValue = currentValue
          .toLocaleLowerCase()
          .replace(/ /g, '-')
          .trim()
      }
      return {
        name: currentValue || '',
      }
    },
    shouldPublish: false,
  })
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const banner = migration.editContentType('banner')

  banner.displayField('title')
  banner.deleteField('name')
}
