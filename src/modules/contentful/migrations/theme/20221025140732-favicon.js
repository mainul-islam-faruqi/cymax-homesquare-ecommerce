module.exports.description = 'Add favicon field'

module.exports.up = (migration) => {
  const theme = migration.editContentType('theme')

  theme
    .createField('favicon')
    .name('Favicon')
    .type('Link')
    .localized(false)
    .required(false)
    .disabled(false)
    .omitted(false)
    .validations([])
    .linkType('Asset')
  theme.changeFieldControl('favicon', 'builtin', 'assetLinkEditor')

  theme
    .createField('storeName')
    .name('Store Name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('storeName', 'builtin', 'singleLine')

  theme
    .createField('storeDescription')
    .name('Store Description')
    .type('Text')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('storeDescription', 'builtin', 'markdown')

  theme
    .createField('storeTelephone')
    .name('Store Telephone')
    .type('Symbol')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('storeTelephone', 'builtin', 'singleLine')

  theme
    .createField('storeStreetAddress')
    .name('Store Street Address')
    .type('Symbol')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('storeStreetAddress', 'builtin', 'singleLine')

  theme
    .createField('storeAddressLocality')
    .name('Store Address Locality')
    .type('Symbol')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('storeAddressLocality', 'builtin', 'singleLine')

  theme
    .createField('storeAddressRegion')
    .name('Store Address Region')
    .type('Symbol')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('storeAddressRegion', 'builtin', 'singleLine')

  theme
    .createField('storePostalCode')
    .name('Store Postal Code')
    .type('Symbol')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('storePostalCode', 'builtin', 'singleLine')

  theme
    .createField('storeCountry')
    .name('Store Country')
    .type('Symbol')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('storeCountry', 'builtin', 'singleLine')

  theme
    .createField('storeLogo')
    .name('Store Logo')
    .type('Symbol')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('storeLogo', 'builtin', 'urlEditor')

  theme
    .createField('storeOpenHours')
    .name('Store Open Hours')
    .type('Symbol')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('storeOpenHours', 'builtin', 'singleLine')

  theme
    .createField('storeCloseHours')
    .name('Store Close Hours')
    .type('Symbol')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('storeCloseHours', 'builtin', 'singleLine')

  theme
    .createField('organizationName')
    .name('Organization Name')
    .type('Symbol')
    .localized(false)
    .required(true)
    .disabled(false)
    .omitted(false)
    .validations([])
  theme.changeFieldControl('organizationName', 'builtin', 'singleLine')
}

module.exports.down = (migration) => {
  const theme = migration.editContentType('theme')

  theme.deleteField('favicon')
  theme.deleteField('storeName')
  theme.deleteField('storeDescription')
  theme.deleteField('storeTelephone')
  theme.deleteField('storeStreetAddress')
  theme.deleteField('storeAddressLocality')
  theme.deleteField('storeAddressRegion')
  theme.deleteField('storePostalCode')
  theme.deleteField('storeCountry')
  theme.deleteField('storeLogo')
  theme.deleteField('storeOpenHours')
  theme.deleteField('storeCloseHours')
  theme.deleteField('organizationName')
}
