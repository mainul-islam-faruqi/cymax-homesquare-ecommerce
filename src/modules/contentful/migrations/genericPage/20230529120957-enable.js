module.exports.description = 'Enable banner image carousel'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const genericPage = migration.editContentType('genericPage')

  genericPage.editField('items').items({
    type: 'Link',
    validations: [
      {
        linkContentType: [
          'banner',
          'grid',
          'image',
          'textComponent',
          'splitBanner',
          'carousel',
          'bannerImageCarousel',
        ],
      },
    ],
    linkType: 'Entry',
  })
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const genericPage = migration.editContentType('genericPage')

  genericPage.editField('items').items({
    type: 'Link',
    validations: [
      {
        linkContentType: [
          'banner',
          'grid',
          'image',
          'textComponent',
          'splitBanner',
          'carousel',
        ],
      },
    ],
    linkType: 'Entry',
  })
}
