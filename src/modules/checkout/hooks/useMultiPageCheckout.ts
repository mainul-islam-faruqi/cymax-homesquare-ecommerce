import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { useCsa, useGetCsaMember } from '@modules/app/pages/CsaLoginPage/hooks'
import {
  EpCustomerInterface,
  EpOrderInterface,
  EpOrderItemInterface,
} from '@modules/ep'
import { updateToken } from '@modules/ep/auth/utils'
import { getAuthHeaders, useElasticPath } from '@myplanetdigital/elasticpath'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import { DeliveryForm } from '../components/Delivery/types'
import { PaymentForm } from '../components/Payment/types'
import { getCookie } from '@modules/app/utils'

export interface MultiPageCheckoutOrder extends EpOrderInterface {
  items?: EpOrderItemInterface[]
}

export type MultiPageCheckoutData = {
  delivery?: DeliveryForm
  customer?: EpCustomerInterface
  contact?: {
    email?: string
    name?: string
  }
  payment?: PaymentForm
  order?: MultiPageCheckoutOrder
  flows?: {
    [key: string]: any
  }
}

export type MultiPageCheckout = {
  checkoutData: MultiPageCheckoutData
  isLoading: boolean
  saveData: (data: any) => void
  placeOrder: UseMutationResult<
    EpOrderInterface,
    unknown,
    PlaceOrderMutationVariables,
    unknown
  >
}

export type PlaceOrderMutationVariables = {
  cartId: string
  data: MultiPageCheckoutData
}

export const KEY_MULTI_PAGE_QUERY = 'useMultiPageCheckout'

export const useMultiPageCheckout = (): MultiPageCheckout => {
  const { httpClient, customerToken, headers } = useElasticPath()
  const { token: csaToken } = useCsa()
  const { csaMember } = useGetCsaMember()
  const [accessToken, setAccessToken] = useState('')
  const queryClient = useQueryClient()
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

  // Query
  const query = useQuery([KEY_MULTI_PAGE_QUERY], () => {
    if (window) {
      const strData = window.localStorage.getItem(KEY_MULTI_PAGE_QUERY)
      if (strData && strData !== 'null') {
        return JSON.parse(strData)
      }
    }

    return {
      customer: null,
      delivery: null,
      payment: null,
      flows: null,
      order: null,
    }
  })

  // Mutation
  const dataMutation = useMutation<unknown, unknown, any, unknown>(
    async (data: any) => {
      if (window) {
        const strData = JSON.stringify(data)
        window.localStorage.setItem(KEY_MULTI_PAGE_QUERY, strData)
        queryClient.setQueryData(KEY_MULTI_PAGE_QUERY, data)
      }
    }
  )

  // Place Order
  const placeOrderMutation = useMutation<
    EpOrderInterface,
    unknown,
    PlaceOrderMutationVariables,
    unknown
  >(async ({ cartId, data }) => {
    const customerData = csaToken
      ? {
          contact: {
            email: data?.contact?.email || csaMember?.email,
            name: csaMember?.name,
          },
          csa_headers: JSON.stringify(csaToken),
        }
      : { customer: data.customer }

    //Include Forter cookie   
    const forterCookie = getCookie('forterToken')
    const orderData = {
      ...customerData,
      shipping_address: data?.delivery,
      billing_address: data?.payment,
      ...data?.flows,
      forter_response: forterCookie,
    }
   
    if (data?.payment?.sameAsShipping) {
      ;(orderData.billing_address as any) = {
        ...orderData.billing_address,
        ...orderData.shipping_address,
      }
    }

    const epCheckout = csaToken
      ? await axios.post(
          '/api/csa/checkout',
          { data: { ...orderData }, cartId },
          {
            headers: {
              ...headers,
              Authorization: `Bearer ${accessToken}`,
              'EP-Account-Management-Authentication-Token': csaToken?.token,
            },
          }
        )
      : await httpClient.post(
          `/v2/carts/${cartId}/checkout`,
          {
            data: {
              ...orderData,
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

    const order = {
      ...epCheckout.data.data,
      items: epCheckout.data.included.items,
    }
    dataMutation.mutate({
      ...data,
      order,
    })
    return order
  })

  return {
    checkoutData: query.data,
    isLoading: query.isLoading,
    saveData: dataMutation.mutate,
    placeOrder: placeOrderMutation,
  }
}
