module.exports.description = 'Update megaMenu to internal title'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const megaMenu = migration.editContentType('megaMenu')

  megaMenu.changeFieldId('identifier', 'internalTitle')

  megaMenu.editField('internalTitle').name('Internal Title')

  megaMenu.displayField('internalTitle')

  megaMenu.moveField('internalTitle').toTheTop()
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
}
