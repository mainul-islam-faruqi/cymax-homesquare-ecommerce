module.exports.description = 'Compose refactoring';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const cta = migration.editContentType('cta')

  cta
  .editField('linkToEntry')
  .validations([
    {
      linkContentType: ['genericPage', 'genericPageWithMenu'],
    },
  ])

  migration.transformEntries({
    contentType: 'cta',
    from: ['linkToEntry'],
    to: ['linkToEntry'],
    transformEntryForLocale: (fields, locale) => {
      let currentValue = fields?.linkToEntry && fields.linkToEntry[locale]
      if (currentValue) {
        if (currentValue?.sys?.id === '3V2grJjsfwvF1t7OPsyidD') {
          currentValue = {
            sys: { type: 'Link', linkType: 'Entry', id: '7zBiGhMxyw3oqn7fKRlb1Y' }
          }
        } else if (currentValue?.sys?.id === '5V69ndG8kOrdBx1kRgdwAy') {
          currentValue = {
            sys: { type: 'Link', linkType: 'Entry', id: '434iGRxEGsTtgSRrAeLM9y' }
          }
        } else {
          currentValue = ''
        }
      }
      return {
        linkToEntry: currentValue,
      }
    },
    shouldPublish: false,
  })

};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples

  const cta = migration.editContentType('cta')

  cta
  .editField('linkToEntry')
  .validations([
    {
      linkContentType: ['page'],
    },
  ])
};
