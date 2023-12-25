module.exports.description =
  'Make internal name of generic page with menu required'

module.exports.up = (migration) => {
  const genericPageWithMenu = migration.editContentType('genericPageWithMenu')
  genericPageWithMenu.editField('name').required(true)
}

module.exports.down = (migration) => {
  const genericPageWithMenu = migration.editContentType('genericPageWithMenu')
  genericPageWithMenu.editField('name').required(false)
}
