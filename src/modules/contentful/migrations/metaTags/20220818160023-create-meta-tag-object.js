module.exports.description =
  'Creating Name and Content data structure to store Meta Tags'

module.exports.up = (migration) => {
  const keyValue = migration
    .createContentType('metaTags')
    .name('Meta Tags')
    .description('')
    .displayField('identifier')
  keyValue
    .createField('identifier')
    .name('Identifier')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
  keyValue
    .createField('name')
    .name('Name')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
  keyValue
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
  keyValue.changeFieldControl('identifier', 'builtin', 'singleLine', {})
  keyValue.changeFieldControl('name', 'builtin', 'singleLine', {})
  keyValue.changeFieldControl('content', 'builtin', 'multipleLine', {})
}

module.exports.down = (migration) => {
  migration.deleteContentType('metaTags')
}
