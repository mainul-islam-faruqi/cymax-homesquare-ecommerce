module.exports.description = '<Put your description here>'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const megaMenuItem = migration.editContentType('megaMenuItem')

  megaMenuItem
    .createField('link')
    .name('Link')
    .type('Link')
    .localized(true)
    .required(false)
    .validations([
      {
        linkContentType: ['cta'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')

  megaMenuItem.moveField('link').afterField('variant')

  megaMenuItem.editField('variant').validations([
    {
      in: ['boxes', 'columns'],
      message: 'Please select one of the values',
    },
  ])
  megaMenuItem.changeFieldControl('variant', 'builtin', 'dropdown', {
    helpText:
      'Please select the theme variant for this menu item. This will change the the orientation of the components.',
  })

  megaMenuItem.deleteField('label')
  megaMenuItem.deleteField('href')
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const megaMenuItem = migration.editContentType('megaMenuItem')

  megaMenuItem.deleteField('link')

  megaMenuItem.createField('label').name('Label').type('Symbol').localized(true)
  megaMenuItem.createField('href').name('Href').type('Symbol').localized(true)

  megaMenuItem.moveField('label').afterField('variant')
  megaMenuItem.moveField('href').afterField('label')
}
