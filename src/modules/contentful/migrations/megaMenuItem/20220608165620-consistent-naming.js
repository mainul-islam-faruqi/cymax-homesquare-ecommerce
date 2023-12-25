module.exports.description = 'Add consistent name'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples

  const megaMenuItem = migration.editContentType('megaMenuItem')

  megaMenuItem.changeFieldId('internalTitle', 'name')

  megaMenuItem
    .editField('name')
    .name('Internal Name')
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

  megaMenuItem.displayField('name')

  megaMenuItem.moveField('name').toTheTop()

  migration.transformEntries({
    contentType: 'megaMenuItem',
    from: ['name'],
    to: ['name'],
    transformEntryForLocale: (fields, locale) => {
      let currentValue = fields?.name && fields.name[locale]
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
}
