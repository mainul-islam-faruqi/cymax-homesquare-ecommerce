module.exports.description = 'allow several sites to use the same header name';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const header = migration.editContentType('header')
  header
    .editField('name')
    .name('Internal Name')
    .type('Symbol')
    .required(true)
    .validations([
      {
        // Since several sites exist, several sites with an entry named 'global-header' may exist
        unique: false,
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
};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const header = migration
    .editContentType('header')
    .name('Header')
    .description('The global header')
    .displayField('name')
  header
    .editField('name')
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
};
