import {
  EpCollectionResponse,
  EpFilterAttribute,
  EpFilterOperator,
  EpProductInterface,
  EpServiceDeps,
  getAuthHeaders,
} from '@myplanetdigital/elasticpath'
import { useProductsByAttributeProps } from './useProductsByAttribute'

type CreateUrlByAttribute = (
  values: string | string[],
  filterAttribute: string,
  filterOperator: EpFilterOperator
) => string

const createUrl: CreateUrlByAttribute = (
  values,
  filterAttribute,
  filterOperator
) => {
  return `${filterOperator}(${filterAttribute},${
    Array.isArray(values) ? values.join(',') : values
  })`
}

type FetchProductsByAttributeService = (
  deps: EpServiceDeps<useProductsByAttributeProps> & {}
) => Promise<EpProductInterface[] | null | string>

export const productsByAttributeFetchService: FetchProductsByAttributeService =
  async ({ httpClient, params, headers, customerToken, accessToken }) => {
    try {
      const sort = params?.sort ? `&sort=${params?.sort}` : ''
      const pagination =
        params?.pagination?.params && params.pagination.value
          ? `&page[${params.pagination.params}]=${params.pagination.value}`
          : ''

      const values = params?.values
      const filterAttribute = params?.filterAttribute
      const filterOperator = params?.filterOperator
      const includeComponents = params?.includeComponents
        ? 'include=component_products&'
        : ''
      if (!values) throw new Error('Values are required.')
      if (!filterAttribute) throw new Error('A filter attribute is required.')
      if (!filterOperator) throw new Error('A filter operator is required.')
      if (
        filterOperator === EpFilterOperator.IN &&
        filterAttribute !== EpFilterAttribute.SKU
      )
        throw new Error('You can only filter on sku when using the in operator')
      if (
        filterOperator === EpFilterOperator.EQ &&
        Array.isArray(values) &&
        values.length !== 1
      )
        throw new Error(
          'You can only filter on an array of values when using the in operator'
        )
      if (Array.isArray(values) && values.length === 0)
        throw new Error('You can not filter on an empty array of attributes.')
      const filterUrl = createUrl(values, filterAttribute, filterOperator)
      const res = await httpClient.get<
        EpCollectionResponse<EpProductInterface[]>
      >(
        `/pcm/catalog/products?${includeComponents}filter=${filterUrl}${pagination}${sort}`,
        {
          headers: {
            ...headers,
            ...getAuthHeaders({ accessToken, customerToken }),
          },
        }
      )
      return res.data.data ?? null
    } catch (e) {
      return (e as Error).message
    }
  }

type FetchProductByIdService = (
  deps: EpServiceDeps<{
    id?: string
  }>
) => Promise<EpProductInterface | null>

export const productByIdFetchService: FetchProductByIdService = async ({
  accessToken,
  customerToken,
  headers,
  httpClient,
  params,
}) => {
  const productId = params?.id
  if (!productId) {
    throw new Error('Product ID is required.')
  }

  const res = await httpClient.get<EpCollectionResponse<EpProductInterface>>(
    `/pcm/catalog/products/${productId}`,
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken, customerToken }),
      },
    }
  )

  return res.data?.data ?? null
}
