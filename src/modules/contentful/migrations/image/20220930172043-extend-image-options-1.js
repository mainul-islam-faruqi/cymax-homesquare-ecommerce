module.exports.description =
  'Adding objectFit options to images for client to have full control over how their image fills its container'

module.exports.up = (migration) => {
  const image = migration.editContentType('image')

  image
    .createField('objectFit')
    .name('Image Object Fit')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['contain', 'cover'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'contain' })

  image.moveField('objectFit').beforeField('width')

  image.changeFieldControl('objectFit', 'builtin', 'dropdown', {
    helpText:
      'cover: The image will resize to fill all available space while maintaining its aspect ratio (may result in clipping).  contain: The image will fill as much available space as possible while maintaining its aspect ratio (may result in blank spaces on the image). If no option is specified, contain is used as a default value',
  })
}

module.exports.down = (migration) => {
  const image = migration.editContentType('image')
  image.deleteField('objectFit')
}
