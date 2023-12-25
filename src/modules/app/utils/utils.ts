import {
  KEY_MULTI_PAGE_QUERY,
  MultiPageCheckoutData,
  MultiPageCheckoutOrder
} from '@modules/checkout'
import {
  Item,
  Order
} from '@modules/checkout/components/OrderConfirmation/types'
import { LinkVariant } from '@modules/contentful/components/default/CallToAction/types'
import {
  ComposableImage,
  ContentfulImageOptions,
  ImgFitMode,
  ImgFocusArea
} from '@modules/contentful/components/default/ComposableImage/types'
import { ContentfulCTA } from '@modules/contentful/pages/types'
import {
  Alignment,
  BackgroundColor,
  VerticalAlignment
} from '@modules/contentful/utils'
import {
  EpCartInterface,
  EpCartItemInterface,
  EpCustomerInterface,
  EpDisplayPriceValue,
  EpProductInterface
} from '@modules/ep'
import { EpNodeWithRelationships } from '@modules/ep/taxonomy/types'
import {
  EpFlowFieldsInterface, EpFlowFieldValue, EpOrderItemInterface
} from '@myplanetdigital/elasticpath'
import axios from 'axios'
import {
  APP_DOMAIN_BASE_URL,
  CAROUSEL_PRODUCT_LIMIT,
  EP_CART_ITEM_KEY,
  EP_ORDER_ITEM_KEY,
  FLAT_SHIPPING_KEY,
  HOMESQUARE_FLAT_SHIPPING_CENTS,
  HOMESQUARE_FLAT_SHIPPING_MINIMUM_CENTS,
  NEXT_PUBLIC_SITE_IDENTIFIER
} from '../constants'
import { TaxonomyInterface } from '../hooks/useTaxonomy'
import {
  GalleryProduct,
  ShippingOption
} from '../pages/ProductDetailsPage/components'
import { OrderSummaryDataType, ValueWithFormat } from './types'

const KEY = `${NEXT_PUBLIC_SITE_IDENTIFIER}-recently-viewed-products`
export const GUEST_USER_SHIPPING_ADDRESS_KEY = `${NEXT_PUBLIC_SITE_IDENTIFIER}-guest-user-shipping-address`
export const IS_HOMESQUARE = NEXT_PUBLIC_SITE_IDENTIFIER === 'homesquare'

export const getPageURL = (contentType: string, slug?: string): string => {
  let contentTypeURL = ''
  switch (contentType) {
    case 'genericPage':
    case 'GenericPage':
    case 'genericPageWithMenu':
    case 'GenericPageWithMenu':
      contentTypeURL = slug === 'homepage' ? `/` : `/${slug}`
      break
    case 'productDetailPage':
    case 'plp':
      contentTypeURL = `/${slug}`
      break
    // case 'pageProductListingPage':
    //   contentTypeURL = `/${slug}`
    //   break
    default:
      contentTypeURL = ''
  }
  return contentTypeURL
}

export const getLinkTarget = (link?: ContentfulCTA) => {
  const startsWithSlash: boolean = !!link?.url?.startsWith('/')
  const includesExternalLink: boolean =
    !!link?.url?.includes('http') || !!link?.url?.includes('www.')
  const isExternal: boolean =
    !!link?.linkToEntry || startsWithSlash
      ? false
      : includesExternalLink
      ? true
      : false

  let href = ''

  if (link?.linkToEntry) {
    href = getPageURL(
      link?.linkToEntry?.sys?.contentType?.sys?.id ||
        link?.linkToEntry?.__typename ||
        '',
      link?.linkToEntry?.fields?.slug || link?.linkToEntry?.slug || ''
    )
  } else if (link?.url) {
    href = link?.url
  }
  if (link?.params) {
    href += link?.params
  }
  href?.trim()
  return { isExternal, href }
}

export const getFlexAlignment = (
  alignment: Alignment
): 'center' | 'end' | 'baseline' => {
  switch (alignment) {
    case Alignment.Center:
      return 'center'
    case Alignment.Right:
      return 'end'
    case Alignment.Left:
    default:
      return 'baseline'
  }
}

export const getAlignItems = (
  alignment?: VerticalAlignment
): 'start' | 'center' | 'end' => {
  switch (alignment) {
    case VerticalAlignment.Start:
      return 'start'
    case VerticalAlignment.End:
      return 'end'
    case VerticalAlignment.Center:
    default:
      return 'center'
  }
}

