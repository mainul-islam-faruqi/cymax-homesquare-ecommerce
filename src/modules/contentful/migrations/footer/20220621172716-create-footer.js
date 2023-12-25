module.exports.description = '<Put your description here>';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const footer = migration
    .createContentType('footer')
    .name('Footer')
    .description('The global footer')
    .displayField('name')
  footer
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
  footer
    .createField('copyright')
    .name('Copyright')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
  footer
    .createField('legals')
    .name('Legals')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          min: 0,
          max: 5,
        },
        message: 'Enter up to 5 legal links',
      },
    ])
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
  footer
    .createField('linkMenus')
    .name('Link Menus')
    .type('Link')
    .localized(false)
    .required(true)
    .validations([
      {
        linkContentType: ['megaMenu'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')
  footer
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
  footer.changeFieldControl('site', 'builtin', 'dropdown', {
      helpText: 'Please select a site this header should appear on.',
    })
  footer
    .createField('socialIcons')
    .name('Social Icons')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Symbol',
      validations: [
        {
          in: ['Twitter', 'Instagram', 'Facebook', 'Youtube', 'Pinterest'],
        },
      ],
    })
  footer.changeFieldControl('socialIcons', 'builtin', 'tagEditor', {
    helpText: 'Enter any combination of: Twitter, Instagram, Facebook, Youtube, Pinterest',
  })
};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  migration.deleteContentType('footer')
};
