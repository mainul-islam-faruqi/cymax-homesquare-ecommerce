import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { updateToken } from '@modules/ep/auth/utils'
import {
  EpServiceDeps,
  getAuthHeaders,
  useElasticPath,
} from '@myplanetdigital/elasticpath'
import { useRef } from 'react'
import { useQuery } from 'react-query'

export interface EpStockDataInterface {
  id: string
  type: string
  total: number
  available: number
  allocated: number
}

export interface EpStockInterface {
  data?: EpStockDataInterface
}

export const useEPStockKey = `useEPStockKey`

export const stockFetchService = async ({
  httpClient,
  headers,
  params,
  accessToken,
  customerToken,
}: EpServiceDeps<{
  productId?: string
}>) => {
  const productId = params?.productId

  const response = await httpClient.get<EpStockInterface>(
    `/v2/inventories/${productId}`,
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken, customerToken }),
      },
    }
  )

  return response.data
}

export const getProductStockById = (params: {
  productId?: string
  headers?: Record<string, string>
  customerToken?: string
}) => [
  useEPStockKey,
  params.productId ?? null,
  params.headers ?? null,
  params.customerToken ?? null,
]

export const useStock = (productId?: string) => {
  const { httpClient, headers, customerToken } = useElasticPath()
  const { data: tokenData, refetch } = useAccessToken()
  let cachedData = useRef<EpStockDataInterface>()

  const { data } = useQuery(
    getProductStockById({
      productId,
      headers,
      customerToken: customerToken?.token,
    }),
    async () => {
      const updatedAccessToken = await updateToken(refetch, tokenData)
      const response = await stockFetchService({
        httpClient,
        params: {
          productId,
        },
        headers,
        accessToken: updatedAccessToken,
        customerToken: customerToken?.token,
      })

      return response
    },
    {
      enabled: Boolean(tokenData?.access_token && productId),
    }
  )

  if (data) {
    cachedData.current = data.data
  }

  return {
    stock: data?.data ?? cachedData.current,
    isNoMatch: data === null,
    isLoaded: Boolean(data),
    isLoading: data === undefined,
  }
}
