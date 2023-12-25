module.exports.description =
  '<Create content model for Title and Link Component>'

module.exports.up = (migration) => {
  const titleAndLink = migration
    .createContentType('titleAndLink')
    .name('Title and Link Component')
    .description('Title and Link')
    .displayField('name')

  titleAndLink
    .createField('name')
    .name('Internal Name')
    .type('Symbol')
    .localized(false)
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

  titleAndLink
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
  titleAndLink.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Fill it if you want a simple text field as a title',
  })

  titleAndLink
    .createField('titleLink')
    .name('Title Link')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([{ linkContentType: ['cta'] }])
    .linkType('Entry')
    .disabled(false)
    .omitted(false)
  titleAndLink.changeFieldControl('titleLink', 'builtin', 'entryCardEditor', {
    helpText: 'Fill it if you need a title as a link',
  })

  titleAndLink
    .createField('links')
    .name('Links')
    .type('Array')
    .required(true)
    .validations([{ size: { min: 1 } }])
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['cta'],
        },
      ],
      linkType: 'Entry',
    })
}

module.exports.down = (migration) => {
  migration.deleteContentType('tittleAndLink')
}
