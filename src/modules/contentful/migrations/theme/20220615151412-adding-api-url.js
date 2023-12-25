module.exports.description = 'Adding Field For Google Fonts API Url'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const theme = migration.editContentType('theme')

  theme
    .createField('googleFontsApi')
    .name('Google Fonts API Url')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  theme.changeFieldControl('googleFontsApi', 'builtin', 'singleLine')
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const theme = migration.editContentType('theme')

  theme.deleteField('googleFontsApi')
}
