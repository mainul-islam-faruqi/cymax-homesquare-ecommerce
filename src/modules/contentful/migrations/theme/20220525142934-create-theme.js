module.exports.description = 'Create content model for Site Theme'

module.exports.up = (migration) => {
  const theme = migration
    .createContentType('theme')
    .name('Site Theme')
    .displayField('identifier')
    .description('Chakra UI Theme Mixins')

  theme
    .createField('identifier')
    .name('Identifier')
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
          'Site Identifiers may only contain lower case characters, underscores, digits and/or dashes',
      },
    ])
    .disabled(false)
    .omitted(false)

  theme
    .createField('colors_primary')
    .name('Primary Colors')
    .type('Object')
    .localized(false)
    .required(false)
    .disabled(false)
    .omitted(false)
    .validations([])

  theme
    .createField('colors_secondary')
    .name('Secondary Color')
    .type('Object')
    .localized(false)
    .required(false)
    .disabled(false)
    .omitted(false)
    .validations([])

  theme
    .createField('colors_shading')
    .name('Shading Colors')
    .type('Object')
    .localized(false)
    .required(false)
    .disabled(false)
    .omitted(false)
    .validations([])

  theme
    .createField('typography_fonts')
    .name('Fonts')
    .type('Object')
    .localized(false)
    .required(false)
    .disabled(false)
    .omitted(false)
    .validations([])

  theme.changeFieldControl('identifier', 'builtin', 'slugEditor', {
    helpText: 'Site Identifier needs to match deployment env variable.',
  })
}

module.exports.down = (migration) => migration.deleteContentType('theme')
