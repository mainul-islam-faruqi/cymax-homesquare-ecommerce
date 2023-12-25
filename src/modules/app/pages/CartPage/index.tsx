import { LockIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, Text } from '@chakra-ui/react'
import {
  NEXT_PUBLIC_FF_EXPRESS_CHECKOUT_TOGGLE,
  NEXT_PUBLIC_PAYMENT_TOGGLE_AMAZONPAY,
} from '@modules/app/constants'
import { paths } from '@modules/app/paths'
import { getSKUs, orderSummaryData } from '@modules/app/utils'
import { AmazonPayButton, useMultiPageCheckout } from '@modules/checkout'
import { useCustomerAddress } from '@modules/checkout/hooks/useCustomerAddress'
import {
  EpCartItemInterface,
  useCart,
  useProductsByAttribute,
} from '@modules/ep'
import {
  addToCart,
  Item,
  useGtmCheckoutStarted,
  useGtmPageView,
  viewCart,
} from '@modules/gtm'
import { useToast } from '@modules/ui'
import { getIsBrowser } from '@myplanetdigital/base'
import {
  EpFilterAttribute,
  EpFilterOperator,
  getError,
  useUser,
} from '@myplanetdigital/elasticpath'
import { CartLoadingState } from '@myplanetdigital/ui'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { useCsa } from '../CsaLoginPage/hooks'
import { CartEmptyState } from './components/CartEmptyState'
import { CartItemProps } from './components/CartItem/types'
import { CartSummary } from './components/CartSummary'

const DynamicCartItem = dynamic<CartItemProps>(
  () => import('./components/CartItem').then((res) => res.CartItem),
  { ssr: false }
)

type HandleAddToCartGtmProps = {
  cartData?: EpCartItemInterface[]
  itemId: string
  quantity: number
}

type HandleViewCartGtmProps = {
  cartData?: EpCartItemInterface[]
}

