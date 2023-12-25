module.exports.description = 'Compose refactoring'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const genericPage = migration.editContentType('genericPage')

  genericPage.setAnnotations(['Contentful:AggregateRoot'])

  genericPage
    .createField('title')
    .name('Page title')
    .type('Symbol')
    .localized(true)
    .required(true)

  genericPage
    .createField('slug')
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

  genericPage
    .createField('site')
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

  genericPage
    .createField('seo')
    .name('SEO metadata')
    .type('Link')
    .validations([{ linkContentType: ['seo'] }])
    .linkType('Entry')
    .setAnnotations(['Contentful:AggregateComponent'])

  genericPage.changeFieldControl('site', 'builtin', 'dropdown', {
    helpText: 'Please select a site this page should appear on.',
  })
  
  genericPage.changeFieldControl('seo', 'builtin', 'entryLinkEditor')
  genericPage.moveField('title').afterField('name')
  genericPage.moveField('slug').afterField('title')
  genericPage.moveField('site').afterField('slug')
  genericPage.moveField('seo').afterField('site')

  const editorLayout = genericPage.createEditorLayout()

  // all fields are moved to first tab implicitly
  const pageContent = editorLayout.createFieldGroup('content').name('Page Content')
  pageContent.moveField('items').toTheTopOfFieldGroup('content')

  const pageSettings = editorLayout.createFieldGroup('pageSettings').name('Page Settings')
  pageSettings.createFieldGroup('seoSettings').name('SEO settings')
  editorLayout.moveField('seo').toTheTopOfFieldGroup('seoSettings')

  editorLayout.moveField('name').toTheTopOfFieldGroup('pageSettings')
  editorLayout.moveField('title').afterField('name')
  editorLayout.moveField('slug').afterField('title')
  editorLayout.moveField('site').afterField('slug')
};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const genericPage = migration.editContentType('genericPage')
  genericPage.deleteField('title')
  genericPage.deleteField('slug')
  genericPage.deleteField('site')
  genericPage.deleteField('seo')

  genericPage.deleteFieldGroup('content')
  genericPage.deleteFieldGroup('pageSettings')
  genericPage.deleteFieldGroup('seoSettings')

  genericPage.clearAnnotations()
};