export const getTextAlignment = (
  alignment?: Alignment
): 'center' | 'right' | 'left' => {
  switch (alignment) {
    case Alignment.Center:
      return 'center'
    case Alignment.Right:
      return 'right'
    case Alignment.Left:
    default:
      return 'left'
  }
}

export const handleColor = (bgColor: BackgroundColor) => {
  return BackgroundColor.Dark === bgColor ? 'shading.100' : 'shading.900'
}

export const handleTextAlign = (alignment: Alignment) =>
  alignment?.toLowerCase() as 'center' | 'left' | 'right'

export const getImageOptions = (
  composableImage: ComposableImage,
  width?: number,
  height?: number,
  fit?: ImgFitMode,
  focusArea?: ImgFocusArea
): ContentfulImageOptions => {
  return {
    width: width || composableImage?.width,
    height: height || composableImage?.height,
    fit: fit || composableImage?.fit,
    focusArea: focusArea || composableImage?.focusArea,
    format: composableImage?.format,
    quality: composableImage?.quality ?? 100,
    radius: composableImage?.radius ?? 0,
    progressive: composableImage?.progressive,
    png8: composableImage?.png8,
  }
}

export const getButtonVariant = (link: ContentfulCTA): string => {
  switch (link?.variant) {
    case LinkVariant.Solid:
      return 'solid'
    case LinkVariant.Outline:
      return 'outline'
    case LinkVariant.Ghost:
      return 'ghost'
    case LinkVariant.Link:
    default:
      return 'link'
  }
}

export const getSKUs = (cart?: EpCartItemInterface[]) => {
  return cart === undefined || cart?.length === 0
    ? []
    : cart
        .filter((product) => product.type === 'cart_item')
        .map((product) => product.sku)
}

export const getProductImages = (product: EpProductInterface) => {
  const hasFiles =
    !!product?.attributes?.extensions?.['products(extended)']?.image_list
  const files = hasFiles
    ? (
        product?.attributes?.extensions?.['products(extended)']
          ?.image_list as string
      ).split(',')
    : []
  const [image] = files ?? []

  return {
    hasFiles,
    files,
    image,
  }
}

export const formatShippingObject = (
  object?: EpFlowFieldValue
): ShippingOption[] | null => {
  if (object) {
    try {
      const output = JSON.parse(String(object))
      return output
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn((error as Error).message)
    }
  }
  return null
}

export const formatShippingDate = (
  productsProps?: EpFlowFieldValue
): number => {
  return productsProps ? parseInt(String(productsProps)) : 0
}

export const saveProductToSession = (productSKU?: string): void => {
  if (window && productSKU) {
    const recentlyViewedProductsSession = window?.sessionStorage.getItem(KEY)
    let recentlyViewedProducts = []
    if (recentlyViewedProductsSession) {
      recentlyViewedProducts = JSON.parse(recentlyViewedProductsSession)
    }
    if (!recentlyViewedProducts?.includes(productSKU)) {
      recentlyViewedProducts = [productSKU, ...recentlyViewedProducts]
      window.sessionStorage.setItem(KEY, JSON.stringify(recentlyViewedProducts))
    }
  }
}

export const getProductsFromSession = (): string[] => {
  let products: string[] = []

  if (window) {
    const sessionProducts = window.sessionStorage.getItem(KEY)
    if (sessionProducts) {
      products = JSON.parse(sessionProducts)
      if (products?.length > CAROUSEL_PRODUCT_LIMIT) {
        products = products.slice(0, CAROUSEL_PRODUCT_LIMIT)
      }
    }
  }
  return products
}

const imagesOptions = [
  'jpg',
  'png',
  'gif',
  'webp',
  'tiff',
  'psd',
  'raw',
  'bmp',
  'heif',
  'indd',
  'jpeg ',
]

const videoOptions = [
  'mp4',
  'mov',
  'wmv',
  'avi',
  'avchd',
  'webm',
  'mpeg-2',
  'html5',
  'flv',
  'f4v',
  'swf',
]

export const handleExtension = (item: string) => {
  const imageValidation =
    imagesOptions.some((extension) => item.includes(extension)) && 'image'
  const videoValidation =
    videoOptions.some((extension) => item.includes(extension)) && 'video'

  return imageValidation || videoValidation
}

