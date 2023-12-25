import { KEY_AMAZON_ORDER_ID } from '@modules/app'
import { useCart } from '@modules/ep'
import { OIDC } from '@modules/sso'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAmazonPayError, usePlaceAmazonOrder } from '../AmazonPay/hooks'
import { Loader } from '../components'
import { KEY_MULTI_PAGE_QUERY, MultiPageCheckoutData } from '../hooks'

export const AmazonReturn = () => {
  const router = useRouter()
  const { placeOrder } = usePlaceAmazonOrder()
  const [isProcessing, setIsProcessing] = useState<boolean>(true)
  const { cartId } = useCart()
  const { amazonPayErrorMessage } = useAmazonPayError()

  // Checkout and authorize order
  useEffect(() => {
    const processOrder = async () => {
      let data: MultiPageCheckoutData | undefined
      const localStorageCheckoutData =
        localStorage.getItem(KEY_MULTI_PAGE_QUERY)

      if (localStorageCheckoutData) {
        data = JSON.parse(localStorageCheckoutData)
      }

      const baseURL = window != null ? window.location.origin : ''
      const returnUrl = `${baseURL}/checkout/amazonOrder?success=true`
      const checkoutSessionId = router.query?.amazonCheckoutSessionId as string
      const { authentication_mechanism, email, name, id } = data?.customer ?? {}
      const customerId = authentication_mechanism === OIDC ? id : undefined

      const customer =
        authentication_mechanism !== OIDC
          ? {
              name: name!,
              email: email!,
            }
          : undefined

      // Call checkout API to create the order
      try {
        const amazonCheckout = await placeOrder.mutateAsync({
          cartId,
          checkoutReviewReturnUrl: returnUrl,
          checkoutResultReturnUrl: returnUrl,
          checkoutSessionId,
          customerId,
          customer,
        })

        if (
          amazonCheckout?.orderId == null ||
          amazonCheckout?.redirectUrl == null
        ) {
          throw new Error('Invalid response from checkout API')
        }
        window.localStorage.setItem(KEY_AMAZON_ORDER_ID, amazonCheckout.orderId)
        router.replace(amazonCheckout.redirectUrl)
      } catch (e) {
        amazonPayErrorMessage()
      }
    }
    if (
      isProcessing &&
      cartId != null &&
      router != null &&
      placeOrder != null &&
      placeOrder.isIdle
    ) {
      processOrder().finally(() => setIsProcessing(false))
    }
  }, [isProcessing, cartId, router, placeOrder, amazonPayErrorMessage])

  return <Loader />
}
