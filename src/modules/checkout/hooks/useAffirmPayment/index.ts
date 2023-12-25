import { APP_DOMAIN_BASE_URL, NEXT_PUBLIC_SITE_IDENTIFIER } from '@modules/app'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Order } from '../../components/OrderConfirmation/types'
import { useAuthorizedAffirmPayment } from '../useAuthorizedPayment'
import {
  AffirmCheckout,
  AffirmDiscount,
  AffirmError,
  AffirmItem,
  AffirmSuccess,
  Url
} from './types'

export * from './types'

const KEY_SHIPPING_SKU = 'shipping_'

const getProducts = (order: Order): AffirmItem[] =>
  order.items
    .filter((item) => Boolean(item.custom_inputs))
    .reduce<AffirmItem[]>((curr, item) => {
      curr.push({
        display_name: item.name,
        sku: item.sku,
        unit_price: item.unit_price.amount,
        qty: item.quantity,
        item_image_url: item.custom_inputs?.main_image?.url ?? '',
        categories: [[(item.custom_inputs?.category as string) ?? '']],
      })
      return curr
    }, [])

const getDiscounts = (order: Order): AffirmDiscount =>
  order.items
    .filter((item) => item.unit_price.amount < 0)
    .reduce<AffirmDiscount>((acc, item) => {
      acc[item.sku] = {
        discount_amount: Math.abs(item.unit_price.amount),
        discount_display_name: item.name,
      }
      return acc
    }, {})

const getShippingAmount = (order: Order): number =>
  order.items
    .filter((item) => item.sku.startsWith(KEY_SHIPPING_SKU))
    .reduce((acc, item) => acc + item.unit_price.amount, 0)

const transformOrderEpToAffirmCheckout = (order: Order): AffirmCheckout => {
  return {
    merchant: {
      user_confirmation_url:
        `${APP_DOMAIN_BASE_URL}/checkout/payment-confirmation` as Url,
      user_cancel_url: `${APP_DOMAIN_BASE_URL}/api/index` as Url,
      user_confirmation_url_action: 'POST',
      name: NEXT_PUBLIC_SITE_IDENTIFIER?.toUpperCase() || '',
    },
    shipping: {
      name: {
        first: order.shipping_address.first_name,
        last: order.shipping_address.last_name,
      },
      address: {
        line1: order.shipping_address.line_1,
        line2: order.shipping_address.line_2,
        city: order.shipping_address.city,
        state: order.shipping_address.county,
        zipcode: order.shipping_address.postcode,
        country: order.shipping_address.country,
      },
      phone_number: order.shipping_address.phone_number ?? '',
      email: order.customer.email,
    },
    billing: {
      name: {
        first: order.billing_address.first_name,
        last: order.billing_address.last_name,
      },
      address: {
        line1: order.billing_address.line_1,
        line2: order.billing_address.line_2,
        city: order.billing_address.city,
        state: order.billing_address.county,
        zipcode: order.billing_address.postcode,
        country: order.billing_address.country,
      },
      phone_number: order.billing_address.phone_number ?? '',
      email: order.customer.email,
    },
    items: getProducts(order),
    discounts: getDiscounts(order),
    order_id: order.id,
    metadata: {
      mode: 'modal',
    },
    currency: 'USD',
    shipping_amount: getShippingAmount(order),
    tax_amount: order.meta.display_price.tax.amount,
    total: order.meta.display_price.with_tax.amount,
  }
}

export const useAffirmPayment = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [affirmSuccess, setAffirmSuccess] = useState(false)
  const { authorizedPayment } = useAuthorizedAffirmPayment()
  const router = useRouter()
  const affirmPayment = ({ order }: { order: any }) => {
    const affirm = (window as any).affirm
    if (affirm) {
      setIsProcessing(true)
      const checkout = transformOrderEpToAffirmCheckout(order as Order)
      affirm.checkout(checkout)
      affirm.ui.ready(() => {
        affirm.ui.error.on('close', () => {
          setIsProcessing(false)
        })
      })
      affirm.checkout.open({
        onOpen: () => setIsProcessing(false),
        onFail: (error: AffirmError) => {
          //This callback handle when customer close the affirm modal
          setAffirmSuccess(false)
          setIsProcessing(false)
        },
       
       
        onSuccess: async (success_object: AffirmSuccess) => {
          setIsProcessing(true); // Set processing to true while the async operation is in progress
         
          try {
            // Attempt to process the authorized payment
            const result:any = await authorizedPayment.mutateAsync({ order, success_object });
         
            // Check if the result contains an error
            if (result.error) {
              // If there's an error, handle it here
              setAffirmSuccess(false);
              setIsProcessing(false);
              // Redirect to a different page, e.g., the payment page
              router.push('/checkout/payment-information');
            } else {
              // If there's no error, proceed with the success flow
              setAffirmSuccess(true);
              setIsProcessing(false);
              router.push('/checkout/order-confirmation');
            }
          } catch (error) {
            // Catch any unhandled errors from the try block
            console.error("An unexpected error occurred", error);
            setAffirmSuccess(false);
            setIsProcessing(false);
            // Redirect to a different page, e.g., the payment page
            router.push('/checkout/payment-information');
          }
        },



      })
    }
  }

  return {
    affirmPayment,
    isProcessing,
    affirmSuccess,
  }
}
