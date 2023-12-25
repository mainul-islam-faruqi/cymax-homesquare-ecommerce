module.exports.description =
  'Change grid validation from 2 to 12 to 1 to 8 items'

module.exports.up = (migration) => {
  const grid = migration.editContentType('grid')
  grid.editField('columns').validations([{ size: { min: 1, max: 8 } }])
}

module.exports.down = (migration) => {
  const grid = migration.editContentType('grid')
  grid.editField('columns').validations([{ size: { min: 2, max: 12 } }])
}
