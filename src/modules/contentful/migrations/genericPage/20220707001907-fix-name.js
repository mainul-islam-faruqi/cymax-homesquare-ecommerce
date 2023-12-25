module.exports.description = 'Fix name';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const genericPage = migration.editContentType('genericPage').name('Generic Page')

};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const genericPage = migration.editContentType('genericPage').name('Component Generic Page')
};
