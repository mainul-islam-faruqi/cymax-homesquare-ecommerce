import { MultiPageCheckoutOrder } from '@modules/checkout/hooks'
import axios from 'axios'
import { useMutation, UseMutationResult } from 'react-query'

export type UseAuthorizeAmazonOrderResult = {
  authorizeOrder: UseMutationResult<
    MultiPageCheckoutOrder,
    unknown,
    AuthorizeOrderProps,
    unknown
  >
}

export type AuthorizeOrderProps = {
  cartId: string
  checkoutSessionId: string
  orderId: string
  referral?: string
}

export const useAuthorizeAmazonOrder: () => UseAuthorizeAmazonOrderResult =
  () => {
    const authorizeOrder = useMutation<
      MultiPageCheckoutOrder,
      unknown,
      AuthorizeOrderProps,
      unknown
    >(async (data) => {
      const result: any = await axios.post(`/api/amazonpay/authorize`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return {
        ...result.data?.data,
        items: result.data?.included?.items,
      }
    })
    return { authorizeOrder }
  }
