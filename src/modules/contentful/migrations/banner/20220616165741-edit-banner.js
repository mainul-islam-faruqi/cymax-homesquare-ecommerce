module.exports.description = 'Edit banner based on design requirements';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const banner = migration.editContentType('banner')

  banner.deleteField('title')
  banner.deleteField('description')
  banner.deleteField('image')
  banner.deleteField('ctaLabel')
  banner.deleteField('ctaUrl')
  banner.deleteField('ctaLocation')
  banner.deleteField('slug')

  banner.editField('style')
  .validations([
    {
      in: [
        'Left Aligned',
        'Center Aligned',
        'Right Aligned',
      ],
    },
  ])
  .defaultValue({ 'en-US': 'Center Aligned' })

  banner
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(false)
    .required(true)
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

  banner
    .createField('bgImage')
    .name('Background Image')
    .type('Link')
    .required(false)
    .validations([
      { linkContentType: ['image'] },
    ])
    .linkType('Entry')

  banner
    .createField('spacing')
    .name('Banner Spacing')
    .type('Symbol')
    .validations([
      {
        in: [
          'sm',
          'md',
          'lg',
          'xl',
        ],
      },
    ])
    .defaultValue({ 'en-US': 'sm' })

  banner.changeFieldControl('bgImage', 'builtin', 'entryLinkEditor')
  banner.changeFieldControl('spacing', 'builtin', 'dropdown')
  banner.moveField('content').afterField('eyebrow')
  banner.moveField('bgImage').afterField('content')
  banner.moveField('spacing').afterField('theme')
};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const banner = migration.editContentType('banner')

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
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .validations([{ unique: true }])

  banner.editField('style')
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

  banner.deleteField('content')
  banner.deleteField('bgImage')
  banner.deleteField('spacing')
  
};
