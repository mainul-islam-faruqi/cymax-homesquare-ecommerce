module.exports.description = 'Create content model for Component Card'

module.exports.up = (migration) => {
  const card = migration
    .createContentType('card')
    .name('Component Card')
    .displayField('headline')
    .description('Component Card')

  card
    .createField('variant')
    .name('Select variant')
    .type('Symbol')
    .required(true)
    .validations([{ in: ['Default card', 'Cover card', 'Text card'] }])
    .defaultValue({ 'en-US': 'Default card' })

  card
    .createField('theme')
    .name('Select theme')
    .type('Symbol')
    .required(true)
    .validations([{ in: ['Light theme', 'Dark theme'] }])
    .defaultValue({ 'en-US': 'Light theme' })

  card
    .createField('headline')
    .name('Headline')
    .type('Symbol')
    .localized(true)
    .validations([{ size: { min: 5, max: 120 } }])

  card
    .createField('subhead')
    .name('Subhead')
    .type('Symbol')
    .localized(true)
    .validations([{ size: { min: 5, max: 120 } }])

  card
    .createField('eyebrow')
    .name('Eyebrow')
    .type('Symbol')
    .localized(true)
    .validations([{ size: { min: 3, max: 25 } }])

  card
    .createField('description')
    .name('Description')
    .type('Symbol')
    .localized(true)
    .validations([{ size: { max: 320 } }])

  card
    .createField('image')
    .name('Featured Image')
    .type('Link')
    .linkType('Asset')

  card
    .createField('ctaURL')
    .name('Call-to-Action: URL')
    .type('Symbol')
    .validations([{ size: { max: 2000 } }])

  card
    .createField('ctaLocation')
    .name('Call-to-Action: Analytics tracking location')
    .type('Symbol')

  card.createField('ctaLabel').name('Call-to-Action: Label').type('Symbol')

  card.changeFieldControl('variant', 'builtin', 'dropdown')
  card.changeFieldControl('theme', 'builtin', 'dropdown')
  card.changeFieldControl('headline', 'builtin', 'singleLine')
  card.changeFieldControl('subhead', 'builtin', 'singleLine')
  card.changeFieldControl('eyebrow', 'builtin', 'singleLine')
  card.changeFieldControl('description', 'builtin', 'singleLine')
  card.changeFieldControl('image', 'builtin', 'assetLinkEditor')
  card.changeFieldControl('ctaURL', 'builtin', 'singleLine')
  card.changeFieldControl('ctaLocation', 'builtin', 'singleLine')
  card.changeFieldControl('ctaLabel', 'builtin', 'singleLine')
}

module.exports.down = (migration) => migration.deleteContentType('card')
