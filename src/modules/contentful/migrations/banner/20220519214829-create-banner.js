module.exports.description = 'Create content model for Component Banner'

module.exports.up = (migration) => {
  const banner = migration
    .createContentType('banner')
    .name('Component Banner')
    .displayField('title')
    .description('Banner')

  banner
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([{ size: { min: 5, max: 256 } }])

  banner
    .createField('description')
    .name('Description')
    .type('Symbol')
    .localized(true)
    .validations([{ size: { max: 350 } }])

  banner
    .createField('eyebrow')
    .name('Eyebrow')
    .type('Symbol')
    .localized(true)
    .validations([{ size: { max: 40 } }])

  banner.createField('image').name('Image').type('Link').linkType('Asset')

  banner
    .createField('ctaLabel')
    .name('Call-to-action: Label')
    .type('Symbol')
    .localized(true)
    .validations([{ size: { min: 3, max: 90 } }])

  banner
    .createField('ctaUrl')
    .name('Call-to-action: URL')
    .type('Symbol')
    .validations([{ size: { max: 2000 } }])

  banner
    .createField('ctaLocation')
    .name('Call-to-action: Location')
    .type('Symbol')
    .validations([{ size: { min: 3, max: 255 } }])

  banner
    .createField('style')
    .name('Banner Style')
    .type('Symbol')
    .validations([
      {
        in: [
          'Hero Banner',
          'Hero Banner - Highlighted',
          'Split Banner',
          'Split Banner - Reversed',
        ],
      },
    ])
    .defaultValue({ 'en-US': 'Split Banner' })

  banner
    .createField('theme')
    .name('Theme')
    .type('Symbol')
    .validations([{ in: ['Light Theme', 'Dark Theme'] }])
    .defaultValue({ 'en-US': 'Light Theme' })

  banner
    .createField('fullWidth')
    .name('Enable full-width')
    .type('Boolean')
    .required(true)
    .defaultValue({ 'en-US': false })

  banner
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .validations([{ unique: true }])

  banner.changeFieldControl('title', 'builtin', 'singleLine')
  banner.changeFieldControl('description', 'builtin', 'singleLine')
  banner.changeFieldControl('eyebrow', 'builtin', 'singleLine')
  banner.changeFieldControl('image', 'builtin', 'assetLinkEditor')
  banner.changeFieldControl('ctaLabel', 'builtin', 'singleLine')
  banner.changeFieldControl('ctaUrl', 'builtin', 'singleLine', {
    helpText: 'A relative or absolute URL.',
  })
  banner.changeFieldControl('ctaLocation', 'builtin', 'singleLine', {
    helpText: 'Analytics tracking location.',
  })
  banner.changeFieldControl('style', 'builtin', 'dropdown')
  banner.changeFieldControl('theme', 'builtin', 'dropdown')
  banner.changeFieldControl('fullWidth', 'builtin', 'boolean', {
    helpText: 'Make the banner full-width.',
    trueLabel: 'Yes',
    falseLabel: 'No',
  })
  banner.changeFieldControl('slug', 'builtin', 'singleLine')
}

module.exports.down = (migration) => migration.deleteContentType('banner')