export const getImageGallery = (
  product?: EpFlowFieldsInterface,
  name?: string
) => {
  try {
    const gallery =
      product?.image_list && typeof product?.image_list === 'string'
        ? (product?.image_list?.split(',').map((value) => ({
            name,
            url: value,
            type: handleExtension(value) || '',
          })) as GalleryProduct[])
        : []
    return gallery ? gallery.slice(0, 14) : []
  } catch (error) {
    return []
  }
}

export const getCartItemShippingOptionKey = (itemId: string) =>
  `shipping_${itemId}`

export const isCaliforniaCounty = () => {
  const shippingAddress: MultiPageCheckoutData = JSON.parse(
    window?.localStorage?.getItem(KEY_MULTI_PAGE_QUERY) || 'null'
  )
  if (shippingAddress && shippingAddress.delivery) {
    return (
      shippingAddress.delivery.country === 'US' &&
      shippingAddress.delivery.county === 'CA'
    )
  }
  return false
}

export const getCookie = (cookieKey: string): string => {
  const cookies = document?.cookie?.split(';')?.map((token) => {
    const cookie = token.trim().split('=')
    const key = cookie?.[0]
    const value = cookie?.[1]
    return { key, value }
  })
  return cookies?.find((c) => c.key === cookieKey)?.value ?? ''
}

export const getIpClient = async (): Promise<string> => {
  let ip = ''
  try {
    const response = await axios.get('https://api.ipify.org?format=json')
    ip = response?.data?.ip
  } catch (error) {
    console.error(error)
  }
  return ip
}

export const removeDollarSign = (price?: string) => {
  if (!price) {
    return 0
  }
  return Number(price) ? Number(price) : Number(price.substring(1))
}

export const parseOpenPathPayload = (payload?: string) => {
  if (!payload) {
    return {}
  }
  return payload?.split('&').reduce((prev: object, curr: string) => {
    const [key, value] = curr.split('=')
    return { ...prev, [key]: value }
  }, {})
}

export const getOrderHighestShippingPrice = (
  items: EpOrderItemInterface[]
): EpOrderItemInterface | null => {
  if (!items || items?.length === 0) {
    return null
  }
  return items
    ?.filter((item: EpOrderItemInterface) => item?.sku?.startsWith('shipping_'))
    ?.reduce(function (prev, current) {
      return prev.value?.amount > current.value?.amount ? prev : current
    })
}

export const getPreviousShippingOption = (
  cartItems: EpCartItemInterface[] | undefined,
  cartItem: EpCartItemInterface
) => {
  const cartShippingOption = cartItems?.find((item) => {
    return item.sku === getCartItemShippingOptionKey(cartItem.product_id)
  })
  return cartShippingOption
    ? JSON.parse(cartShippingOption.description)?.shippingOption
    : false
}

export const validURL = (str: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )
  return !!pattern.test(str)
}

export const isEmpty = (val: any) =>
  val === undefined || val === null ? '' : val

export const subtotalValue = (
  data?: Array<EpCartItemInterface | Item> | undefined,
  type?: string
) => {
  return data?.reduce((prev, curr) => {
    if (
      curr.type === type &&
      !(curr?.sku as string).includes('shipping_') &&
      curr.sku !== FLAT_SHIPPING_KEY &&
      curr.value.amount > 0
    ) {
      prev += curr.value.amount
    }
    return prev
  }, 0)
}

export const removeCharacterFromString = (
  str: string,
  remove: string
): string => {
  return str.replace(remove, '')
}

export const capitalizeAllWords = (str: string) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const formatNumber = (value: number) => {
  return String(value / 100)
}

export const shippingTotal = (
  items: Array<EpCartItemInterface | Item> | undefined,
  typeItem = 'shipping_'
): number => {
  const shippingTotal = items
    ? items?.reduce((acc: number, item) => {
        if ((item?.sku as string).includes(typeItem)) {
          return acc + item?.value.amount
        }
        return acc
      }, 0)
    : 0

  return shippingTotal
}

export const taxesValue = (
  items: Array<EpCartItemInterface | Item> | undefined
): number => {
  if (typeof items == 'undefined') {
    return 0
  }

  return items.reduce((prev, curr) => {
    if (curr.type === 'cart_item') {
      const val = (curr.value.amount! / 100).toFixed(2)
      prev += parseFloat(val)
    }
    return prev
  }, 0)
}

