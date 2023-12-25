module.exports.description = 'Create internal name for card'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const card = migration.editContentType('card')

  card
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

  card.displayField('name')

  card.moveField('name').toTheTop()

  migration.transformEntries({
    contentType: 'card',
    from: ['headline'],
    to: ['name'],
    transformEntryForLocale: (fields, locale) => {
      let currentValue = fields?.headline && fields.headline[locale]
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
  const card = migration.editContentType('card')

  card.displayField('headline')
  card.deleteField('name')
}
