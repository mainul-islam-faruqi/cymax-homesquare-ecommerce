import {
  EpCartInterface,
  EpCartItemInterface,
  EpProductInterface
} from '@modules/ep'
import { ViewedItem } from '.'
import { CartProducts } from './cart'

export const formatRemoveFromCartData = (data: EpCartInterface) => {
  const products = data?.data
  return products
    ?.filter((product) => product.type === 'cart_item')
    ?.map((product) => formatProductData(product)) as CartProducts[]
}

export const formatProductData = (data: EpCartItemInterface) => {
  const price =
    data?.meta?.display_price?.with_tax?.unit?.amount ||
    data?.meta?.display_price?.without_tax?.unit?.amount
  return {
    name: data?.name,
    id: data?.sku,
    price: parseFloat((price! / 100).toFixed(2)),
    brand: data?.custom_inputs?.brand,
    category: data?.custom_inputs?.category,
    variant: data?.custom_inputs?.variant,  
    quantity: data?.quantity,
    discount: (data?.meta?.display_price?.discount?.value?.formatted || 0) as number,
    coupon: Object.keys(data?.meta.display_price?.discounts || {})[0],
  } as CartProducts
}

export const formatProductCartData = (
  data: EpCartItemInterface,
) => {
  const price =
    data?.unit_price?.amount
  const discount = (data?.custom_inputs?.price?.original_display_price?.without_tax?.amount || 0) - (data?.custom_inputs?.price?.display_price?.without_tax?.amount || 0) 
  const discountFinal = discount < 0 ? 0 : discount
  return {
    item_name: data?.name,
    item_id: data?.sku,
    price: parseFloat((price! / 100).toFixed(2)),
    item_brand: data?.custom_inputs?.brand,
    item_category: data?.custom_inputs?.category,
    discount:discountFinal / 100
    } as ViewedItem
}

export const formatProductCardData = (
  data: EpProductInterface,
) => {
  const { extensions } = data?.attributes ?? {}
  const productExtended = extensions?.['products(extended)']
  const brand = (productExtended?.brand_name ?? '') as string
  const category = (productExtended?.categoryname ?? '') as string
  const variant = (productExtended?.productgroupvariation ?? '') as string
  const price =
    data?.meta?.display_price?.without_tax?.amount ??
    data?.meta?.display_price?.with_tax?.amount
  const quantity = (productExtended?.quantity ?? 1) as number
  const displayPrice = data?.meta?.display_price?.without_tax?.amount
  const originalPrice = data?.meta?.original_display_price?.without_tax.amount || 0
  const discount = originalPrice == 0 ? 0 :((displayPrice) || 0) - (originalPrice || 0)
  return [
    {
      item_name: data.attributes.name,
      item_id: data.attributes.sku,
      price: parseFloat((price! / 100).toFixed(2)),
      item_brand:brand,
      item_category:category,
      quantity,
      discount:Math.abs(discount/100)
    },
  ]
}
