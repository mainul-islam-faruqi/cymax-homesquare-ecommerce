import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { updateToken } from '@modules/ep/auth/utils'
import { useElasticPath } from '@myplanetdigital/elasticpath'
import { useEffect, useState } from 'react'
import { EPCustomCartItemInterface } from '../types'
import { addCustomCartItem } from './addCustomCartItem'
import { deleteCartDiscount } from './deleteCartDiscount'
import { deleteCustomCartItem } from './deleteCustomCartItem'

export type UseCustomCartItemInterface = {
  addCustomCartItem: (
    cartId: string,
    item: EPCustomCartItemInterface
  ) => Promise<boolean>
  deleteCustomCartItem: (cartId: string, itemId: string) => Promise<boolean>
  deleteCartDiscount: (cartId: string, promoCode: string) => Promise<boolean>
}

export const useCustomCartItem = (): UseCustomCartItemInterface => {
  const { httpClient } = useElasticPath()
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

  return {
    addCustomCartItem: (cartId: string, item: EPCustomCartItemInterface) =>
      addCustomCartItem(httpClient, accessToken, cartId, item),
    deleteCustomCartItem: (cartId: string, itemId: string) =>
      deleteCustomCartItem(httpClient, accessToken, cartId, itemId),
    deleteCartDiscount: (cartId: string, promoCode: string) =>
      deleteCartDiscount(httpClient, accessToken, cartId, promoCode),
  }
}
