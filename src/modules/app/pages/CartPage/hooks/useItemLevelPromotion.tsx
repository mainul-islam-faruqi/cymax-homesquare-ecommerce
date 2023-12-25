import { useCart } from '@myplanetdigital/elasticpath'
import { useEffect, useState } from 'react'
import {
  CartItemInterface,
  DiscountItem,
} from '../components/CartSummary/types'

export const useItemLevelPromotion = () => {
  const { cart } = useCart()
  const [itemLevelPromotions, setItemLevelPromotions] = useState<
    DiscountItem[]
  >([])

  useEffect(() => {
    if (cart) {
      const groupedDiscounts: DiscountItem[] = []

      cart?.data?.map((item: CartItemInterface) => {
        if (item?.discounts && item?.discounts.length) {
          for (let promo of item?.discounts) {
            let sumIndex = groupedDiscounts.findIndex(
              (existentDiscount) => existentDiscount.code == promo.code
            )
            if (sumIndex === -1) {
              groupedDiscounts.push(promo)
            } else {
              groupedDiscounts[sumIndex].amount.amount += promo.amount.amount
            }
          }
        }
      })

      setItemLevelPromotions(groupedDiscounts)
    }
  }, [cart])

  return itemLevelPromotions
}
