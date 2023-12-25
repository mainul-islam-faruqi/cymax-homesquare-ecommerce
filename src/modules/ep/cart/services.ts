import {
  EpServiceDeps,
  EpCreateCartResponse,
  EpCartCheckoutOutputInterface,
  EpCheckoutParams,
  getAuthHeaders,
} from '@myplanetdigital/elasticpath'
import { EpCartInterface } from '../auth/types'
import { EpCartTaxItem, EpProductCartCustomInputs } from './types'

export const cartCreateService = async ({
  httpClient,
  headers,
  accessToken,
  customerToken,
}: EpServiceDeps) => {
  const response = await httpClient.post<EpCreateCartResponse>(
    '/v2/carts',
    {
      data: {
        name: 'Cart',
        description: '',
      },
    },
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken, customerToken }),
      },
    }
  )

  return response.data
}

export const cartItemAddService = async ({
  httpClient,
  headers,
  params,
  accessToken,
  customerToken,
}: EpServiceDeps<{
  cartId: string
  sku: string
  quantity?: number
  custom_inputs?: EpProductCartCustomInputs
}>) => {
  const reference = params?.cartId
  const sku = params?.sku
  const quantity = params?.quantity ?? 1
  const customInputs = params?.custom_inputs

  const response = await httpClient.post<EpCartInterface>(
    `/v2/carts/${reference}/items`,
    {
      data: {
        sku,
        type: 'cart_item',
        quantity,
        custom_inputs: customInputs,
      },
    },
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken, customerToken }),
      },
    }
  )

  return response.data
}

export const cartItemAddTaxService = async ({
  httpClient,
  params,
  accessToken,
}: EpServiceDeps<{
  cartId: string
  cartItemId: string
  taxData: EpCartTaxItem
}>) => {
  const cartReference = params?.cartId
  const itemReference = params?.cartItemId
  const taxData = params?.taxData

  const response = await httpClient.post<EpCartInterface>(
    `/v2/carts/${cartReference}/items/${itemReference}/taxes`,
    {
      data: taxData,
    },
    {
      headers: {
        ...getAuthHeaders({ accessToken }),
      },
    }
  )

  return response.data
}

export const cartItemUpdateService = async ({
  httpClient,
  headers,
  params,
  accessToken,
  customerToken,
}: EpServiceDeps<{
  cartId: string
  itemId: string
  quantity?: number
  custom_inputs?: EpProductCartCustomInputs
}>) => {
  const reference = params?.cartId
  const itemId = params?.itemId
  const quantity = params?.quantity ?? 1
  const customInputs = params?.custom_inputs ?? undefined

  const response = await httpClient.put<EpCartInterface>(
    `/v2/carts/${reference}/items/${itemId}`,
    {
      data: {
        id: itemId,
        type: 'cart_item',
        quantity,
        custom_inputs: customInputs,
      },
    },
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken, customerToken }),
      },
    }
  )

  return response.data
}

export const cartItemDeleteService = async ({
  httpClient,
  headers,
  params,
  accessToken,
  customerToken,
}: EpServiceDeps<{
  cartId: string
  itemId: string
}>) => {
  const reference = params?.cartId
  const itemId = params?.itemId

  const response = await httpClient.delete<EpCartInterface>(
    `/v2/carts/${reference}/items/${itemId}`,
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken, customerToken }),
      },
    }
  )

  return response.data
}

export const cartFetchService = async ({
  httpClient,
  headers,
  params,
  accessToken,
  customerToken,
}: EpServiceDeps<{
  cartId: string
}>) => {
  const reference = params?.cartId

  const response = await httpClient.get<EpCartInterface>(
    `/v2/carts/${reference}/items`,
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken, customerToken }),
      },
    }
  )

  return response.data
}

export const cartCheckoutService = async ({
  httpClient,
  headers,
  params,
  accessToken,
  customerToken,
}: EpServiceDeps<EpCheckoutParams>) => {
  const reference = params?.cartId

  const response = await httpClient.post<EpCartCheckoutOutputInterface>(
    `/v2/carts/${reference}/checkout`,
    {
      data: {
        customer: params?.customer?.id
          ? {
              id: params?.customer.id,
            }
          : {
              name: params?.customer.name,
              email: params?.customer.email,
            },
        billing_address: params?.billing_address,
        shipping_address: params?.shipping_address,
        ...params?.flow,
      },
    },
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken, customerToken }),
      },
    }
  )

  return response.data
}
