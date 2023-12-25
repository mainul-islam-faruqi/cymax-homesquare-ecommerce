module.exports.description =
  'Create content model for Component Generic Page with side menu'

module.exports.up = (migration) => {
  const genericPageWithMenu = migration
    .createContentType('genericPageWithMenu')
    .name('Generic Page with Menu')
    .displayField('name')
    .description('Component Generic Page with side Menu')

  genericPageWithMenu.createField('name').name('Internal Name').type('Symbol')

  genericPageWithMenu
    .createField('items')
    .name('Body')
    .type('Array')
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['banner', 'grid', 'image', 'textComponent'],
        },
      ],
      linkType: 'Entry',
    })

  genericPageWithMenu.changeFieldControl('name', 'builtin', 'singleLine')
  genericPageWithMenu.changeFieldControl('items', 'builtin', 'entryLinksEditor')

  const page = migration.editContentType('page')

  page.editField('content').validations([
    {
      linkContentType: [
        'genericPage',
        'pageProductListingPage',
        'genericPageWithMenu',
      ],
    },
  ])
}

module.exports.down = (migration) =>
  migration.deleteContentType('genericPageWithMenu')
