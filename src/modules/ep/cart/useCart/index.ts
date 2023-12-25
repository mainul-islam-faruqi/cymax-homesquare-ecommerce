import { EP_CUSTOM_ITEM_KEY } from '@modules/app'
import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { getCartItemShippingOptionKey } from '@modules/app/utils'
import { EpCartInterface } from '@modules/ep'
import { updateToken } from '@modules/ep/auth/utils'
import { CartProducts, removeFromCart } from '@modules/gtm'
import {
  deleteFromStorage,
  useLocalStorage,
  writeStorage
} from '@myplanetdigital/base'
import {
  EpAxiosError, LOCAL_STORAGE_EP_CART_ID,
  LOCAL_STORAGE_EP_CART_UPDATED,
  useElasticPath
} from '@myplanetdigital/elasticpath'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  cartCreateService,
  cartFetchService,
  cartItemAddService,
  cartItemDeleteService,
  cartItemUpdateService
} from '../services'
import { EpProductCartCustomInputs } from '../types'

export const useEPCartKey = 'useEPCartKey'

const setCartId = (id: string) => {
  writeStorage(LOCAL_STORAGE_EP_CART_ID, id)
}

const deleteCart = () => {
  deleteFromStorage(LOCAL_STORAGE_EP_CART_ID)
}

export const setCartUpdatedAt = (timestamp: number) => {
  writeStorage(LOCAL_STORAGE_EP_CART_UPDATED, timestamp)
}

interface UseCartOptions {
  onCartItemAddError?: (err: EpAxiosError) => void
  onCartItemUpdateError?: (err: EpAxiosError) => void
  onCartItemDeleteError?: (err: EpAxiosError) => void
  onCartItemAddSuccess?: (cart: EpCartInterface, cartId: string) => void
}

export type TaxesHandler = (params: { cartId: string }) => Promise<any>

