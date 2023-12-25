import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { EpProductInterface } from '@modules/ep'
import { updateToken } from '@modules/ep/auth/utils'
import {
  productBySlugFetchService,
  useElasticPath,
} from '@myplanetdigital/elasticpath'
import { useEffect, useState } from 'react'

export interface useProductBySlugInterface {
  product: EpProductInterface | undefined
  isNoMatch: boolean
  isLoaded: boolean
  isLoading: boolean
}

export const getUseProductBySlugKey = (params: {
  slug?: string
  headers?: Record<string, string>
  customerToken?: string
}) => [
  'useProductBySlug',
  params?.slug ?? null,
  params?.headers ?? null,
  params?.customerToken ?? null,
]

export const useProductBySlug = (_slug?: string): useProductBySlugInterface => {
  const router = useRouter()
  const slug = _slug ?? router.query?.slug?.toString()
  const { httpClient, headers, customerToken } = useElasticPath()
  const [accessToken, setAccessToken] = useState('')
  const { data: tokenData, refetch } = useAccessToken()
  const { data } = useQuery(
    getUseProductBySlugKey({
      slug,
      headers,
      customerToken: customerToken?.token,
    }),
    () =>
      productBySlugFetchService({
        httpClient,
        params: { slug },
        headers,
        accessToken,
        customerToken: customerToken?.token,
      }),
    {
      enabled: Boolean(accessToken && slug),
    }
  )

  useEffect(() => {
    if (tokenData) {
      const fetchAccessToken = async () => {
        const token = await updateToken(refetch, tokenData)
        setAccessToken(token)
      }
      fetchAccessToken()
    }
  }, [accessToken, tokenData, refetch])

  return {
    product: data ?? undefined,
    isNoMatch: data === null,
    isLoaded: Boolean(data),
    isLoading: data === undefined,
  }
}
