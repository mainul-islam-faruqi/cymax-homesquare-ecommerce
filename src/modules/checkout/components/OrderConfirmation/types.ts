import { EpProductCartCustomInputs } from '@modules/ep'

export interface Order {
  id: string
  type: string
  cymax_order_id: null
  cymax_order_status: null
  cymax_order_tracking_numbers: null
  cancellation_reason_id: null
  cancellation_reason: null
  processing_order_status_message: string
  payment_method: string
  status: string
  payment: string
  shipping: string
  anonymized: boolean
  customer: Customer
  shipping_address: IngAddress
  billing_address: IngAddress
  links: Links
  meta: OrderMeta
  relationships: OrderRelationships
  items: Item[]
}

export interface IngAddress {
  first_name: string
  last_name: string
  company_name: string
  line_1: string
  line_2: string
  city: string
  postcode: string
  county: string
  country: string
  phone_number?: string
  instructions?: string
}

export interface Customer {
  name: string
  email: string
}

export interface Item {
  type: string
  id: string
  quantity: number
  product_id: string
  name: string
  sku: string
  unit_price: UnitPrice
  value: UnitPrice
  links: Links
  meta: ItemMeta
  relationships: ItemRelationships
  custom_inputs?: EpProductCartCustomInputs
  catalog_id?: string
  catalog_source?: string
}

export interface MainImage {
  name: string
  type: string
  url: string
}

export interface PickerOptions {
  minQty: number
  setQty: number
}

export interface Price {
  display_price: PriceDisplayPrice
}

export interface PriceDisplayPrice {
  with_tax: Authorized
}

export interface Authorized {
  amount: number
  currency: Currency
  formatted: Formatted
}

export enum Currency {
  Usd = 'USD',
}

export enum Formatted {
  The000 = '$0.00',
  The7882 = '$78.82',
}

export interface ShippingUpgradeOption {
  Cost: number
  Name: string
  Order: number
  ProviderName: string
}

export interface Links {}

export interface ItemMeta {
  display_price: PurpleDisplayPrice
  timestamps: Timestamps
}

export interface PurpleDisplayPrice {
  with_tax: Discount
  without_tax: Discount
  tax: Discount
  discount: Discount
  without_discount: Discount
}

export interface Discount {
  unit: Authorized
  value: Authorized
}

export interface Timestamps {
  created_at: Date
  updated_at: Date
}

export interface ItemRelationships {
  cart_item: CartItem
}

export interface CartItem {
  data: DAT
}

export interface DAT {
  type: string
  id: string
}

export interface UnitPrice {
  amount: number
  currency: Currency
  includes_tax: boolean
}

export interface OrderMeta {
  display_price: FluffyDisplayPrice
  timestamps: Timestamps
}

export interface FluffyDisplayPrice {
  with_tax: Authorized
  without_tax: Authorized
  tax: Authorized
  discount: Authorized
  balance_owing: Authorized
  paid: Authorized
  authorized: Authorized
  without_discount: Authorized
}

export interface OrderRelationships {
  items: Items
}

export interface Items {
  data: DAT[]
}
