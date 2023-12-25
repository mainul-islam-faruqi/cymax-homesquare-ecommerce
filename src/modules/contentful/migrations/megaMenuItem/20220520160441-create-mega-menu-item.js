module.exports.description = 'Create content model for Mega Menu Item'

module.exports.up = (migration) => {
  const megaMenuItem = migration
    .createContentType('megaMenuItem')
    .name('Mega Menu Item')
    .displayField('internalTitle')
    .description('')

  megaMenuItem
    .createField('internalTitle')
    .name('Internal Title')
    .type('Symbol')

  megaMenuItem.createField('variant').name('Variant').type('Symbol')

  megaMenuItem.createField('label').name('Label').type('Symbol').localized(true)

  megaMenuItem.createField('href').name('Href').type('Symbol').localized(true)

  megaMenuItem
    .createField('description')
    .name('Description')
    .type('Symbol')
    .localized(true)

  megaMenuItem
    .createField('images')
    .name('Images')
    .type('Array')
    .localized(true)
    .items({ type: 'Link', validations: [], linkType: 'Asset' })

  megaMenuItem
    .createField('children')
    .name('Children')
    .type('Array')
    .items({
      type: 'Link',
      validations: [{ linkContentType: ['megaMenuItem'] }],
      linkType: 'Entry',
    })

  megaMenuItem.changeFieldControl('internalTitle', 'builtin', 'singleLine')
  megaMenuItem.changeFieldControl('variant', 'builtin', 'singleLine')
  megaMenuItem.changeFieldControl('label', 'builtin', 'singleLine')
  megaMenuItem.changeFieldControl('href', 'builtin', 'singleLine')
  megaMenuItem.changeFieldControl('description', 'builtin', 'singleLine')
  megaMenuItem.changeFieldControl('images', 'builtin', 'assetGalleryEditor')
  megaMenuItem.changeFieldControl('children', 'builtin', 'entryLinksEditor')
}

module.exports.down = (migration) => migration.deleteContentType('megaMenuItem')
