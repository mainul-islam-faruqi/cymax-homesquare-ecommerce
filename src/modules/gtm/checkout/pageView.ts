import { paths } from '@modules/app'
import { useCart } from '@myplanetdigital/elasticpath'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CheckoutPageViewGTM, GoogleTagManagerEvents, gtmTrack } from '..'

export const checkoutPageView = (payload: CheckoutPageViewGTM) => {
  gtmTrack(GoogleTagManagerEvents.pageView, payload)
}

export const useGtmPageViewCheckout = () => {
  const { cart } = useCart()
  const router = useRouter()

  const [isCartReported, setIsCartReported] = useState(false)

  useEffect(() => {
    const cartItems = cart?.data?.filter((current) => {
      return current.type == 'cart_item'
    })

    if (!isCartReported && cartItems && cartItems?.length > 0) {
      const ecomm_prodid = cartItems?.map((current) => {
        return current.sku
      })

      const ecomm_pname = cartItems?.map((current) => {
        return current.name
      })

      const ecomm_pvalue = cartItems.map((item) =>
        parseFloat((item.unit_price.amount / 100)?.toFixed(2))
      )

      const hasTaxes = [
        paths.CHECKOUT_ORDER_CONFIRMATION,
        paths.CHECKOUT_PAYMENT,
      ].includes(router.asPath)
        ? 'with_tax'
        : 'without_tax'

      const total = cart?.meta?.display_price?.[hasTaxes]?.amount as number

      const options = {
        [paths?.CHECKOUT_ORDER_CONFIRMATION]: 'purchase',
        [paths?.CHECKOUT_LOGIN]: 'checkout-login',
        [paths?.CHECKOUT_DELIVERY]: 'checkout-shipping-information',
        [paths?.OPEN_PATH_FORM]: 'checkout-credit-card',
        [paths?.CHECKOUT_PAYMENT]: 'checkout-payment-information',
      }

      checkoutPageView({
        ecomm_pagetype: options[router?.asPath] || '',
        ecomm_prodid,
        ecomm_pname,
        ecomm_pvalue,
        ecomm_totalvalue: total / 100 || 0,
      })

      setIsCartReported(true)
    }
  }, [cart])
}
