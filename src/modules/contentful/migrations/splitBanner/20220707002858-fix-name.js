module.exports.description = 'Fix name and description';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  migration.editContentType('splitBanner').name('Component Split Banner').description('Split Banner')
};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  migration.editContentType('splitBanner').name('Split Banner').description('Split Banner Component')
};
