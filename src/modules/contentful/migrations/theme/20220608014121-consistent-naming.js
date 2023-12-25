module.exports.description = 'Add internal name validation and site dropdown'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const theme = migration.editContentType('theme')

  theme
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

  theme.displayField('name')

  theme.moveField('name').toTheTop()

  migration.transformEntries({
    contentType: 'theme',
    from: ['identifier'],
    to: ['name'],
    transformEntryForLocale: (fields, locale) => {
      let currentValue = fields?.identifier && fields.identifier[locale]
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
    shouldPublish: true,
  })

  theme.deleteField('identifier')

  theme
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

  theme.changeFieldControl('site', 'builtin', 'dropdown', {
    helpText: 'Please select a site this theme applies to.',
  })

  theme.moveField('site').afterField('name')
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const theme = migration.editContentType('theme')

  theme
    .createField('identifier')
    .name('Identifier')
    .type('Symbol')
    .localized(false)
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
          'Identifiers may only contain lower case characters, underscores, digits and/or dashes',
      },
    ])
    .disabled(false)
    .omitted(false)

  theme.moveField('identifier').toTheTop()

  migration.transformEntries({
    contentType: 'theme',
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

  theme.displayField('identifier')
  theme.deleteField('name')
  theme.deleteField('site')
}
