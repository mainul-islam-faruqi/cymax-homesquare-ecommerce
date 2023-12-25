import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { updateToken } from '@modules/ep/auth/utils'
import {
  EpAccessTokenInterface,
  getAuthHeaders,
  useCart,
  useElasticPath,
} from '@myplanetdigital/elasticpath'
import { useQuery } from 'react-query'
import { generatePayloadAndSignature } from '../helpers'

interface PayloadAndSignatureResult {
  data: {
    data: {
      payload?: string
      signature?: string
    }
  }
}

/* The call to generate payload and signature doesn't actually return the payload
and signature. So we need another call to the cart to get the payload and signature */
export const usePayloadAndSignature = () => {
  const { httpClient, headers } = useElasticPath()
  const { data, refetch } = useAccessToken()

  const { cartId } = useCart()

  const query = useQuery(
    ['usePayloadAndSignature'],
    async () => {
      const accessToken = await updateToken(
        refetch,
        data as EpAccessTokenInterface
      )
      await generatePayloadAndSignature(cartId)
      const res: PayloadAndSignatureResult = await httpClient.get(
        `/v2/carts/${cartId}`,
        {
          headers: {
            ...headers,
            ...getAuthHeaders({ accessToken }),
          },
        }
      )
      return res
    },
    {
      keepPreviousData: true,
    }
  )

  return {
    payload: query.data?.data?.data?.payload,
    signature: query.data?.data?.data?.signature,
  }
}
