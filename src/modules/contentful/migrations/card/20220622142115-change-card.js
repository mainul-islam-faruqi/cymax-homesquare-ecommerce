module.exports.description = 'Modifying card component to match design capabilities';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const card = migration.editContentType('card')

  card.deleteField('headline')
  card.deleteField('subhead')
  card.deleteField('description')
  card.deleteField('image')
  card.deleteField('ctaURL')
  card.deleteField('ctaLocation')
  card.deleteField('ctaLabel')
  
  card
    .editField('variant')
    .validations([{ in: ['Default card', 'Cover card'] }])
    .defaultValue({ 'en-US': 'Default card' })

  card
    .createField('image')
    .name('Image')
    .type('Link')
    .required(true)
    .validations([
      { linkContentType: ['image'] },
    ])
    .linkType('Entry')

  card
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
  
    card.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Title of this component',
  })

  card
    .createField('description')
    .name('Description')
    .type('RichText')
    .localized(true)
    .required(false)
    .validations([
      {
        enabledMarks: ['bold', 'italic', 'underline', 'code'],
        message: 'Only bold, italic, and underline marks are allowed',
      },
      {
        enabledNodeTypes: [
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6',
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'hyperlink',
          'embedded-entry-inline',
          'embedded-entry-block',
        ],
        message:
          'Only heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block or inline entry are allowed',
      },
      {
        nodes: {
          'embedded-entry-inline': [
            {
              linkContentType: ['cta'],
            },
          ],
          'embedded-entry-block': [
            {
              linkContentType: ['cta'],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false)

  card
    .createField('horizontalAlignment')
    .name('Horizontal Alignment')
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

  card.changeFieldControl('horizontalAlignment', 'builtin', 'radio', {
      helpText: 'Choose horizontal alignment for text',
    })

  card
    .createField('verticalAlignment')
    .name('Vertical Alignment')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Start', 'Center', 'End'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'Center' })

    card.changeFieldControl('verticalAlignment', 'builtin', 'radio', {
      helpText: 'Choose vertical alignment for text. Only work for Cover card variant.',
    })

  card
    .createField('cardLink')
    .name('Card Action Link')
    .type('Link')
    .required(false)
    .validations([
      { linkContentType: ['cta'] },
    ])
    .linkType('Entry')

  card
    .editField('theme')
    .validations([{ in: ['Light Theme', 'Dark Theme'] }])
    .defaultValue({ 'en-US': 'Light Theme' })

  card.moveField('image').afterField('name')
  card.moveField('cardLink').afterField('image')
  card.moveField('title').afterField('eyebrow')
  card.moveField('variant').afterField('description')
  card.moveField('theme').toTheBottom()

  card.changeFieldControl('cardLink', 'builtin', 'entryLinkEditor', {
    helpText: 'Adding a link here will make the whole card clickable.',
  })

  card.changeFieldControl('image', 'builtin', 'entryLinkEditor')

  card.changeFieldControl('description', 'builtin', 'richTextEditor', {})

};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const card = migration.editContentType('card')

  card.deleteField('image')
  card.deleteField('title')
  card.deleteField('description')
  card.deleteField('horizontalAlignment')
  card.deleteField('verticalAlignment')
  card.deleteField('cardLink')

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

  card
    .editField('variant')
    .validations([{ in: ['Default card', 'Cover card', 'Text card'] }])
    .defaultValue({ 'en-US': 'Default card' })

};
