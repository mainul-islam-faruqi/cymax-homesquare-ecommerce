import { EpDisplayPriceValue } from '@myplanetdigital/elasticpath'

export type ValueWithFormat = {
  amount?: number
  formatted?: string
}

export type OrderSummaryDataType = {
  subtotal?: ValueWithFormat
  total?: EpDisplayPriceValue
  total_without_tax?: EpDisplayPriceValue
  taxes?: EpDisplayPriceValue
  promotion?: EpDisplayPriceValue
  shipping?: ValueWithFormat
  flatShipping?: ValueWithFormat
}