export const orderSummaryData = (
  data: EpCartInterface | Order | undefined | MultiPageCheckoutOrder
): OrderSummaryDataType => {
  const type = data?.hasOwnProperty('items')
    ? EP_ORDER_ITEM_KEY
    : EP_CART_ITEM_KEY
  const items = data?.hasOwnProperty('items')
    ? (data as Order)?.items
    : (data as EpCartInterface)?.data

  const without_tax = data?.meta?.display_price
    ?.without_tax as EpDisplayPriceValue
  const with_tax = data?.meta?.display_price?.with_tax as EpDisplayPriceValue
  let amountToHandleWithoutTax = without_tax?.amount
  let amountToHandleWithTax = with_tax?.amount

  const flatShippingAmount = shippingTotal(items, FLAT_SHIPPING_KEY)
  const shippingItemsTotal = shippingTotal(items)
  let shippingAmount = shippingItemsTotal

  const taxes = data?.meta?.display_price?.tax
  const promotion = data?.meta?.display_price?.discount

  if (type === EP_CART_ITEM_KEY) {
    //Handling /cart and /checkout/*
    if (flatShippingAmount > 0) {
      // flat-rate in the cart. we need to remove it from the total
      amountToHandleWithoutTax -= flatShippingAmount
      amountToHandleWithTax -= flatShippingAmount
    }
    //TODO change IS_HOMESQUARE for a FF
    if (
      IS_HOMESQUARE &&
      shippingAmount === 0 &&
      amountToHandleWithoutTax < HOMESQUARE_FLAT_SHIPPING_MINIMUM_CENTS
    ) {
      shippingAmount += HOMESQUARE_FLAT_SHIPPING_CENTS
      amountToHandleWithTax += shippingAmount
      amountToHandleWithoutTax += shippingAmount
    }
  } else {
    //Handling /order-confirmation
    if (flatShippingAmount > 0) {
      shippingAmount += flatShippingAmount
    }
  }

  const subtotalAmount = subtotalValue(items, type)

  const shipping: ValueWithFormat = {
    amount: shippingAmount,
    formatted: formatShipping(shippingAmount!),
  }

  const subtotal: ValueWithFormat = {
    amount: subtotalAmount,
    formatted: formatMoney(subtotalAmount!),
  }

  const total_without_tax = {
    amount: amountToHandleWithoutTax,
    formatted: formatMoney(amountToHandleWithoutTax ?? 0),
    currency: 'USD',
  } as EpDisplayPriceValue
  const total = {
    amount: amountToHandleWithTax,
    formatted: formatMoney(amountToHandleWithTax ?? 0),
    currency: 'USD',
  } as EpDisplayPriceValue
  return {
    subtotal,
    total,
    total_without_tax,
    taxes,
    promotion,
    shipping,
  }
}

export const formatShipping = (shipping: number): string | undefined => {
  return shipping != 0
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(shipping / 100)
    : undefined
}

export const formatMoney = (value?: number): string | undefined => {
  if (!value) {
    return undefined
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value / 100)
}

export const formatTaxes = (taxes: EpDisplayPriceValue): string => {
  const label = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(0)

  const newTaxes = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(taxes?.amount / 100)

  return taxes?.amount === 0 ? label : newTaxes
}

export const getCoupons = (items: Array<any>) => {
  const coupons = []
  for (const item of items) {
    if (item.value.amount < 0) {
      coupons.push(item.sku)
      continue
    }
    const discounts = item?.discounts
    if (discounts?.length) {
      for (const discount of discounts) {
        coupons.push(discount.code)
      }
    }
  }

  return coupons
}

type OrderConfirmationPreparedDataType = {
  data: MultiPageCheckoutData
  customer: EpCustomerInterface | null | undefined
}

