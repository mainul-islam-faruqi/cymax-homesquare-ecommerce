module.exports.description = 'Create internal name for cta'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const cta = migration.editContentType('cta')

  cta
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

  cta.displayField('name')

  cta.moveField('name').toTheTop()

  migration.transformEntries({
    contentType: 'cta',
    from: ['identifier'],
    to: ['name'],
    transformEntryForLocale: (fields, locale) => {
      let currentValue = fields?.identifier && fields.identifier[locale]
      if (currentValue) {
        currentValue = currentValue
          .toLocaleLowerCase()
          .replace(/ /g, '-')
          .replace('/', '')
          .trim()
      }
      return {
        name: currentValue || '',
      }
    },
    shouldPublish: false,
  })
  cta.deleteField('identifier')
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const cta = migration.editContentType('cta')

  cta
    .createField('identifier')
    .name('Identifier')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  cta.moveField('identifier').toTheTop()

  migration.transformEntries({
    contentType: 'cta',
    from: ['name'],
    to: ['identifier'],
    transformEntryForLocale: (fields, locale) => {
      let currentValue = fields?.name && fields.name[locale]
      return {
        identifier: currentValue || '',
      }
    },
    shouldPublish: true,
  })

  cta.displayField('identifier')
  cta.deleteField('name')
}
