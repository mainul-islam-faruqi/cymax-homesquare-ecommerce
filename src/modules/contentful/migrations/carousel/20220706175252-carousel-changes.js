module.exports.description = 'Change products message';

module.exports.up = (migration) => {
  // Add your UP migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples
  const carousel = migration.editContentType('carousel')

  carousel.changeFieldControl('products', 'builtin', 'tagEditor', {
    helpText: 'Only needed for Products Carousel Variant type. Please enter product SKUs from Elastic Path.',
  })
};

module.exports.down = (migration) => {
  // Add your DOWN migration script here. See examples here:
  // https://github.com/contentful/migration-cli/tree/master/examples

  const carousel = migration.editContentType('carousel')

  carousel.changeFieldControl('products', 'builtin', 'tagEditor', {
    helpText: 'Only needed for Products Carousel Variant type. Please enter product IDs from Elastic Path.',
  })
};
