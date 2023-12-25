export interface AffirmCheckout {
  merchant: {
    user_confirmation_url: Url
    user_cancel_url: Url
    user_confirmation_url_action: 'GET' | 'POST'
    name: string
  }
  shipping: AffirmAddress
  billing?: AffirmAddress
  items: AffirmItem[]
  discounts?: AffirmDiscount
  metadata?: AffirmMetadata
  order_id?: string
  currency: 'USD' | 'CAD'
  financing_program?: string
  shipping_amount: number
  tax_amount: number
  total: number
}

export interface AffirmAddress {
  name: {
    first: string
    last: string
  }
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    zipcode: string
    country: string
  }
  phone_number: string
  email: string
}

export interface AffirmItem {
  display_name: string
  sku: string
  unit_price: number
  qty: number
  item_image_url?: string
  item_url?: string
  categories?: Array<string[]>
}

export interface AffirmDiscount {
  [key: string]: {
    discount_amount: number
    discount_display_name: string
  }
}

export interface AffirmMetadata {
  shipping_type?: string
  mode: 'modal' | 'redirect'
}

export interface AffirmError {
  reason: string
}

export interface AffirmSuccess {
  created:string,
  checkout_token: string
}

export type HttpsUrl = `https://${string}`
export type HttpUrl = `http://${string}`
export type Url = HttpsUrl | HttpUrl
