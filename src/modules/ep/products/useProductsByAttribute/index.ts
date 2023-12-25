import {
  EpFilterOperator,
  EpProductInterface,
  useElasticPath,
} from '@myplanetdigital/elasticpath'
import { useQuery } from 'react-query'
import { productsByAttributeFetchService } from '../services'

export interface EpProductMap {
  [key: string]: EpProductInterface
}

export interface useProductsByAttributeInterface {
  products: EpProductInterface[] | undefined
  productMap: EpProductMap | undefined
  isLoaded: boolean
  isLoading: boolean
  error: boolean
  errorMessage?: string
}

export enum EpFilterSort {
  commodity_type = 'commodity_type',
  created_at = 'created_at',
  description = 'description',
  manage_stock = 'manage_stock',
  name = 'name',
  sku = 'sku',
  slug = 'slug',
  status = 'status',
  updated_at = 'updated_at',
}

export enum EpFilterParams {
  limit = 'limit',
  offset = 'offset',
  current = 'current',
  total = 'total',
}

export type EpFilterPagination = {
  params: EpFilterParams
  value: number
}

export interface useProductsByAttributeProps {
  values: string | string[]
  filterAttribute: string
  filterOperator: EpFilterOperator.EQ | EpFilterOperator.IN
  includeComponents?: boolean
  sort?: EpFilterSort
  pagination?: EpFilterPagination
}

const transformProducts = (data: EpProductInterface[] | null | undefined) => {
  const newMap: EpProductMap = {}
  data?.forEach((product) => {
    newMap[product?.attributes.sku] = product
  })
  return newMap
}

interface useProductsAttributeKeyProps extends useProductsByAttributeProps {
  headers?: Record<string, string>
  customerToken?: string
}
export const getUseProductsByAttributeKey = (
  params: useProductsAttributeKeyProps
) => [
  'useProductsByAttribute',
  params.values ?? null,
  params.filterOperator ?? null,
  params.filterAttribute ?? null,
  params.includeComponents ?? null,
  params.headers ?? null,
  params.customerToken ?? null,
  params.sort ?? null,
  params.pagination ?? null,
]

export const useProductsByAttribute = ({
  values,
  filterAttribute,
  filterOperator,
  includeComponents,
  sort,
  pagination,
}: useProductsByAttributeProps): useProductsByAttributeInterface => {
  const { httpClient, headers, accessToken, customerToken } = useElasticPath()

  const { data } = useQuery(
    getUseProductsByAttributeKey({
      values,
      filterOperator,
      filterAttribute,
      includeComponents,
      headers,
      customerToken: customerToken?.token,
      sort,
      pagination,
    }),
    () =>
      productsByAttributeFetchService({
        httpClient,
        params: {
          values,
          filterAttribute,
          filterOperator,
          includeComponents,
          sort,
          pagination,
        },
        headers,
        accessToken,
        customerToken: customerToken?.token,
      }),
    {
      enabled: Boolean(
        accessToken && values && Array.isArray(values) && values.length > 0
      ),
    }
  )

  const arrayValidation = Array.isArray(data) ? data : undefined
  return {
    products: arrayValidation,
    productMap: transformProducts(arrayValidation),
    isLoaded:
      Array.isArray(data) || typeof data === 'string' || typeof data === null,
    isLoading: data === undefined,
    error: typeof data === 'string',
    errorMessage: typeof data === 'string' ? data : undefined,
  }
}
