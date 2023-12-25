module.exports.description = 'Fix description';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  migration.editContentType('seo').description('SEO Metadata for web pages').name('SEO')
};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  migration.editContentType('seo').description('SEO Metadata for web pages in Compose. DO NOT DELETE').name('Compose: SEO')
};
