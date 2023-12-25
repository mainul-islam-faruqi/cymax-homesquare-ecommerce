import { EpAddressInterface } from '@myplanetdigital/elasticpath'

export interface FormData {
  firstName: string
  lastName: string
  phone: string
  addressLineOne: string
  addressLineTwo?: string
  city: string
  country: string
  zipCode: string
  state: string
  isCommercial: boolean
  companyName?: string
  industry?: string
}
export interface EpCustomAddressInterface extends EpAddressInterface {
  industry?: string
  isCommercial?: boolean
  id?: string
}

export interface ComposableCustomUpdateAddress {
  mutate: (params: {
    address: EpCustomAddressInterface
    addressId: string
  }) => Promise<void>
  isLoading: boolean
}

export const relationsAddressFields = {
  firstName: 'first_name',
  lastName: 'last_name',
  phone: 'phone_number',
  addressLineOne: 'line_1',
  addressLineTwo: 'line_2',
  city: 'city',
  country: 'country',
  zipCode: 'postcode',
  state: 'county',
  isCommercial: 'isCommercial',
  companyName: 'company_name',
  industry: 'industry',
}
