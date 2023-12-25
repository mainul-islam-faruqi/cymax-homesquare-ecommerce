module.exports.description = 'Adding Accent Colour'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const theme = migration.editContentType('theme')

  theme
    .createField('colors_accent')
    .name('Accent Color')
    .type('Object')
    .localized(false)
    .required(false)
    .disabled(false)
    .omitted(false)
    .validations([])

  theme.moveField('colors_accent').afterField('colors_secondary')
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const theme = migration.editContentType('theme')
  theme.deleteField('colors_accent')
}
