module.exports.description =
  'Give menus unique IDs so that sites can have more than one mega menu'

module.exports.up = (migration) => {
  migration
    .editContentType('megaMenu')
    .createField('identifier')
    .name('identifier')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
}

module.exports.down = (migration) => {
  migration.editContentType('megaMenu').deleteField('identifier')
}
