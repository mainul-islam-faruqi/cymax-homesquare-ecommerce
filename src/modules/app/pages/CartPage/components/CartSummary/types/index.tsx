import {
  EpCartItemInterface,
  EpCurrencyPriceInterface,
} from '@myplanetdigital/elasticpath'

export interface DiscountItem {
  amount: EpCurrencyPriceInterface
  code: string
  id: string
}

export interface CartItemInterface extends EpCartItemInterface {
  discounts?: DiscountItem[]
}
