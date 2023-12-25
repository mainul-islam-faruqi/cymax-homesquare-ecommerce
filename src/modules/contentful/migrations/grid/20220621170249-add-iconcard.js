module.exports.description = 'Add Icon Card component into Grid'

module.exports.up = (migration) => {
  const grid = migration.editContentType('grid')
  grid.editField('columns').items({
    type: 'Link',
    validations: [{ linkContentType: ['card', 'image', 'iconCard'] }],
    linkType: 'Entry',
  })

  grid.changeFieldControl('alignment', 'builtin', 'radio', {
    helpText: 'Choose the alignment for the grid content',
  })
}

module.exports.down = (migration) => {
  const grid = migration.editContentType('grid')
  grid.editField('columns').items({
    type: 'Link',
    validations: [{ linkContentType: ['card', 'image'] }],
    linkType: 'Entry',
  })

  grid.changeFieldControl('alignment', 'builtin', 'radio', {
    helpText: 'Choose the alignment for the card and their content',
  })
}
