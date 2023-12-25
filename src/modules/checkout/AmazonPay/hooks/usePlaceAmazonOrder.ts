import { NEXT_PUBLIC_EP_MIDDLEWARE_URL } from '@modules/app'
import axios from 'axios'
import { useMutation, UseMutationResult } from 'react-query'

export type UseAmazonConfirmationReturn = {
  placeOrder: UseMutationResult<
    PlaceOrderResult,
    unknown,
    PlaceOrderProps,
    unknown
  >
}

export type PlaceOrderProps = {
  cartId: string
  checkoutReviewReturnUrl: string
  checkoutResultReturnUrl: string
  checkoutSessionId: string
  customerId?: string
  customer?: {
    name: string
    email: string
  }
}

export type PlaceOrderResult = {
  redirectUrl: string
  orderId: string
}

export const usePlaceAmazonOrder: () => UseAmazonConfirmationReturn = () => {
  const placeOrder = useMutation<
    PlaceOrderResult,
    unknown,
    PlaceOrderProps,
    unknown
  >(placeOrderService)

  return { placeOrder }
}

const placeOrderService: (
  props: PlaceOrderProps
) => Promise<PlaceOrderResult> = async (props) => {
  try {
    const result = await axios.post(
      `${NEXT_PUBLIC_EP_MIDDLEWARE_URL}/api/amazon-pay/checkout`,
      props,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return result.data as PlaceOrderResult
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error while creating EP order for AmazonPay', e)
    throw e
  }
}
