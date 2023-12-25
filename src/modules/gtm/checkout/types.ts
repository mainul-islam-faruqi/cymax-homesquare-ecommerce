import { EpFlowFieldValue } from '@modules/ep'

/**
 * * checkout pageview gtm event
 **/

export type CheckoutPageViewGTM = {
  ecomm_pagetype: string
  ecomm_prodid: string[]
  ecomm_pname: string[]
  ecomm_pvalue: number[]
  ecomm_totalvalue: number
}
// declare the new type for ga4
/**
 * * purchases gtm event
 **/

type PurchasesActionField = {
  id: string
  revenue: EpFlowFieldValue
  tax: EpFlowFieldValue
  shipping: EpFlowFieldValue
  orderDate: string
  coupon: string
  affiliation: string
}

export type PurchasesGTM = {
  ecommerce: {
    couponDiscount?:number
    transaction_id: string
    value: number
    tax: EpFlowFieldValue
    shipping: EpFlowFieldValue
    currency:string
    coupon?: string;
    items: items[]
  }
}


type OrderConfirmationActionField = {
  id: string[]
  affiliation: string
  revenue: number
  tax: number
  shipping: EpFlowFieldValue
  coupon: string
}

export type OrderConfirmationPageViewGTM = {
  ecomm_pagetype: string
  orderID: string
  'order-email'?: string
  customerType: string
  ecomm_pcat: string
  algoliaToken: string | null
}

/**
 * * checkout started gtm event
 **/

export type CheckoutStartedProductList = {
  name: string
  id: string
  price: number
  brand: string
  category: string
  variant: string
  quantity: string
  subtotal?: number
  total?: number
  discount?: string
}

type CheckoutStartedActionsFields = {
  step: string
  option: string
}

export type CheckoutStartedGTM = {
  ecommerce: {
    couponDiscount?:number
    transaction_id?: string
    value: number
    tax?: EpFlowFieldValue
    shipping?: EpFlowFieldValue
    currency:string
    coupon?: string;
    items: items[]
  }
}

/**
 * * shared types
 **/

type Products = {
  id: string
  name: string
  price: number
  quantity: number
  brand?: EpFlowFieldValue
  category?: EpFlowFieldValue
  variant?: EpFlowFieldValue
  discount?: string
}

type items = {
  item_id: string
  item_name: string
  discount?: number
  item_brand?: EpFlowFieldValue | undefined
  item_category?: EpFlowFieldValue | undefined
  promotion_id?: string
  promotion_name?: string
  quantity: number
}
