module.exports.description =
  'Add sideMenu content-type to genericPageWithMenu component'

module.exports.up = (migration) => {
  const genericPageWithMenu = migration.editContentType('genericPageWithMenu')

  genericPageWithMenu
    .createField('sideMenu')
    .name('Side Menu')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([{ linkContentType: ['accordion'] }])
    .linkType('Entry')
    .disabled(false)
    .omitted(false)

  genericPageWithMenu.moveField('sideMenu').afterField('name')
}

module.exports.down = (migration) => {
  const genericPageWithMenu = migration.editContentType('genericPageWithMenu')
  genericPageWithMenu.deleteField('sideMenu')
}
