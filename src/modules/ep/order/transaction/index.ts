import { RETRIES_ON_SAVE_PAYMENT_STATUS } from '@modules/app'
import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { updateToken } from '@modules/ep/auth/utils'
import { getAuthHeaders, useElasticPath } from '@myplanetdigital/elasticpath'
import axiosRetry from 'axios-retry'
import { useMutation } from 'react-query'

export type SaveEPManualTransactionProps = {
  orderId: string
  amount: number
  metadata: any
}

export const useEPManualTransaction = () => {
  const { httpClient, customerToken, headers } = useElasticPath()
  axiosRetry(httpClient, {
    retries: Number(RETRIES_ON_SAVE_PAYMENT_STATUS || 0),
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
      //The errors are here
      //https://documentation.elasticpath.com/commerce-cloud/docs/api/basics/errors.html
      if (error.response?.status === 429 || error.response?.status === 500) {
        return true
      }
      return false
    },
  })
  const { data, refetch } = useAccessToken()
  const saveEPManualTransaction = useMutation<
    void,
    unknown,
    SaveEPManualTransactionProps,
    unknown
  >(async ({ orderId, amount, metadata }) => {
    const accessToken = await updateToken(refetch, data)
    if (orderId == metadata?.orderid) {
      const response = await httpClient.post(
        `/v2/orders/${orderId}/payments`,
        {
          data: {
            method: 'authorize',
            gateway: 'manual',
            amount,
            paymentmethod_meta: {
              custom_reference: JSON.stringify(metadata),
            },
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
    }
  })
  return { saveEPManualTransaction }
}
