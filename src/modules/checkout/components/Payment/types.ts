import { PlaceOrderMutationVariables } from '@modules/checkout/hooks'
import { IntlShape } from 'react-intl'
import { UseMutationResult } from 'react-query'
import * as yup from 'yup'
import { NAME_REG_EXP, ZIP_CODE_REG_EXP } from '../Delivery/types'

export type PaymentComponentProps = {
  saveData: (data: any) => void
  data: any
  placeOrder: UseMutationResult<
    unknown,
    unknown,
    PlaceOrderMutationVariables,
    unknown
  >
  cartId: string
}

export enum PaymentMethod {
  CARD = 'card',
  PAYPAL = 'paypal',
  AMAZON = 'amazon',
  AFFIRM = 'affirm',
  PO = 'po',
  CSA = 'csa',
}

export type PaymentForm = {
  method: string
  sameAsShipping: boolean
  first_name?: string
  last_name?: string
  phone_number?: string
  line_1?: string
  line_2?: string
  city?: string
  country?: string
  postcode?: string
  county?: string
}

export const registerPaymentFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    method: yup.string().required(),
    sameAsShipping: yup.boolean(),
    first_name: yup.string().when('sameAsShipping', {
      is: false,
      then: (schema) =>
        schema
          .matches(
            NAME_REG_EXP,
            intl.formatMessage({ id: 'validation.firstNamePattern' })
          )
          .required(intl.formatMessage({ id: 'validation.firstNameRequired' })),
    }),
    last_name: yup.string().when('sameAsShipping', {
      is: false,
      then: (schema) =>
        schema
          .matches(
            NAME_REG_EXP,
            intl.formatMessage({ id: 'validation.lastNamePattern' })
          )
          .required(intl.formatMessage({ id: 'validation.lastNameRequired' })),
    }),
    phone_number: yup.string().when('sameAsShipping', {
      is: false,
      then: (schema) =>
        schema
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
          .required(
            intl.formatMessage({ id: 'validation.phoneNumberRequired' })
          ),
    }),
    line_1: yup.string().when('sameAsShipping', {
      is: false,
      then: (schema) =>
        schema.required(intl.formatMessage({ id: 'validation.line1Required' })),
    }),
    line_2: yup.string(),
    city: yup.string().when('sameAsShipping', {
      is: false,
      then: (schema) =>
        schema.required(intl.formatMessage({ id: 'validation.cityRequired' })),
    }),
    country: yup.string().when('sameAsShipping', {
      is: false,
      then: (schema) =>
        schema.required(
          intl.formatMessage({ id: 'validation.countryRequired' })
        ),
    }),
    postcode: yup.string().when('sameAsShipping', {
      is: false,
      then: (schema) =>
        schema
          .matches(
            ZIP_CODE_REG_EXP,
            intl.formatMessage({ id: 'validation.postCodePattern' })
          )
          .required(intl.formatMessage({ id: 'validation.postCodeRequired' })),
    }),
    county: yup.string().when('sameAsShipping', {
      is: false,
      then: (schema) =>
        schema.required(
          intl.formatMessage({ id: 'validation.countyRequired' })
        ),
    }),
  })
}
