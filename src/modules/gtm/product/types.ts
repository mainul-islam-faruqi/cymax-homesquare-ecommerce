import { EpFlowFieldValue } from '@modules/ep'

export type Product = {
  name: string
  id: string
  price: number
  brand: EpFlowFieldValue
  category: EpFlowFieldValue
  variant: EpFlowFieldValue
  position?: number
}

export type ProductSelectedGTM = {
  ecommerce: {
    items:ViewedItem[]
  }
}

export type ProductViewedGTM = {
  ecommerce: {
    currency: string
    value: number
    items: ViewedItem[]
  }
}

export type ProductDetailsPageViewGTM = {
  ecomm_pagetype: 'product'
  ecomm_prodid: string
  ecomm_pname: string
  ecomm_pvalue: string | number
}

export type ViewedItem = {
  item_id: string
  item_name: string
  discount?: number
  item_brand?: EpFlowFieldValue | undefined
  item_category?: string
  promotion_id?: string
  promotion_name?: string
  quantity?: number
  price?: number
  index?:number
}
