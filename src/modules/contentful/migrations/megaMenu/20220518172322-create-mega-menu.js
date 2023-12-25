module.exports.description = 'Create content model for Mega Menu'

module.exports.up = (migration) => {
  const megaMenu = migration
    .createContentType('megaMenu')
    .name('Mega Menu')
    .displayField('identifier')
    .description('')

  megaMenu
    .createField('identifier')
    .name('Identifier')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])

  megaMenu
    .createField('items')
    .name('Items')
    .type('Array')
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['megaMenuItem'],
        },
      ],
      linkType: 'Entry',
    })
}

module.exports.down = (migration) => migration.deleteContentType('megaMenu')
