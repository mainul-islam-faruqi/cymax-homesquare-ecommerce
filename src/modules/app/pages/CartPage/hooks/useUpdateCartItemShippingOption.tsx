import {
  ELASTIC_PATH_CLIENT_ID,
  EP_CUSTOM_ITEM_KEY,
} from '@modules/app/constants'
import { getCartItemShippingOptionKey } from '@modules/app/utils'
import {
  EpCartItemInterface,
  EPCustomCartItemInterface,
  ShippingOption,
  useCustomCartItem,
} from '@modules/ep'
import { useCart, useEPCartKey } from '@myplanetdigital/elasticpath'
import { useQuery } from 'react-query'

const buildCustomInput = (
  cartItem: EpCartItemInterface,
  shippingOption: ShippingOption
): EPCustomCartItemInterface => {
  const isDecimalValue = String(shippingOption?.Cost)?.includes('.')
  const amount = isDecimalValue
    ? parseInt(String(shippingOption?.Cost)?.split('.')?.join(''), 10)
    : shippingOption?.Cost * 100
  return {
    type: EP_CUSTOM_ITEM_KEY,
    name: `${shippingOption?.Name}`,
    sku: getCartItemShippingOptionKey(cartItem?.product_id),
    description: JSON.stringify({
      storeId: ELASTIC_PATH_CLIENT_ID,
      shippingOption,
    }),
    custom_inputs: {
      selectedShippingOption: shippingOption,
    },
    price: {
      amount,
      includes_tax: false,
    },
    quantity: cartItem?.quantity,
  }
}

export const useUpdateCartItemShippingOption = () => {
  const { cart, cartId } = useCart()
  const { addCustomCartItem, deleteCustomCartItem } = useCustomCartItem()
  const { refetch } = useQuery([useEPCartKey])

  const updateCartItemShippingOption = async (
    cartItem: EpCartItemInterface,
    shippingOption: ShippingOption
  ) => {
    let isDeleteSuccess = false
    let isAddSuccess = false
    try {
      const previousLineItemId = cart.data?.find(
        (item) =>
          (item.type as string) === EP_CUSTOM_ITEM_KEY &&
          item.sku === getCartItemShippingOptionKey(cartItem.product_id)
      )?.id!

      const customInput = buildCustomInput(cartItem, shippingOption)

      isDeleteSuccess = await deleteCustomCartItem(cartId, previousLineItemId)

      if (!isDeleteSuccess) {
        throw new Error('Error removing item from the cart.')
      }

      isAddSuccess = await addCustomCartItem(cartId, customInput)

      if (!isAddSuccess) {
        throw new Error('Error adding item to the cart.')
      }

      await refetch()

      return { isAddSuccess, isDeleteSuccess }
    } catch (e) {
      console.error(e)
      return { isAddSuccess, isDeleteSuccess }
    }
  }

  return {
    updateCartItemShippingOption,
  }
}
