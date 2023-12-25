module.exports.description = 'Change grid validation from 1 to 32 items'

module.exports.up = (migration) => {
  const grid = migration.editContentType('grid')
  grid.editField('columns').validations([{ size: { min: 1, max: 32 } }])
}

module.exports.down = (migration) => {
  const grid = migration.editContentType('grid')
  grid.editField('columns').validations([{ size: { min: 2, max: 12 } }])
}
