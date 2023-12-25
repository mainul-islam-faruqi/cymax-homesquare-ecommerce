module.exports.description =
  'Add alignment and card background color to grid component'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const grid = migration.editContentType('grid')

  grid.deleteField('fullWidth')
  grid.deleteField('space')

  grid.editField('style').validations([
    {
      in: ['2 Columns', '3 Columns', '4 Columns'],
    },
  ])

  grid
    .createField('alignment')
    .name('Alignment')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Left', 'Center'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'Center' })

  grid.changeFieldControl('alignment', 'builtin', 'radio', {
    helpText: 'Choose the alignment for the card and their content',
  })

  grid
    .createField('cardBackgroundColor')
    .name('Card Background Color')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Default', 'Light', 'Dark', 'Accent'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'Default' })

  grid.changeFieldControl('cardBackgroundColor', 'builtin', 'radio', {
    helpText: 'Choose the background color for the cards',
  })

  grid
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)

  grid.moveField('title').afterField('name')
}

module.exports.down = (migration) => {
  migration.deleteField('alignment')
  migration.deleteField('cardBackgroundColor')
}
