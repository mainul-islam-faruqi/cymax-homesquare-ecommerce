module.exports.description = '<Put your description here>'

module.exports.up = (migration) => {
  const cta = migration.editContentType('cta')
  cta.editField('linkToEntry').validations([
    {
      linkContentType: ['genericPage', 'genericPageWithMenu', 'plp'],
    },
  ])
}

module.exports.down = (migration) => {
  const cta = migration.editContentType('cta')
  cta.editField('linkToEntry').validations([
    {
      linkContentType: ['genericPage', 'genericPageWithMenu'],
    },
  ])
}
