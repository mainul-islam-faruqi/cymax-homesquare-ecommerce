import { Bundle } from '@modules/app'
import { EpDisplayPriceValue } from '@myplanetdigital/elasticpath'
import { EpFlowFieldValue } from '../auth/types'

export interface EpCartTaxItem {
  type: 'tax_item'
  name: string
  jurisdiction: string
  code: string
  rate: number
}

export type EPCustomCartItemInterface = {
  type: string
  name: string
  sku: string
  description?: string
  quantity: number
  price: {
    amount: number
    includes_tax: boolean
  }
  custom_inputs?: EpProductCartCustomInputs
}

export interface EpVariationsOptionsInterface {
  description: string
  id: string
  name: string
}

export interface EpVariationsInterface {
  id: string
  name: string
  options: EpVariationsOptionsInterface[]
}

export interface EpVariationsWithSelected extends EpVariationsInterface {
  selected: EpVariationsOptionsInterface | undefined
}

export enum FileType {
  'video' = 'video',
  'image' = 'image',
}

export interface MainImage {
  url: string
  type: FileType
  name: string
}

interface EpDisplayPrice {
  without_tax: EpDisplayPriceValue
  with_tax?: EpDisplayPriceValue
}

interface OriginalPrice {
  [key: string]: {
    amount: number
    includes_tax: boolean
  }
}

export interface ShippingOption {
  Order: number
  ProviderName: string
  Name: string
  Cost: number
}

export interface EpProductCartCustomInputs {
  variations_selected?: EpVariationsWithSelected[]
  main_image?: MainImage
  californiaprop65?: boolean
  chemical_list?: string
  price?: {
    original_price?: OriginalPrice
    original_display_price?: EpDisplayPrice
    display_price?: EpDisplayPrice
  }
  bundles?: Bundle[]
  pickerOptions?: {
    setQty: number
    minQty: number
  }
  shipping_upgrade_options?: ShippingOption[] | null
  shipping_days_from?: number | null
  shipping_days_to?: number | null
  brand?: EpFlowFieldValue
  category?: EpFlowFieldValue
  variant?: EpFlowFieldValue
  selectedShippingOption?: ShippingOption
  manufacturer_part_num?: string | null
}
