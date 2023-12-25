module.exports.description = 'add helper text to footer'

module.exports.up = (migration) => {
  const footer = migration.editContentType('footer')

  footer.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText:
      'Only the entry with the name "global-footer" for each site will be rendered',
  })
}

module.exports.down = (migration) => {
  const footer = migration.editContentType('footer')

  footer.changeFieldControl('name', 'builtin', 'singleLine', {
    helpText: '',
  })
}
