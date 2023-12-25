module.exports.description = '<Put your description here>'

module.exports.up = (migration) => {
  const theme = migration.editContentType('theme')

  theme.deleteField('privacyFormEmail')
}

module.exports.down = (migration) => {
  const theme = migration.editContentType('theme')

  theme
    .createField('privacyFormEmail')
    .name('Privacy Form Email')
    .type('Symbol')
    .localized(true)
    .required(false)
    .disabled(false)
    .omitted(false)
    .validations([])
}
