module.exports.description = 'Consistent intenal identifier and add site'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const megaMenu = migration.editContentType('megaMenu')

  megaMenu.changeFieldId('identifier', 'name')

  megaMenu
    .editField('name')
    .name('Internal Name')
    .validations([
      {
        regexp: {
          pattern: '^[a-z0-9\\-\\_]+$',
          flags: null,
        },

        message:
          'Internal Name may only contain lower case characters, underscores, digits and/or dashes',
      },
    ])

  megaMenu.displayField('name')

  megaMenu.moveField('name').toTheTop()

  megaMenu.deleteField('internalTitle')

  megaMenu
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

  megaMenu.changeFieldControl('site', 'builtin', 'dropdown', {
    helpText: 'Please select a site this theme applies to.',
  })

  megaMenu.moveField('site').afterField('name')
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
}