export const prepareOrderConfirmationData = ({
  data,
  customer,
}: OrderConfirmationPreparedDataType) => {
  const coupons = getCoupons(data?.order?.items ?? [])
  let coupon = ''
  if (coupons?.length) {
    coupon = coupons[0]
  }
  const couponDiscount = Math.abs((data?.order?.meta?.display_price.discount.amount || 0)/100)
  const { shipping } = orderSummaryData(data?.order)
  const orderEmail = (data?.customer?.email || customer?.email) as string
  const orderId = data?.order?.id as string
  const customerType = customer ? 'authenticated' : 'guest'
  const affiliation = localStorage.getItem('referral') ?? 'direct'
  const revenue = parseFloat(
    (data?.order?.meta?.display_price?.with_tax?.amount! / 100).toFixed(2)
  )
  const tax = parseFloat(
    (data?.order?.meta?.display_price?.tax?.amount! / 100).toFixed(2)
  )

  const filteredProductList = data?.order?.items
    ?.filter((item) => !item.sku?.includes('shipping_'))
    ?.filter((item) => item?.custom_inputs)
  const currency = data.order?.meta.display_price.with_tax.currency || ""
  const productSkus = filteredProductList?.map((item) => item.sku) || []
  const totalCartValue = ((data?.order?.meta?.display_price.with_tax?.amount || 0))/100 
  const items =
    filteredProductList?.map((item) => ({
      item_id: item.sku,
      item_name: item.name,
      item_brand: item.custom_inputs?.brand,
      item_category: item.custom_inputs?.category,
      price: parseFloat((item?.unit_price?.amount / 100)?.toFixed(2)),
      quantity: item?.quantity,
      discount: (
        (item.custom_inputs?.price?.original_display_price?.without_tax?.amount ?? 0) === 0
          ? 0
          : ((item.custom_inputs?.price?.original_display_price?.without_tax?.amount ?? 0) -
             (item.custom_inputs?.price?.display_price?.without_tax?.amount ?? 0)) / 100
      ),
    })) || []

  return {
    coupon,
    orderEmail,
    orderId,
    customerType,
    shipping: parseFloat((shipping?.amount! / 100)?.toFixed(2)),
    affiliation,
    revenue,
    tax,
    productIds: productSkus,
    items,
    currency,
    totalCartValue,
    couponDiscount
  }
}

export const formattedValueToFloat = (
  value: Number | String | null | undefined
): Number | null => {
  if (!value) {
    return 0
  }

  const stringValue = '' + value
  const floatValue = parseFloat(stringValue.replace(/[^\d\.\,]+/gm, ''))
  return isNaN(floatValue) ? null : floatValue
}

export const handleEmailToKlaviyo = (email: string): string => {
  const indexAt = email.indexOf('@')
  return [
    email.slice(0, indexAt),
    `_${new Date().valueOf()}`,
    email.slice(indexAt),
  ].join('')
}

export function parseIfValidJSON(string: string) {
  let parsedJSON
  try {
    parsedJSON = JSON.parse(string)
  } catch (e) {
    return false
  }
  return parsedJSON
}

export const getTaxonomyLastNode = ({
  taxonomy,
}: {
  taxonomy?: TaxonomyInterface
}): TaxonomyInterface => {
  if (!taxonomy) return {} as TaxonomyInterface
  const recursive = (
    node: TaxonomyInterface | EpNodeWithRelationships
  ): TaxonomyInterface => {
    if (node?.children) {
      return recursive(node?.children)
    } else {
      return node
    }
  }
  return recursive(taxonomy)
}

export const getTaxonomyData = async (slug: string) => {
  try {
    const baseURL =
      typeof window !== 'undefined' && window != null
        ? window.location.origin
        : APP_DOMAIN_BASE_URL

    const result = await axios.get(
      `${baseURL}/api/taxonomy/get-all-nodes?slug=${slug.toLowerCase()}`
    )
    return result?.data as TaxonomyInterface
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting taxonomy data', error)
    return undefined
  }
}

export const hashEmailKlaviyo = (email: string) => {
  const index = email?.indexOf('@')
  const newEmail = [
    email.slice(0, index),
    `_${new Date().valueOf()}`,
    email.slice(index),
  ].join('')

  return newEmail
}

export const formatPhone = (phoneValue?: string, restrictToDigits = 10) => {
  if (!phoneValue) return ''
  const phoneNumberWithoutFormatting = phoneValue.replaceAll(/\D/gi, '')
  let updatedPhoneValue = '('
  const restrictedPhoneNumber = phoneNumberWithoutFormatting.slice(
    0,
    restrictToDigits
  )
  if (restrictedPhoneNumber.length <= 3) {
    updatedPhoneValue += `${restrictedPhoneNumber.slice(0, 3)}`
  }
  if (restrictedPhoneNumber.length > 3) {
    updatedPhoneValue += `${restrictedPhoneNumber.slice(
      0,
      3
    )}) ${restrictedPhoneNumber.slice(3, 6)}`
  }
  if (restrictedPhoneNumber.length >= 7) {
    updatedPhoneValue += `-${restrictedPhoneNumber.slice(6)}`
  }
  return updatedPhoneValue
}

export const phoneRegisterWithFormatting =
  ({ setValue, phoneKey }: any) =>
  (e: any) =>
    setValue(phoneKey, formatPhone(e.target.value))
