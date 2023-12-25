module.exports.description = 'Create content model for Compose: SEO'

module.exports.up = (migration) => {
  const seo = migration
    .createContentType('seo')
    .name('Compose: SEO')
    .displayField('name')
    .description('SEO Metadata for web pages in Compose. DO NOT DELETE')

  seo.createField('name').name('Internal name').type('Symbol').required(true)

  seo.createField('title').name('SEO title').type('Symbol').localized(true)

  seo
    .createField('description')
    .name('Description')
    .type('Symbol')
    .localized(true)

  seo
    .createField('keywords')
    .name('Keywords')
    .type('Array')
    .localized(true)
    .items({ type: 'Symbol', validations: [] })

  seo
    .createField('no_index')
    .name('Hide page from search engines (noindex)')
    .type('Boolean')

  seo
    .createField('no_follow')
    .name('Exclude links from search rankings? (nofollow)')
    .type('Boolean')

  seo.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: "⚠️ Don't edit this field! The Compose will fill it for you.",
  })
  seo.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'This will override the page title in search engine results',
  })
  seo.changeFieldControl('description', 'builtin', 'singleLine', {
    helpText: 'This will be displayed in search engine results',
  })
  seo.changeFieldControl('keywords', 'builtin', 'tagEditor')
  seo.changeFieldControl('no_index', 'builtin', 'boolean', {
    helpText: 'Search engines will not include this page in search results',
    trueLabel: 'Yes',
    falseLabel: 'No',
  })
  seo.changeFieldControl('no_follow', 'builtin', 'boolean', {
    helpText: 'Search engines will not follow the links on your page',
    trueLabel: 'Yes',
    falseLabel: 'No',
  })
}

module.exports.down = (migration) => migration.deleteContentType('seo')
