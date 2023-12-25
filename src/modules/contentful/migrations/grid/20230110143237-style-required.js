module.exports.description = 'Make Grid Style Field required'

module.exports.up = (migration) => {
  const grid = migration.editContentType('grid')
  grid.editField('style').required(true)
}

module.exports.down = (migration) => {
  const grid = migration.editContentType('grid')
  grid.editField('style').required(false)
}
