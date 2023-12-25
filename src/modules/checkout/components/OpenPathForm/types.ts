import { EpCustomerInterface } from '@modules/ep'

export type OpenPathOrder = {
  orderId: string // required
  total: number // required
  currency: string // ISO-4217 3 letter currency code
  paymentType: string // ‘sale’ or ‘auth’
  enableECheck: boolean // false or true
  disableCreditCard: boolean // false or true
  customer?: EpCustomerInterface
  billingAddress: Address
  shippingAddress: Address
  lineItems: LineItems[]
  css: Css[]
}

export type Address = {
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
}

export type LineItems = {
  productCode: string
  description: string
  amount: number
  quantity: number
}

export type Css = {
  type: string // ‘style’ or ‘link’
  cssText?: string // css string
  href?: string // a link to a hosted css stylesheet
}
