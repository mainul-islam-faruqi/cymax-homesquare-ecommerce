import {
  EpPaymentResponse,
  getAuthHeaders,
  useElasticPath,
} from '@myplanetdigital/elasticpath'
import { useCallback, useState } from 'react'

const PAYPAL_ORDER_ID = 'PENDING_PAYPAL_ORDER_ID'
const PAYPAL_TRANSACTION_ID = 'PENDING_PAYPAL_TRANSACTION_ID'

export const usePaypalPaymentConfirmation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { httpClient, accessToken, customerToken, headers } = useElasticPath()

  const paypalConfirmation = useCallback(async () => {
    try {
      setLoading(true)
      const orderId = localStorage.getItem(PAYPAL_ORDER_ID)
      const transactionId = localStorage.getItem(PAYPAL_TRANSACTION_ID)

      const paypalRes = await httpClient.post<EpPaymentResponse>(
        `/v2/orders/${orderId}/transactions/${transactionId}/confirm`,
        {
          data: {
            gateway: 'paypal-express-checkout',
          },
        },
        {
          headers: {
            ...headers,
            ...getAuthHeaders({
              accessToken,
              customerToken: customerToken?.token,
            }),
          },
        }
      )
      // localStorage.removeItem(PAYPAL_ORDER_ID)
      // localStorage.removeItem(PAYPAL_TRANSACTION_ID)
      return paypalRes?.data
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [accessToken, customerToken?.token, headers, httpClient])

  return { paypalConfirmation, error, loading }
}
