module.exports.description = 'Create Split Banner Content Type';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const splitBanner = migration
    .createContentType('splitBanner')
    .name('Split Banner')
    .displayField('name')
    .description('Split Banner Component')

  splitBanner
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

  splitBanner
    .createField('eyebrow')
    .name('Eyebrow')
    .type('Symbol')
    .localized(true)
    .validations([{ size: { max: 40 } }])

  splitBanner
    .createField('mainContent')
    .name('Main Content')
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
          'heading-1',
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
          'asset-hyperlink',
          'embedded-entry-inline',
          'embedded-entry-block',
        ],
        message:
          'Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, link to asset and link to entry nodes are allowed',
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

  splitBanner
    .createField('mainContentAlignment')
    .name('Main Content Alignment')
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
    .defaultValue({ 'en-US': 'Left' })

  splitBanner
    .createField('additionalContent')
    .name('Additional Content')
    .type('Link')
    .required(true)
    .validations([
      { linkContentType: ['image'] },
    ])
    .linkType('Entry')

  splitBanner
    .createField('orientation')
    .name('Content Orientation')
    .type('Symbol')
    .validations([
      {
        in: [
          'Additional Content - Main Content',
          'Main Content - Additional Content',
        ],
      },
    ])
    .defaultValue({ 'en-US': 'Main Content - Additional Content' })

  splitBanner
    .createField('theme')
    .name('Theme')
    .type('Symbol')
    .validations([{ in: ['Light Theme', 'Dark Theme'] }])
    .defaultValue({ 'en-US': 'Light Theme' })

  splitBanner
    .createField('fullWidth')
    .name('Enable full-width')
    .type('Boolean')
    .required(true)
    .defaultValue({ 'en-US': false })

  splitBanner.changeFieldControl('name', 'builtin', 'slugEditor')
  splitBanner.changeFieldControl('mainContentAlignment', 'builtin', 'radio', {
    helpText: 'Choose the alignment for the main content.',
  })
  splitBanner.changeFieldControl('eyebrow', 'builtin', 'singleLine')
  splitBanner.changeFieldControl('additionalContent', 'builtin', 'entryLinkEditor')
  splitBanner.changeFieldControl('orientation', 'builtin', 'dropdown', {
    helpText: 'This option dictates which order the content sections appear in the component (Left and Right)',
  })
  splitBanner.changeFieldControl('theme', 'builtin', 'dropdown')
  splitBanner.changeFieldControl('fullWidth', 'builtin', 'boolean', {
    helpText: 'Make the banner full-width.',
    trueLabel: 'Yes',
    falseLabel: 'No',
  })
};

module.exports.down = (migration) => migration.deleteContentType('splitBanner')
