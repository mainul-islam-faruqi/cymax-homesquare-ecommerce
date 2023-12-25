module.exports.description = 'Create content model for Component Generic Page'

module.exports.up = (migration) => {
  const genericPage = migration
    .createContentType('genericPage')
    .name('Component Generic Page')
    .displayField('name')
    .description('Generic Page')

  genericPage.createField('name').name('Internal Name').type('Symbol')

  genericPage
    .createField('items')
    .name('Body')
    .type('Array')
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: [
            'banner',
            'grid',
            'image',
            'componentRichText',
            'shortText',
          ],
        },
      ],
      linkType: 'Entry',
    })

  genericPage.changeFieldControl('name', 'builtin', 'singleLine')
  genericPage.changeFieldControl('items', 'builtin', 'entryLinksEditor')
}

module.exports.down = (migration) => migration.deleteContentType('genericPage')