export const useCart = (options?: UseCartOptions) => {
  const queryClient = useQueryClient()
  const { httpClient, headers, customerToken, accessToken } = useElasticPath()
  const { data, refetch } = useAccessToken()
  const [creatingCart, setCreatingCart] = useState(false)
  const [cartId] = useLocalStorage(LOCAL_STORAGE_EP_CART_ID, '')
  const [updatedAt] = useLocalStorage(LOCAL_STORAGE_EP_CART_UPDATED, Date.now())
  const optionsRef = useRef<undefined | UseCartOptions>(options)
  optionsRef.current = options

  const handleShippingItem = async (
    cart: EpCartInterface,
    params: { sku?: string; itemId?: string; accessToken: string }
  ): Promise<void> => {
    const { data } = cart
    const cartItem = params.itemId
      ? data!.find((item) => params.itemId == item?.id)
      : data!.find((item) => params.sku === item?.sku)

    const shippingOption = data?.find(
      (item) =>
        (item?.type as String) === EP_CUSTOM_ITEM_KEY &&
        item?.sku === getCartItemShippingOptionKey(cartItem?.product_id!)
    )

    if (!shippingOption) {
      return
    }

    await cartItemUpdateService({
      httpClient,
      params: {
        cartId,
        itemId: shippingOption?.id!,
        quantity: cartItem?.quantity,
      },
      headers,
      accessToken,
      customerToken: customerToken?.token,
    })
  }

  /**
   * Fetch Cart
   */
  const {
    data: cart,
    refetch: fetchCart,
    status,
  } = useQuery(
    [useEPCartKey],
    async () => {
      const updatedAccessToken = await updateToken(refetch, data)
      const response = await cartFetchService({
        httpClient,
        params: {
          cartId,
        },
        headers,
        accessToken: updatedAccessToken,
        customerToken: customerToken?.token,
      })

      return response
    },
    {
      enabled: false,
      keepPreviousData: true,
    }
  )

  /**
   * Create Cart
   */
  const cartCreate = useCallback(async () => {
    setCreatingCart(true)
    const updatedAccessToken = await updateToken(refetch, data)
    const response = await cartCreateService({
      httpClient,
      headers,
      accessToken: updatedAccessToken,
      customerToken: customerToken?.token,
    })
    const id = response?.data.id ?? ''
    setCartId(id)
    setCreatingCart(false)
    return id
  }, [httpClient, headers, data, customerToken?.token])

  /**
   * Add Cart Item
   */
  const cartItemAdd = useMutation(
    ['cartItemAdd'],
    async (variables: {
      cartId: string
      sku: string
      quantity?: number
      custom_inputs?: EpProductCartCustomInputs
      taxesHandler?: TaxesHandler
    }) => {
      const params = {
        cartId: variables.cartId,
        sku: variables.sku,
        quantity: variables.quantity,
        custom_inputs: variables.custom_inputs,
      }
      const updatedAccessToken = await updateToken(refetch, data)
      const response = await cartItemAddService({
        httpClient,
        params,
        headers,
        accessToken: updatedAccessToken,
        customerToken: customerToken?.token,
      })

      await handleShippingItem(response, {
        sku: variables.sku,
        accessToken: updatedAccessToken,
      })

      await variables?.taxesHandler?.({ cartId: params.cartId })

      const updatedAt = Date.now()

      queryClient.setQueryData(useEPCartKey, () => {
        return response
      })

      setCartUpdatedAt(updatedAt)

      return response
    },
    {
      onError: options?.onCartItemAddError,
    }
  )

  /**
   * Update Cart Item
   */
  const cartItemUpdate = useMutation(
    ['cartItemUpdate'],
    async (variables: {
      cartId: string
      itemId: string
      quantity?: number
      custom_inputs?: EpProductCartCustomInputs
    }) => {
      const params = {
        cartId: variables.cartId,
        itemId: variables.itemId,
        quantity: variables.quantity,
        custom_inputs: variables.custom_inputs,
      }
      const updatedAccessToken = await updateToken(refetch, data)
      const response = await cartItemUpdateService({
        httpClient,
        params,
        headers,
        accessToken: updatedAccessToken,
        customerToken: customerToken?.token,
      })

      await handleShippingItem(response, {
        itemId: variables.itemId,
        accessToken: updatedAccessToken,
      })

      const updatedAt = Date.now()

      setCartUpdatedAt(updatedAt)

      return response
    },
    {
      onError: options?.onCartItemUpdateError,
    }
  )

  /**
   * Delete Cart Item
   */
  const cartItemDelete = useMutation(
    ['cartItemDelete'],
    async (variables: { cartId: string; itemId: string }) => {
      const params = {
        cartId: variables.cartId,
        itemId: variables.itemId,
      }
      const updatedAccessToken = await updateToken(refetch, data)
      const response = await cartItemDeleteService({
        httpClient,
        params,
        headers,
        accessToken: updatedAccessToken,
        customerToken: customerToken?.token,
      })

      const updatedAt = Date.now()

      queryClient.setQueryData(useEPCartKey, () => {
        return response
      })

      setCartUpdatedAt(updatedAt)

      return response
    },
    {
      onError: options?.onCartItemDeleteError,
    }
  )

  /**
   * Add Cart Item Mutation
   */
  const cartItemAddMutation = useCallback(
    async (params: {
      sku: string
      quantity?: number
      custom_inputs?: EpProductCartCustomInputs
      taxesHandler?: TaxesHandler
    }) => {
      const id = cartId ? cartId : await cartCreate()

      await cartItemAdd.mutate(
        {
          cartId: id,
          sku: params.sku,
          quantity: params.quantity,
          custom_inputs: params.custom_inputs,
          taxesHandler: params.taxesHandler,
        },
        {
          onSuccess: (response) => {
            optionsRef.current?.onCartItemAddSuccess?.(response, id)
          },
        }
      )
    },
    [cartId, cartCreate, cartItemAdd]
  )

  /**
   * Update Cart Item Mutation
   */
  const cartItemUpdateMutation = useCallback(
    async (params: {
      itemId: string
      quantity?: number
      custom_inputs?: EpProductCartCustomInputs
    }) => {
      await cartItemUpdate.mutate({
        cartId,
        itemId: params.itemId,
        quantity: params.quantity,
        custom_inputs: params.custom_inputs,
      })
    },
    [cartId, cartItemUpdate]
  )

  /**
   * Delete Cart Item Mutation
   */
  const cartItemDeleteMutation = useCallback(
    async (params: { itemId: string }) => {
      await cartItemDelete.mutate(
        {
          cartId,
          itemId: params.itemId,
        },
        {
          onSuccess: (response) => {
            const payload = response?.data
              ?.filter((item) => item.type === 'cart_item')
              ?.map((item) => {
                const price =
                  item?.meta?.display_price?.with_tax?.unit?.amount ||
                  item?.meta?.display_price?.without_tax?.unit?.amount
                return {
                  name: item.name,
                  id: item.sku,
                  price: parseFloat((price! / 100).toFixed(2)),
                  brand: item.custom_inputs?.brand,
                  category: item.custom_inputs?.category,
                  variant: item.custom_inputs?.variant,
                  quantity: item.quantity,
                }
              }) as CartProducts[]

            removeFromCart({
              ecommerce: {
                currencyCode: 'USD',
                remove: {
                  products: payload,
                },
              },
            })
          },
        }
      )
    },
    [cartId, cartItemDelete]
  )

  /**
   * addCartItem Facade
   */
  const addCartItem = useRef({
    mutate: cartItemAddMutation,
    isLoading: cartItemAdd.isLoading,
  })

  addCartItem.current.mutate = cartItemAddMutation
  addCartItem.current.isLoading = cartItemAdd.isLoading || creatingCart

  /**
   * updateCartItem Facade
   */
  const updateCartItem = useRef({
    mutate: cartItemUpdateMutation,
    isLoading: cartItemUpdate.isLoading,
  })

  updateCartItem.current.mutate = cartItemUpdateMutation
  updateCartItem.current.isLoading = cartItemUpdate.isLoading

  /**
   * deleteCartItem Facade
   */
  const deleteCartItem = useRef({
    mutate: cartItemDeleteMutation,
    isLoading: cartItemDelete.isLoading,
  })

  deleteCartItem.current.mutate = cartItemDeleteMutation
  deleteCartItem.current.isLoading = cartItemDelete.isLoading

  /**
   * Fetch Cart on each update
   */
  useEffect(() => {
    if (!data) {
      return
    }

    if (cartId) {
      fetchCart()
    }
  }, [cartId, fetchCart, data, customerToken, updatedAt])

  /**
   * Cart data
   */
  const cartData = useMemo(() => {
    const quantity =
      cart?.data?.reduce((acc: number, cartItem) => {
        return cartItem.type !== 'cart_item' ? acc : acc + cartItem.quantity
      }, 0) ?? 0

    return {
      ...cart,
      isLoading: cartId ? status === 'loading' || status === 'idle' : false,
      isEmpty: !quantity,
      quantity,
    }
  }, [cart, status, cartId])

  /**
   * Delete Cart Handler
   */
  const deleteCartHandler = useCallback(() => {
    deleteCart()
    queryClient.setQueryData(useEPCartKey, undefined)
    queryClient.removeQueries(useEPCartKey)
  }, [queryClient])

  /**
   * Cart & Promotion Items
   */
  const { promotionItems, cartItems } = useMemo(() => {
    return {
      promotionItems:
        cart?.data?.filter((i) => i.type === 'promotion_item') ?? [],
      cartItems: cart?.data?.filter((i) => i.type === 'cart_item') ?? [],
    }
  }, [cart])

  /**
   * Public
   */
  return {
    addCartItem: addCartItem.current,
    updateCartItem: updateCartItem.current,
    deleteCartItem: deleteCartItem.current,
    cartItems,
    promotionItems,
    cart: cartData,
    cartId,
    deleteCart: deleteCartHandler,
  }
}
