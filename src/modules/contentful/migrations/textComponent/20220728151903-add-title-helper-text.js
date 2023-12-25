module.exports.description = 'Modify title helper text';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const textComponent = migration.editContentType('textComponent')

  textComponent.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Title of this component. Will be rendered as H1 tag.',
  })
};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const textComponent = migration.editContentType('textComponent')

  textComponent.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Title of this component.',
  })
};
