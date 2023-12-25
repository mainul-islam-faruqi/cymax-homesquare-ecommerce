import { EpCustomerInterface } from '@modules/ep'
import { IntlShape } from 'react-intl'
import * as yup from 'yup'
import { SHIPPING_ADDRESS_REG_EXP } from '../AddressForms'
export interface DeliveryForm {
  email: string
  first_name: string
  last_name: string
  line_1: string
  line_2: string
  city: string
  country: string
  postcode: string
  county: string
  phone_number: string
  instructions: string
  isCommercial: boolean
  company_name?: string
  industry?: string
  isAddressSaved?: string
}

export interface EpCustomer {
  id: string
  type: string
  resetToken: any
  wishlist?: any
  name: string
  email: string
  password: any
  authentication_mechanism: string
}

export type DeliveryComponentProps = {
  data: any
  saveData: (data: any) => void
  cartId: string
  customer: EpCustomerInterface | null | undefined
}

export const registerDeliveryFormSchema = (
  deps: { intl: IntlShape },
  ignore: boolean
) => {
  const { intl } = deps
  if (ignore) {
    return yup.object().shape({})
  }
  return yup.object().shape({
    email: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.emailRequired' }))
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .when('isCommercial', {
        is: true,
        then: yup
          .string()
          .matches(
            /(^[\w\-\._\+%]+@(?!(?:aol|gmail|hotmail|icloud|outlook|yahoo)\.com$))/gi,
            { message: intl.formatMessage({ id: 'validation.commercial' }) }
          ),
      }),
    first_name: yup
      .string()
      .matches(
        NAME_REG_EXP,
        intl.formatMessage({ id: 'validation.firstNamePattern' })
      )
      .required(intl.formatMessage({ id: 'validation.firstNameRequired' })),
    last_name: yup
      .string()
      .matches(
        NAME_REG_EXP,
        intl.formatMessage({ id: 'validation.lastNamePattern' })
      )
      .required(intl.formatMessage({ id: 'validation.lastNameRequired' })),
    line_1: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.line1Required' }))
      .test(
        'notPOBox',
        intl.formatMessage({ id: 'validation.invalidAddress' }),
        (val) => {
          if (val == null) {
            return true
          }
          return (
            SHIPPING_ADDRESS_REG_EXP.find((regex: RegExp) => {
              return regex.test(val)
            }) == null
          )
        }
      ),
    line_2: yup
      .string()
      .test(
        'notPOBox',
        intl.formatMessage({ id: 'validation.invalidAddress' }),
        (val) => {
          if (val == null) {
            return true
          }
          return (
            SHIPPING_ADDRESS_REG_EXP.find((regex: RegExp) => {
              return regex.test(val)
            }) == null
          )
        }
      ),
    city: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.cityRequired' })),
    country: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.countryRequired' })),
    postcode: yup
      .string()
      .matches(
        ZIP_CODE_REG_EXP,
        intl.formatMessage({ id: 'validation.postCodePattern' })
      )
      .required(intl.formatMessage({ id: 'validation.postCodeRequired' })),
    county: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.countyRequired' })),
    phone_number: yup
      .string()
      .test(
        'validPhone',
        intl.formatMessage({ id: 'validation.phoneNumberInvalid' }),
        (val) => {
          if (!val) {
            // If the phone field is empty, it won't trigger this validation and will be caught by the 'required' validation.
            return true
          }
          const phoneNumberWithoutFormatting = val.replaceAll(/\D/gi, '')
          return phoneNumberWithoutFormatting.length >= 10
        }
      )
      .required(intl.formatMessage({ id: 'validation.phoneNumberRequired' })),
    instructions: yup.string(),
    isCommercial: yup.boolean(),
    company_name: yup.string().when('isCommercial', {
      is: true,
      then: (schema) =>
        schema.required(
          intl.formatMessage({ id: 'validation.companyRequired' })
        ),
    }),
    industry: yup
      .string()
      .nullable()
      .when('isCommercial', {
        is: true,
        then: (schema) =>
          schema.required(
            intl.formatMessage({ id: 'validation.industryRequired' })
          ),
      }),
  })
}

export const ZIP_CODE_REG_EXP: RegExp = /^\d{5}([\-]?\d{4})?$/i

export const NAME_REG_EXP: RegExp = /^[A-Za-z\s]+$/i
