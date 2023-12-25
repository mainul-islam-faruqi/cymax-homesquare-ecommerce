import { IntlShape } from 'react-intl'
import * as yup from 'yup'

export const contactUsFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    orderNumberSelect: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.orderNumberRequired' })),
    firstName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.firstNameRequired' })),
    lastName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.lastNameRequired' })),
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.required' })),
    phone: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.phoneNumberRequired' })),
    zipCode: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.postCodeRequired' })),
    firstContact: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.firstContactRequired' })),
    reason: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.reasonRequired' })),
  })
}
