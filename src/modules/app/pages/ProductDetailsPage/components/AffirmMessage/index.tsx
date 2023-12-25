import { EpDisplayPrice } from '@modules/ep'
import { useEffect, useMemo } from 'react'
interface ProductType {
  originalDisplayPrice?: EpDisplayPrice
  displayPrice?: EpDisplayPrice
  quantity?: number
}
export const AffirmMessage = ({
  displayPrice,
  originalDisplayPrice,
  quantity,
}: ProductType) => {
  const regularPrice = useMemo(() => {
    return originalDisplayPrice?.without_tax ?? originalDisplayPrice?.with_tax
  }, [originalDisplayPrice])
  const currentPrice = useMemo(() => {
    return displayPrice?.without_tax ?? displayPrice?.with_tax
  }, [displayPrice])

  const regularPriceAmount = regularPrice?.amount ?? Infinity // Use Infinity to ensure it's always higher when not available
  const currentPriceAmount = currentPrice?.amount ?? 0
  const hasSpecialPrice = Boolean(
    currentPriceAmount && currentPriceAmount < regularPriceAmount
  )

  const handlePriceToQuantity = useMemo(() => {
    const actualPrice =
      hasSpecialPrice || !regularPrice ? currentPrice : regularPrice
    const newPrice = actualPrice?.amount
      ? actualPrice.amount * (quantity || 1)
      : 0 // Default to 0 if actualPrice.amount is undefined
    return newPrice
  }, [quantity, currentPrice, hasSpecialPrice, regularPrice])

  const affirm = (window as any).affirm

  useEffect(() => {
    if (affirm && affirm.ui && affirm.ui.refresh) {
      affirm.ui.refresh()
    }
  }, [handlePriceToQuantity, affirm])

  if (!regularPrice && !currentPrice) {
    return null
  }
  return (
    <p
      className="affirm-as-low-as"
      data-page-type="cart"
      data-amount={handlePriceToQuantity}
    ></p>
  )
}
