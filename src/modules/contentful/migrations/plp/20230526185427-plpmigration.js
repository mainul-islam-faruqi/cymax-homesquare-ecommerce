module.exports.description = 'Create content model for Component PLP'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const PLP = migration
    .createContentType('plp')
    .name('Longtail PLP')
    .displayField('name')
    .description(
      'Type to hold entries to generate longtail Category/Collection/Brand pages (Product Listing Page, PLP). If a slug that matches the known pattern for Category/Collection pages doesnt have a matching entry of this type the site will automatically generate a PLP based on the slug.'
    )

  PLP.createField('name').name('Internal Name').type('Symbol')

  PLP.createField('site')
    .name('Site')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        in: ['cymax', 'homesquare'],
      },
    ])
    .disabled(false)
    .omitted(false)
  PLP.changeFieldControl('site', 'builtin', 'dropdown', {
    helpText: 'Please select a site this PLP should appear on.',
  })

  PLP.createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      { unique: false },
      {
        regexp: {
          pattern: "^((\\/)|(([\\/\\w\\-\\._~:!$&'\\(\\)*+,;@]|(%\\d+))+))$",
        },
      },
    ])

  PLP.createField('title')
    .name('Page title')
    .type('Symbol')
    .localized(true)
    .required(true)

  PLP.createField('breadcrumbs')
    .name('Breadcrumbs')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['cta'],
        },
      ],

      linkType: 'Entry',
    })

  PLP.createField('seo')
    .name('SEO metadata')
    .type('Link')
    .validations([{ linkContentType: ['seo'] }])
    .linkType('Entry')
    .setAnnotations(['Contentful:AggregateComponent'])

  PLP.createField('hiddenfilters')
    .name('Hidden Filters')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['metaTags'],
        },
      ],

      linkType: 'Entry',
    })
  PLP.changeFieldControl('hiddenfilters', 'builtin', 'entryLinksEditor', {
    helpText:
      'Using the key-value pair entry please add the Hidden filters to be applied to this page. The key must be the facet name in Algolia, and the value must be the value to filter the facet. i.e: key: collectionName, value: "St. Francis" (without quotes)',
  })

  PLP.createField('urlfilters')
    .name('URL Filters')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['metaTags'],
        },
      ],

      linkType: 'Entry',
    })
  PLP.changeFieldControl('urlfilters', 'builtin', 'entryLinksEditor', {
    helpText:
      'Using the key-value pair entry please add the URL filters to be applied to this page. The key must be the facet name in Algolia, and the value must be the value to filter the facet. i.e: key: collectionName, value: "St. Francis" (without quotes)',
  })
}

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  migration.deleteContentType('plp')
}
