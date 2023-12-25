module.exports.description = 'Create Banner Image Carousel'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const bannerImageCarousel = migration
    .createContentType('bannerImageCarousel')
    .name('Banner image Carousel')
    .displayField('name')
    .description('homepage banner carousel')

  bannerImageCarousel
    .createField('name')
    .name('Internal Name')
    .type('Symbol')
    .required(true)
    .validations([
      {
        unique: true,
      },
      {
        regexp: {
          pattern: '^[a-z0-9\\-\\_]+$',
          flags: null,
        },

        message:
          'Internal Name may only contain lower case characters, underscores, digits and/or dashes',
      },
    ])
    .disabled(false)
    .omitted(false)

  bannerImageCarousel
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  bannerImageCarousel.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Title of this component',
  })

  bannerImageCarousel
    .createField('titleAlignment')
    .name('Title Alignment')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Left', 'Center', 'Right'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'Center' })

  bannerImageCarousel.changeFieldControl('titleAlignment', 'builtin', 'radio', {
    helpText: 'Choose the alignment for the title',
  })

  bannerImageCarousel
    .createField('children')
    .name('Children Components')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 1,
          max: 8,
        },
        message: 'Enter 1 - 8 components you want to display in a carousel.',
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['banner'],
        },
      ],
      linkType: 'Entry',
    })
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  module.exports.down = (migration) =>
    migration.deleteContentType('bannerImageCarousel')
}
