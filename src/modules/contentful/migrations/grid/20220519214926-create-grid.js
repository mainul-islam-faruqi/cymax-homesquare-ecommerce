module.exports.description = 'Create content model for Component Grid'

module.exports.up = (migration) => {
  const grid = migration
    .createContentType('grid')
    .name('Component Grid')
    .displayField('name')
    .description('Grid')

  grid
    .createField('name')
    .name('Name')
    .type('Symbol')
    .required(true)
    .validations([{ size: { min: 5, max: 90 } }])

  grid
    .createField('style')
    .name('Grid style')
    .type('Symbol')
    .validations([
      {
        in: [
          '2 Columns',
          '3 Columns',
          '4 Columns',
          '5 Columns',
          '6 Columns',
          'Masonry A - Min 2 Item, Max 5 Item',
          'Masonry B - Min 2 Item, Max 5 Item',
        ],
      },
    ])
    .defaultValue({ 'en-US': '2 Columns' })

  grid
    .createField('space')
    .name('Grid spacing')
    .type('Symbol')
    .validations([{ in: ['Default', 'Small', 'Medium', 'Large'] }])
    .defaultValue({ 'en-US': 'Default' })

  grid
    .createField('fullWidth')
    .name('Enable full-width')
    .type('Boolean')
    .required(true)
    .defaultValue({ 'en-US': false })

  grid
    .createField('columns')
    .name('Add content')
    .type('Array')
    .required(true)
    .validations([{ size: { min: 2, max: 12 } }])
    .items({
      type: 'Link',
      validations: [{ linkContentType: ['card', 'image', 'iconCard'] }],
      linkType: 'Entry',
    })

  grid.changeFieldControl('name', 'builtin', 'singleLine')
  grid.changeFieldControl('style', 'builtin', 'dropdown')
  grid.changeFieldControl('space', 'builtin', 'dropdown')
  grid.changeFieldControl('fullWidth', 'builtin', 'boolean')
  grid.changeFieldControl('columns', 'builtin', 'entryLinksEditor')
}

module.exports.down = (migration) => migration.deleteContentType('grid')
