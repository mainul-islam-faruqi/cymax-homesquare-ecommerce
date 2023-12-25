module.exports.description = 'Add internal name validation to seo'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples

  const seo = migration.editContentType('seo')

  seo.editField('name').name('Internal Name')
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const seo = migration.editContentType('seo')

  seo.editField('name').name('Internal name').validations([])
}
