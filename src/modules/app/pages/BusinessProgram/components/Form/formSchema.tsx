import { IntlShape } from 'react-intl'
import * as yup from 'yup'

export const businessProgramFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
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
    companyName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.companyRequired' })),
    industry: yup
      .string()
      .nullable()
      .required(intl.formatMessage({ id: 'validation.industryRequired' })),
    details: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
  })
}
