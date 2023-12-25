import { SHIPPING_ADDRESS_REG_EXP } from '@modules/checkout'
import {
  NAME_REG_EXP,
  ZIP_CODE_REG_EXP,
} from '@modules/checkout/components/Delivery/types'
import { IntlShape } from 'react-intl'
import * as yup from 'yup'

export const updateAddressFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    firstName: yup
      .string()
      .matches(
        NAME_REG_EXP,
        intl.formatMessage({ id: 'validation.firstNamePattern' })
      )
      .required(intl.formatMessage({ id: 'validation.firstNameRequired' })),
    lastName: yup
      .string()
      .matches(
        NAME_REG_EXP,
        intl.formatMessage({ id: 'validation.lastNamePattern' })
      )
      .required(intl.formatMessage({ id: 'validation.lastNameRequired' })),

    phone: yup
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
    addressLineOne: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.addressLineOneRequired' }))
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
    addressLineTwo: yup
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
    state: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.stateRequired' })),
    zipCode: yup
      .string()
      .matches(
        ZIP_CODE_REG_EXP,
        intl.formatMessage({ id: 'validation.postCodePattern' })
      )
      .required(intl.formatMessage({ id: 'validation.postCodeRequired' })),
    country: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.countryRequired' })),
    companyName: yup.string().when('isCommercial', {
      is: true,
      then: yup
        .string()
        .required(intl.formatMessage({ id: 'validation.companyRequired' })),
    }),
    industry: yup
      .string()
      .nullable()
      .when('isCommercial', {
        is: true,
        then: yup
          .string()
          .required(intl.formatMessage({ id: 'validation.industryRequired' })),
      }),
  })
}
