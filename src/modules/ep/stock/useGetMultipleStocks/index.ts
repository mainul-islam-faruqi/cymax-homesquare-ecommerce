import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { updateToken } from '@modules/ep/auth/utils'
import {
  EpServiceDeps,
  getAuthHeaders,
  useElasticPath,
} from '@myplanetdigital/elasticpath'
import { useQuery } from 'react-query'

export interface EpGetMultipleStockDataInterface {
  id: string
  type: string
  total: number
  available: number
  allocated: number
}

export interface EpGetMultipleStockInterface {
  data?: EpGetMultipleStockDataInterface[]
}

export type ProductIdType = {
  id: string
}

export const useEPGetMultipleStocksKey = `useEPGetMultipleStocksKey`

export const getMultipleStocksFetchService = async ({
  httpClient,
  headers,
  params,
  accessToken,
}: EpServiceDeps<{
  productsId?: ProductIdType[]
}>) => {
  const productsId = params?.productsId

  const response = await httpClient.post<EpGetMultipleStockInterface>(
    `/v2/inventories/multiple`,
    {
      data: productsId,
    },
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken }),
      },
    }
  )

  return response.data
}

export const getMultipleStocksByProductsId = (params: {
  productsId?: ProductIdType[]
  headers?: Record<string, string>
}) => [
  useEPGetMultipleStocksKey,
  params.productsId ?? null,
  params.headers ?? null,
]

export const useGetMultipleStocks = (productsId?: ProductIdType[]) => {
  const { httpClient, headers, customerToken } = useElasticPath()
  const { data: tokenData, refetch } = useAccessToken()

  const { data } = useQuery(
    getMultipleStocksByProductsId({
      productsId,
      headers,
    }),
    async () => {
      const updatedAccessToken = await updateToken(refetch, tokenData)
      const response = await getMultipleStocksFetchService({
        httpClient,
        params: {
          productsId,
        },
        headers,
        accessToken: updatedAccessToken,
        customerToken: customerToken?.token,
      })

      return response
    },
    {
      enabled: Boolean(
        tokenData?.access_token && productsId && productsId?.length > 0
      ),
    }
  )

  return {
    stocks: data?.data,
    isNoMatch: data === null,
    isLoaded: Boolean(data),
    isLoading: data === undefined,
  }
}
