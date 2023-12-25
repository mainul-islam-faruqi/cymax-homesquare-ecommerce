module.exports.description = 'Create content model for Accordion Component'

module.exports.up = (migration) => {
  const accordion = migration
    .createContentType('accordion')
    .name('Accordion Component')
    .description('Accordion')
    .displayField('name')

  accordion
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

  accordion
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  accordion
    .createField('items')
    .name('Items')
    .type('Array')
    .required(true)
    .items({
      type: 'Link',
      validations: [
        {
          linkContentType: ['titleAndLink'],
        },
      ],
      linkType: 'Entry',
    })
}

module.exports.down = (migration) => {
  migration.deleteContentType('accordion')
}
