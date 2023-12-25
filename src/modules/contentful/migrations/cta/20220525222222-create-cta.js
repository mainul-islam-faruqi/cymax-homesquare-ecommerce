module.exports.description =
  'Create content model for Call To Action Content Type'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const cta = migration
    .createContentType('cta')
    .name('CTA Link')
    .description('Call to Action component')
    .displayField('identifier')

  cta
    .createField('identifier')
    .name('Identifier')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  cta
    .createField('label')
    .name('Label')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  cta
    .createField('linkToEntry')
    .name('Link to an Entry')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['page'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')

  cta.changeFieldControl('linkToEntry', 'builtin', 'entryLinkEditor', {
    helpText:
      'You can link to an existent page that will generate a ralative path url link. This takes priority over Link to URL.',
  })

  cta
    .createField('url')
    .name('Link to URL')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern:
            '^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
        },
      },
    ])
    .disabled(false)
    .omitted(false)

  cta.changeFieldControl('url', 'builtin', 'singleLine', {
    helpText:
      'Add a url starting with https:// to generate a link that opens in a new tab.',
  })

  cta
    .createField('params')
    .name('Extra link parameters')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  cta.changeFieldControl('params', 'builtin', 'singleLine', {
    helpText:
      'If you want to append extra parameters to the link url add it here starting with "?". If you want link to scroll to an ID on the page - add an ID here starting with #',
  })

  cta
    .createField('variant')
    .name('Variant Style')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        in: ['Link', 'Button - Solid', 'Button - Outline', 'Button - Ghost'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .defaultValue({ 'en-US': 'Link' })

  cta.changeFieldControl('variant', 'builtin', 'dropdown', {
    helpText: 'Please select a style of the link.',
  })
}

module.exports.down = (migration) => migration.deleteContentType('cta')
