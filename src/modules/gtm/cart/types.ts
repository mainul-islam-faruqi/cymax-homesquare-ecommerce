import { EpFlowFieldValue } from "@myplanetdigital/elasticpath"

export type CartProducts = {
  name: string
  id: string
  price: string | number
  brand: string
  category: string
  variant: string
  quantity: string | number
  coupon: string
  discount: number
}

export type PageViewGTM = {
  ecomm_pagetype: string
}

export type AddCartGTM = {
  ecommerce: {
    currency: string
    value: number
    items: Item[]
  }
}

export type RemoveFromCartGTM = {
  ecommerce: {
    currencyCode: string
    remove: {
      products?: CartProducts[]
    }
  }
}

/**
 * * shared types
 **/

export type Item = {
  price: number
  item_id: string
  item_name: string
  discount?: number
  item_brand?: EpFlowFieldValue | undefined
  item_category?: string
  promotion_id?: string
  promotion_name?: string
  quantity: number
}



export type CheckoutViewCartGTM = {
  ecommerce: {
    currency: string
    value: any
    items: Item[]
  }
}
