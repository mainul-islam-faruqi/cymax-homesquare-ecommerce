module.exports.description = 'Adding payment toggles and customer service email/phone';

module.exports.up = (migration) => {
  const theme = migration.editContentType('theme')

  theme
    .createField('openPathToggle')
    .name('OpenPath Toggle')
    .type('Boolean')
    .localized(false)
    .required(false)
    .disabled(false)
    .omitted(false)
    .defaultValue({
      "en-US": true
    })
    .validations([])
    
  theme
    .createField('paypalToggle')
    .name('Paypal Toggle')
    .type('Boolean')
    .localized(false)
    .required(false)
    .disabled(false)
    .omitted(false)
    .defaultValue({
      "en-US": true
    })
    .validations([])

  theme
    .createField('amazonPayToggle')
    .name('AmazonPay Toggle')
    .type('Boolean')
    .localized(false)
    .required(false)
    .disabled(false)
    .omitted(false)
    .defaultValue({
      "en-US": true
    })
    .validations([])

  theme
    .createField('affirmToggle')
    .name('Affirm Toggle')
    .type('Boolean')
    .localized(false)
    .required(false)
    .disabled(false)
    .omitted(false)
    .defaultValue({
      "en-US": true
    })
    .validations([])

  theme
    .createField('customerServicePhone')
    .name('Customer Service Phone')
    .type('Symbol')
    .localized(true)
    .required(false)
    .disabled(false)
    .omitted(false)
    .validations([])

  theme
    .createField('customerServiceEmail')
    .name('Customer Service Email')
    .type('Symbol')
    .localized(true)
    .required(false)
    .disabled(false)
    .omitted(false)
    .validations([{
      "regexp": {
        "pattern": "^\\w[\\w.-]*@([\\w-]+\\.)+[\\w-]+$",
        "flags": "i"
      },
      "message": "Please enter a valid email"
    }])

    theme.changeFieldControl('openPathToggle', 'builtin', 'radio', {
      helpText: 'Should OpenPath be displayed as a payment option on this site?',
    })

    theme.changeFieldControl('paypalToggle', 'builtin', 'radio', {
      helpText: 'Should Paypal be displayed as a payment option on this site?',
    })

    theme.changeFieldControl('amazonPayToggle', 'builtin', 'radio', {
      helpText: 'Should AmazonPay be displayed as a payment option on this site?',
    })

    theme.changeFieldControl('affirmToggle', 'builtin', 'radio', {
      helpText: 'Should Affirm be displayed as a payment option on this site?',
    })

    migration.transformEntries({
      contentType: 'theme',
      from: [],
      to: ['openPathToggle', 'paypalToggle', 'amazonPayToggle', 'affirmToggle'],
      transformEntryForLocale: function (fromFields, currentLocale) {
        return {
          openPathToggle: true,
          paypalToggle: true,
          amazonPayToggle: true,
          affirmToggle: true
        }
      }
    })
  
};

module.exports.down = (migration) => {
  const theme = migration.editContentType('theme')
  
  theme.deleteField('openPathToggle')
  theme.deleteField('paypalToggle')
  theme.deleteField('amazonPayToggle')
  theme.deleteField('affirmToggle')
  theme.deleteField('customerServicePhone')
  theme.deleteField('customerServiceEmail')
};
