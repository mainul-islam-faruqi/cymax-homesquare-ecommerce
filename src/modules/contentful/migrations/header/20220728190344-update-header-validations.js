module.exports.description =
  'Added character constraint on header promotionalText, constraint on number of block-links, constraint on number on inline-link items'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const header = migration.editContentType('header')

  header.editField('promotionalText').validations([
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
      ],
      message:
        'Only heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, link to Url, link to asset and link to entry nodes are allowed',
    },
    {
      size: {
        max: 100, // added constraint: Jul 28 2022
      },
      message: 'A maximum of 100 characters is permitted',
    },
    {
      nodes: {
        'embedded-entry-inline': [
          {
            linkContentType: ['cta'],
          },
          {
            size: {
              max: 3, // added constraint: Jul 28 2022
            },
            message: 'A maximum of 3 in-line links are permitted',
          },
        ],
      },
    },
  ])
}

module.exports.down = (migration) => {
  const header = migration.editContentType('header')

  header
    .editField('promotionalText')
    .name('Promotional Text')
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
              linkContentType: ['cta'],
            },
          ],
        },
      },
    ])
    .disabled(false)
    .omitted(false)
}
