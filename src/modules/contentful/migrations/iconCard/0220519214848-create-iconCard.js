module.exports.description = 'Create content model for Component Icon Card'

module.exports.up = (migration) => {
  const iconCard = migration
    .createContentType('iconCard')
    .name('Component Icon Card')
    .displayField('name')
    .description('Icon Card')

  iconCard
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

  iconCard
    .createField('alignment')
    .name('Alignment')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Left', 'Center'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'Center' })

  iconCard.changeFieldControl('alignment', 'builtin', 'radio', {
    helpText: 'Choose the alignment for the card content',
  })

  iconCard
    .createField('image')
    .name('Image')
    .type('Link')
    .required(false)
    .validations([{ linkContentType: ['image'] }])
    .linkType('Entry')

  iconCard
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  iconCard
    .createField('text')
    .name('Text')
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
          'Only heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, link to Url, link to asset and link to entry nodes are allowed',
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

  iconCard
    .createField('cta')
    .name('Cta Link')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([{ linkContentType: ['cta'] }])
    .linkType('Entry')
    .disabled(false)
    .omitted(false)

  iconCard.changeFieldControl('cta', 'builtin', 'entryCardEditor', {
    helpText: 'Fill it if you need a title as a link',
  })

  iconCard.changeFieldControl('image', 'builtin', 'entryCardEditor')
}

module.exports.down = (migration) => migration.deleteContentType('iconCard')