export const CartPage = () => {
  const intl = useIntl()
  const toast = useToast()
  const router = useRouter()
  const { customer } = useUser()
  const { customerAddress } = useCustomerAddress()
  const { token: csaMember } = useCsa()
  const { handleGTMCheckoutStarted } = useGtmCheckoutStarted()

  const {
    checkoutData,
    isLoading: isLoadingMultiPage,
    saveData,
  } = useMultiPageCheckout()
  const { cart, updateCartItem, deleteCartItem } = useCart({
    onCartItemUpdateError: (e) => toast({ status: 'error', ...getError(e) }),
  })
  const { total_without_tax } = useMemo(() => orderSummaryData(cart), [cart])
  const title = intl.formatMessage(
    { id: cart.quantity ? 'cart.titleCount' : 'cart.title' },
    { count: cart.quantity }
  )
  const productSKUs = getSKUs(cart.data)
  const { productMap, isLoading } = useProductsByAttribute({
    values: productSKUs,
    filterAttribute: EpFilterAttribute.SKU,
    filterOperator: EpFilterOperator.IN,
  })
  const [hasViewedCart, setHasViewedCart] = useState(false)
  useGtmPageView({ ecomm_pagetype: 'cart' })

  // Preload delivery address for logged in users
  useEffect(() => {
    if (customer && customerAddress && !isLoadingMultiPage) {
      const customerAddressFields = customerAddress?.data?.[0]
      //Check if we don't have already a address edited from shipping page
      if (customerAddressFields && !checkoutData?.delivery) {
        saveData({
          ...checkoutData,
          delivery: {
            type: 'address',
            city: customerAddressFields?.city,
            country: customerAddressFields?.country,
            county: customerAddressFields?.county,
            instructions: customerAddressFields?.instructions,
            line_1: customerAddressFields?.line_1,
            line_2: customerAddressFields?.line_2,
            first_name: customerAddressFields?.first_name,
            last_name: customerAddressFields?.last_name,
            phone_number: customerAddressFields?.phone_number,
            postcode: customerAddressFields?.postcode,
            isCommercial: customerAddressFields?.isCommercial,
            company_name: customerAddressFields?.company_name,
            industry: customerAddressFields?.industry,
          },
        })
      }
    }
  }, [customer, customerAddress, isLoadingMultiPage])

  const handleViewCart = useCallback(
    ({ cartData }: HandleViewCartGtmProps) => {
      const items = cartData
        ?.filter((item) => item.type === 'cart_item')
        ?.map((item) => {
          return {
            item_name: item.name,
            item_id: item.sku,
            price: parseFloat((item?.unit_price?.amount / 100)?.toFixed(2)),
            item_brand: item.custom_inputs?.brand,
            item_category: item.custom_inputs?.category,
            quantity: item.quantity,
            discount:
              (item.custom_inputs?.price?.original_display_price?.without_tax
                ?.amount ?? 0) === 0
                ? 0
                : ((item.custom_inputs?.price?.original_display_price
                    ?.without_tax?.amount ?? 0) -
                    (item.custom_inputs?.price?.display_price?.without_tax
                      ?.amount ?? 0)) /
                  100,
            coupon: Object.keys(item?.meta.display_price?.discounts || {})[0],
          }
        }) as Item[]

      viewCart({
        ecommerce: {
          currency: cart?.meta?.display_price?.without_tax?.currency as string,
          value: parseFloat(
            (cart.meta?.display_price.without_tax.formatted || '0').replace(
              /[^0-9.]/g,
              ''
            )
          ),
          items: items,
        },
      })
    },
    [cart]
  )

  const handleAddGtm = useCallback(
    ({ cartData, itemId }: HandleAddToCartGtmProps) => {
      // Find the item with the given itemId in cartData
      const foundItem = cartData?.find(
        (item) => item.id === itemId && item.type === 'cart_item'
      )

      // If the item is found, update its details
      if (foundItem) {
        const updatedItem = {
          item_name: foundItem.name,
          item_id: foundItem.sku,
          price: parseFloat((foundItem?.unit_price?.amount / 100)?.toFixed(2)),
          item_brand: foundItem.custom_inputs?.brand,
          item_category: String(foundItem.custom_inputs?.category),
          quantity: 1,
          discount:
            (foundItem.custom_inputs?.price?.original_display_price?.without_tax
              ?.amount ?? 0) === 0
              ? 0
              : ((foundItem.custom_inputs?.price?.original_display_price
                  ?.without_tax?.amount ?? 0) -
                  (foundItem.custom_inputs?.price?.display_price?.without_tax
                    ?.amount ?? 0)) /
                100,
          coupon:
            Object.keys(foundItem?.meta.display_price?.discounts || {})[0] ||
            '',
        }

        const totalValue = updatedItem.quantity * updatedItem.price

        addToCart({
          ecommerce: {
            currency: 'USD',
            value: totalValue,
            items: [updatedItem],
          },
        })
      }
    },
    []
  )

  useEffect(() => {
    if (!cart?.data?.length || hasViewedCart) return
    handleViewCart({ cartData: cart.data })
    setHasViewedCart(true)
  }, [cart, hasViewedCart])

  const handleCheckForGuestCheckoutRedirect = () => {
    handleGTMCheckoutStarted()

    if (customer || csaMember) {
      router.push(paths.CHECKOUT_DELIVERY)
    } else {
      router.push(paths.CHECKOUT_LOGIN)
    }
  }

  if (!getIsBrowser() || (isLoading && productSKUs.length > 0)) {
    return null
  }

  return (
    <Container
      maxW="container.xl"
      py={{ base: '4', md: '8' }}
      px={5}
      paddingTop={{ base: '2', md: '8' }}
      position="relative"
    >
      <NextSeo title={title} noindex nofollow />
      <Box>
        <Flex display={{ base: 'flex', md: 'block' }} alignItems="center">
          <Text
            fontWeight="extrabold"
            mb={{ base: '0', md: '1' }}
            pt={{ base: '0', md: '4' }}
            fontSize={{ base: 'mobile.lg', md: 'desktop.lg' }}
          >
            {intl.formatMessage({ id: 'cart.pageTitle' })}
          </Text>
          {!cart.isEmpty && (
            <Text
              fontWeight="normal"
              ml={{ base: '3', md: '0' }}
              fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
            >
              {intl.formatMessage(
                { id: 'cart.items' },
                { count: cart.quantity }
              )}
            </Text>
          )}
        </Flex>
        {!cart.isEmpty && (
          <Box display={{ base: 'block', md: 'none' }}>
            <Flex
              mt="4"
              fontWeight="bold"
              justify="space-between"
              fontSize="desktop.bodyLG"
            >
              <Text>{intl.formatMessage({ id: 'cart.total' })}</Text>
              <Text>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(total_without_tax?.amount! / 100)}
              </Text>
            </Flex>
            <Button
              onClick={handleCheckForGuestCheckoutRedirect}
              w="100%"
              variant="solid"
              size="xl"
              fontSize="mobile.body"
              fontWeight="extrabold"
              mt="4"
              data-insights-object-id={cart.data
                ?.map((item) => item.id)
                .join(',')}
            >
              <LockIcon marginRight="2" />
              {intl.formatMessage({ id: 'cart.secureCheckout' })}
            </Button>
            {NEXT_PUBLIC_PAYMENT_TOGGLE_AMAZONPAY &&
              NEXT_PUBLIC_FF_EXPRESS_CHECKOUT_TOGGLE && (
                <AmazonPayButton
                  id="cartAmazonPayButton"
                  buttonProps={{
                    w: '100% !important',
                    minW: '100% !important',
                  }}
                  loadingProps={{
                    w: '100% !important',
                    minW: '100% !important',
                  }}
                />
              )}
          </Box>
        )}
      </Box>
      {cart.isLoading ? (
        <CartLoadingState />
      ) : cart.isEmpty ? (
        <CartEmptyState />
      ) : (
        <Flex
          mt={3}
          justifyContent="space-between"
          flexDir={{ base: 'column', md: 'row' }}
          gap={{ base: 2, md: 10 }}
        >
          <Flex w={{ base: '100%', md: '60%' }} flexDir="column">
            {cart.data?.map((item: EpCartItemInterface, index: number) => {
              if (item.type !== 'cart_item') {
                return
              }
              return (
                <DynamicCartItem
                  index={index}
                  key={item.id}
                  cartItem={item}
                  isLoading={
                    updateCartItem.isLoading || deleteCartItem.isLoading
                  }
                  onChangeQuantity={(val) => {
                    updateCartItem
                      .mutate({
                        quantity: val,
                        itemId: item.id,
                      })
                      .then(() => {
                        handleAddGtm({
                          cartData: cart?.data,
                          itemId: item.id,
                          quantity: val,
                        })
                      })
                  }}
                  flow={
                    productMap?.[item?.sku]?.attributes?.extensions?.[
                      'products(extended)'
                    ]
                  }
                />
              )
            })}
          </Flex>
          <Flex w={{ base: '100%', md: '40%' }}>
            <CartSummary
              handleCheckForGuestCheckoutRedirect={
                handleCheckForGuestCheckoutRedirect
              }
            />
          </Flex>
        </Flex>
      )}
    </Container>
  )
}
