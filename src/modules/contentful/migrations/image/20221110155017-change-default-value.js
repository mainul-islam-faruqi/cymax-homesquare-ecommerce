module.exports.description = 'Changing default value of objectFit to cover'

module.exports.up = (migration) => {
  const image = migration.editContentType('image')

  image.editField('objectFit').defaultValue({ 'en-US': 'cover' })
}

module.exports.down = (migration) => {
  const image = migration.editContentType('image')

  image.editField('objectFit').defaultValue({ 'en-US': 'contain' })
}
