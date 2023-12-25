import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import {
  BundleAccordion,
  CartItemShipping,
  ChakraNextImage,
  IMAGE_PLACEHOLDER,
  Prop65Warning,
  QuantityPicker,
} from '@modules/app'
import { EP_CUSTOM_ITEM_KEY } from '@modules/app/constants'
import {
  getCartItemShippingOptionKey,
  getPreviousShippingOption,
  isCaliforniaCounty,
} from '@modules/app/utils'
import {
  EpCartItemInterface,
  ShippingOption,
  useCart,
  useCustomCartItem,
} from '@modules/ep'
import {
  formatProductCartData,
  formatRemoveFromCartData,
  productSelected,
  removeFromCart,
} from '@modules/gtm'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useUpdateCartItemShippingOption } from '../../hooks/useUpdateCartItemShippingOption'
import { CartItemData } from '../CartItemData'
import { CartItemProps } from './types'

export const CartItem = ({
  cartItem,
  onChangeQuantity,
  isLoading,
  flow,
  index,
}: CartItemProps) => {
  const intl = useIntl()
  const toast = useToast()
  const { push, asPath, reload } = useRouter()
  const shippingDaysTo = flow?.shipping_days_to

  const { cart, cartId, deleteCartItem } = useCart({
    onCartItemDeleteError: (e) => {
      toast({
        status: 'error',
        title: intl.formatMessage({ id: 'cart.item.delete.error' }),
        description: intl.formatMessage({
          id: 'cart.item.delete.error.description',
        }),
      })
      reload()
    },
  })

  const { bundles, main_image, pickerOptions, shipping_upgrade_options } =
    cartItem?.custom_inputs ?? {}

  const { deleteCustomCartItem } = useCustomCartItem()
  const { updateCartItemShippingOption } = useUpdateCartItemShippingOption()

  const previousShippingOption: ShippingOption = useMemo(
    () => getPreviousShippingOption(cart.data, cartItem),
    [cart.data, cartItem]
  )

  const onDeleteCartItem = async () => {
    const previousLineItemId = cart.data?.find(
      (shippingItem) =>
        (shippingItem.type as string) === EP_CUSTOM_ITEM_KEY &&
        shippingItem.sku === getCartItemShippingOptionKey(cartItem.product_id)
    )?.id!

    if (!previousLineItemId) {
      return
    }

    const products = formatRemoveFromCartData(cart)?.filter(
      (item) => item.id === cartItem?.sku
    )

    await deleteCustomCartItem(cartId, previousLineItemId)

    deleteCartItem.mutate({ itemId: cartItem.id }).then(() => {
      removeFromCart({
        ecommerce: {
          currencyCode: 'USD',
          remove: {
            products,
          },
        },
      })
      toast({
        status: 'success',
        position: 'top',
        description: intl.formatMessage(
          {
            id: 'cart.item.delete.success',
          },
          { name: cartItem.name }
        ),
      })
    })
  }

  const isProp65County = useMemo(() => {
    return isCaliforniaCounty()
  }, [])

  const handleGtmProductSelected = (product: EpCartItemInterface) => {
    const products = formatProductCartData(product)
    productSelected({
      ecommerce: {
        items: [products],
      },
    })

    push(`/${product?.slug}`)
  }

  return (
    <Box borderBottom="1px" borderColor="shading.200">
      <HStack
        align="flex-start"
        justify="space-between"
        alignItems="flex-start"
        borderColor="shading.200"
        paddingY={{ base: '3', md: '5' }}
        paddingX={0}
        spacing={{ base: '3', md: '8' }}
        position="relative"
      >
        <Box
          as="a"
          cursor="pointer"
          position="relative"
          minH={{ base: '96px', md: '144px' }}
          minW={{ base: '96px', md: '144px' }}
          onClick={() => handleGtmProductSelected(cartItem)}
        >
          <ChakraNextImage
            layout="fill"
            src={main_image?.url || IMAGE_PLACEHOLDER}
            objectFit="cover"
            alt={main_image?.name || ''}
            id={`productSelected ${cartItem?.sku} CartProductImage`}
          />
        </Box>
        <Flex w="100%" flexDir="column">
          <Flex w="100%" display={{ base: 'block', md: 'flex' }}>
            <Stack spacing="1em" width="full">
              <CartItemData
                item={cartItem}
                onClick={handleGtmProductSelected}
              />
              <CartItemShipping
                options={shipping_upgrade_options || []}
                previousShippingOption={previousShippingOption}
                updateShippingOption={(shippingOption: ShippingOption) =>
                  updateCartItemShippingOption(cartItem, shippingOption)
                }
                shippingDaysTo={shippingDaysTo}
              />
            </Stack>
            <Box paddingLeft={{ base: '0', md: '6' }}>
              <Text
                marginBottom="2"
                fontSize="desktop.bodySM"
                fontWeight="extrabold"
                display={{ base: 'none', md: 'block' }}
              >
                {intl.formatMessage({ id: 'cart.quantity' })}
              </Text>
              <QuantityPicker
                rootProps={{ maxW: '200px', mt: { base: '4', md: '0' } }}
                isLoading={isLoading}
                value={cartItem.quantity}
                onChange={(val) => onChangeQuantity?.(val)}
                min={pickerOptions?.minQty}
                step={pickerOptions?.setQty}
              />
              <Button
                id={`removeFromCart ${cartItem?.sku} Cart`}
                borderBottom="1px"
                _hover={{
                  textDecoration: 'none',
                }}
                marginTop="6"
                variant="link"
                size="sm"
                fontSize="mobile.bodySM"
                fontWeight="extrabold"
                onClick={onDeleteCartItem}
              >
                {intl.formatMessage({ id: 'cart.deleteItem' })}
              </Button>
            </Box>
          </Flex>
          {bundles && bundles?.length > 0 && (
            <Box mt={4}>
              <BundleAccordion items={bundles} />
            </Box>
          )}
        </Flex>
      </HStack>
      {flow?.californiaprop65 && isProp65County && (
        <Prop65Warning chemical_list={flow?.chemical_list} />
      )}
    </Box>
  )
}
