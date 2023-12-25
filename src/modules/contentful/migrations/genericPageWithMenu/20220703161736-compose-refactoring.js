module.exports.description = 'Compose refactoring'

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const genericPageWithMenu = migration.editContentType('genericPageWithMenu')

  genericPageWithMenu.setAnnotations(['Contentful:AggregateRoot'])

  genericPageWithMenu
    .createField('title')
    .name('Page title')
    .type('Symbol')
    .localized(true)
    .required(true)

  genericPageWithMenu
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

  genericPageWithMenu
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

  genericPageWithMenu
    .createField('seo')
    .name('SEO metadata')
    .type('Link')
    .validations([{ linkContentType: ['seo'] }])
    .linkType('Entry')
    .setAnnotations(['Contentful:AggregateComponent'])

  genericPageWithMenu.changeFieldControl('site', 'builtin', 'dropdown', {
    helpText: 'Please select a site this page should appear on.',
  })
  
  genericPageWithMenu.changeFieldControl('seo', 'builtin', 'entryLinkEditor')
  genericPageWithMenu.moveField('title').afterField('name')
  genericPageWithMenu.moveField('slug').afterField('title')
  genericPageWithMenu.moveField('site').afterField('slug')
  genericPageWithMenu.moveField('seo').afterField('site')

  const editorLayout = genericPageWithMenu.createEditorLayout()

  // all fields are moved to first tab implicitly
  const pageContent = editorLayout.createFieldGroup('content').name('Page Content')
  pageContent.moveField('sideMenu').toTheTopOfFieldGroup('content')
  pageContent.moveField('items').afterField('sideMenu')

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
  const genericPageWithMenu = migration.editContentType('genericPageWithMenu')
  genericPageWithMenu.deleteField('title')
  genericPageWithMenu.deleteField('slug')
  genericPageWithMenu.deleteField('site')
  genericPageWithMenu.deleteField('seo')

  genericPageWithMenu.deleteFieldGroup('content')
  genericPageWithMenu.deleteFieldGroup('pageSettings')
  genericPageWithMenu.deleteFieldGroup('seoSettings')

  genericPageWithMenu.clearAnnotations()
};
