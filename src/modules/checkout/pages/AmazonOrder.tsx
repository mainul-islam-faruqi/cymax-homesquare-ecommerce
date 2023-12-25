import { KEY_AMAZON_ORDER_ID, paths } from '@modules/app'
import { Loader, useMultiPageCheckout } from '@modules/checkout'
import { useCart } from '@modules/ep'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAmazonPayError, useAuthorizeAmazonOrder } from '../AmazonPay/hooks'

export const AmazonOrder = () => {
  const router = useRouter()
  const { cartId } = useCart()
  const { authorizeOrder } = useAuthorizeAmazonOrder()
  const { amazonPayErrorMessage } = useAmazonPayError()
  const { saveData, checkoutData, isLoading } = useMultiPageCheckout()

  let orderId: string | null = null
  let orderReferral: string | undefined = undefined
  if (typeof window !== 'undefined') {
    orderId = window?.localStorage.getItem(KEY_AMAZON_ORDER_ID) as string
    orderReferral =
      (window?.localStorage.getItem('referral') as string) ?? 'direct'
  }

  const [isProcessing, setIsProcessing] = useState(true)
  const checkoutSessionId = router.query?.amazonCheckoutSessionId as string

  // Checkout and authorize order
  useEffect(() => {
    const authorize = async () => {
      try {
        const order = await authorizeOrder.mutateAsync({
          cartId,
          checkoutSessionId,
          orderId: orderId as string,
          referral: orderReferral,
        })

        checkoutData!.order = order
        saveData(checkoutData)

        window?.localStorage?.removeItem(KEY_AMAZON_ORDER_ID)
        router.replace(paths.CHECKOUT_ORDER_CONFIRMATION)
      } catch (e) {
        amazonPayErrorMessage()
      }
    }
    if (
      isProcessing &&
      cartId != null &&
      orderId != null &&
      authorizeOrder?.isIdle &&
      checkoutSessionId != null &&
      !isLoading &&
      orderReferral != undefined
    ) {
      authorize().finally(() => setIsProcessing(false))
    }
  }, [
    isProcessing,
    cartId,
    router,
    authorizeOrder,
    orderId,
    checkoutSessionId,
    checkoutData,
    saveData,
    orderReferral,
    isLoading,
    amazonPayErrorMessage,
  ])

  return <Loader />
}
