import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { updateToken } from '@modules/ep/auth/utils'
import {
  EpProductInterface,
  useElasticPath,
} from '@myplanetdigital/elasticpath'
import { useEffect, useState } from 'react'
import { useQueries } from 'react-query'
import { productByIdFetchService } from '../services'

export interface useProductsByIdInterface {
  isLoaded: boolean
  isLoading: boolean
  products?: EpProductInterface[]
}

const useEPGetProductsByIdKey = 'useEPGetProductsByIdKey'

export const useProductsById = (
  productIds: string[]
): useProductsByIdInterface => {
  const { httpClient, headers } = useElasticPath()
  const [accessToken, setAccessToken] = useState('')
  const { data, refetch } = useAccessToken()

  useEffect(() => {
    if (data) {
      const fetchAccessToken = async () => {
        const token = await updateToken(refetch, data)
        setAccessToken(token)
      }
      fetchAccessToken()
    }
  }, [accessToken, data, refetch])

  const userQueries = useQueries(
    productIds.map((id) => {
      return {
        queryKey: [useEPGetProductsByIdKey, id],
        queryFn: () =>
          productByIdFetchService({
            httpClient,
            headers,
            params: {
              id,
            },
            accessToken,
          }),
        enabled: productIds.length > 0 && !!id && !!headers && !!accessToken,
      }
    })
  )

  const products = userQueries?.map(
    (item) => item.data
  ) as unknown as EpProductInterface[]

  return {
    products,
    isLoaded: userQueries.every((query) => query.data?.id),
    isLoading: userQueries.every((query) => query.isLoading),
  }
}
