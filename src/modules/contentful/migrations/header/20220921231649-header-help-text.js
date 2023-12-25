module.exports.description = 'add helper text to header'

module.exports.up = (migration) => {
  const header = migration.editContentType('header')

  header.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText:
      'Only the entry with the name "global-header" for each site will be rendered',
  })
}

module.exports.down = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const header = migration.editContentType('header')

  header.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: '',
  })
}
