module.exports.description = 'Create carousel';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const carousel = migration
    .createContentType('carousel')
    .name('Component Carousel')
    .displayField('name')
    .description('Component Carousel')

  carousel
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

  carousel
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  carousel.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Title of this component',
  })

  carousel  
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

  carousel.changeFieldControl('titleAlignment', 'builtin', 'radio', {
    helpText: 'Choose the alignment for the title',
  })

  carousel  
    .createField('variant')
    .name('Select Variant')
    .localized(false)
    .type('Symbol')
    .required(true)
    .validations([{ in: ['Products Carousel', 'Recently Viewed Products', 'Category Cards Carousel'] }])
    .defaultValue({ 'en-US': 'Category Cards Carousel' })

  carousel
    .createField('products')
    .name('List of Products')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Symbol',
      validations: [
        {
          size: {
            min: 2,
            max: 8,
          },
          message: 'Enter 2 - 8 products you want to display in a carousel.',
        },
      ],
    })

  carousel.changeFieldControl('products', 'builtin', 'tagEditor', {
    helpText: 'Only needed for Products Carousel Variant type. Please enter product IDs from Elastic Path.',
  })

  carousel
    .createField('children')
    .name('Children Components')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 2,
          max: 8,
        },
        message: 'Enter 2 - 8 components you want to display in a carousel.',
      },
    ])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['card'],
        },
      ],
      linkType: 'Entry',
    })

  carousel.changeFieldControl('children', 'builtin', 'entryLinksEditor', {
    helpText: 'Only needed for Category Cards Carousel Variant type. Please select chidren components you want to appear in a carousel.',
  })

};

module.exports.down = (migration) =>
migration.deleteContentType('carousel')
