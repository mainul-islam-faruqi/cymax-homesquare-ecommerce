module.exports.description = 'Enable carousel component';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const genericPageWithMenu = migration.editContentType('genericPageWithMenu')

  genericPageWithMenu.editField('items').items({
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
};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const genericPageWithMenu = migration.editContentType('genericPageWithMenu')

  genericPageWithMenu.editField('items').items({
    type: 'Link',
    validations: [
      {
        linkContentType: [
          'banner',
          'grid',
          'image',
          'textComponent',
          'splitBanner',
        ],
      },
    ],
    linkType: 'Entry',
  })
};
