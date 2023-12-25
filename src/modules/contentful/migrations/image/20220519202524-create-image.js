module.exports.description = 'Create content model for Component Image'

module.exports.up = (migration) => {
  const image = migration
    .createContentType('image')
    .name('Component Image')
    .displayField('name')
    .description('Image')

  image
    .createField('name')
    .name('Entry Name')
    .type('Symbol')
    .required(true)
    .validations([{ size: { min: 5, max: 40 } }])

  image
    .createField('image')
    .name('Image')
    .type('Link')
    .required(true)
    .validations([{ linkMimetypeGroup: ['image'] }])
    .linkType('Asset')

  image.changeFieldControl('name', 'builtin', 'singleLine')
  image.changeFieldControl('image', 'builtin', 'assetLinkEditor')
}

module.exports.down = (migration) => migration.deleteContentType('image')
