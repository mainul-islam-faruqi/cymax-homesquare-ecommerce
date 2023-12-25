module.exports.description = '<Create content model for Text Component>'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const textComponent = migration
    .createContentType('textComponent')
    .name('Text Component')
    .description(
      'Component title and text with the ability to align both on the page'
    )
    .displayField('name')

  textComponent
    .createField('name')
    .name('Internal Name')
    .type('Symbol')
    .required(true)
    .validations([{ size: { min: 5, max: 40 } }])

  textComponent
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
  textComponent.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Title of this component',
  })

  textComponent
    .createField('titleAlignment')
    .name('Title Alignment')
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

  textComponent.changeFieldControl('titleAlignment', 'builtin', 'radio', {
    helpText: 'Choose the alignment for the title',
  })

  textComponent
    .createField('text')
    .name('Text')
    .type('RichText')
    .localized(false)
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
          'entry-hyperlink',
          'asset-hyperlink',
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
              linkContentType: ['image', 'cta'],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false)

  textComponent
    .createField('textAlignment')
    .name('Text Alignment')
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

  textComponent.changeFieldControl('textAlignment', 'builtin', 'radio', {
    helpText: 'Choose the alignment for the text',
  })
}

module.exports.down = (migration) =>
  migration.deleteContentType('textComponent')
