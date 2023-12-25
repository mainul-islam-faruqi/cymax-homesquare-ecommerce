import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import {
  FLAT_SHIPPING_KEY,
  NEXT_PUBLIC_BAZAARVOICE_URL,
  paths,
} from '@modules/app'
import { formatNumber, prepareOrderConfirmationData } from '@modules/app/utils'
import {
  CheckoutTemplateProps,
  Loader,
  MobileViewOrderSummary,
  Sidebar,
  useMultiPageCheckout,
} from '@modules/checkout'
import { orderConfirmationPageView, purchases } from '@modules/gtm/checkout'
import { useCart, useUser } from '@myplanetdigital/elasticpath'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Order } from './types'

export interface bvItems {
  name: string
  price: string
  quantity: string
  productId: string
  discount: string
}

const DynamicCheckoutTemplate = dynamic<CheckoutTemplateProps>(
  () =>
    import('@modules/checkout/CheckoutTemplate').then(
      (res) => res.CheckoutTemplate
    ),
  { ssr: false }
)

const CHECKOUT_ORDER_KEY = 'checkoutOrder'

export const OrderConfirmation: React.FC = () => {
  const intl = useIntl()
  const router = useRouter()
  const { checkoutData, isLoading, saveData } = useMultiPageCheckout()
  const { customer } = useUser()
  const { deleteCart } = useCart()
  const [order, setOrder] = useState<Order | null | undefined>(null)
  const [isPageViewReported, setIsPageViewReported] = useState(false)
  const [isValueLess960] = useMediaQuery('(max-width: 960px)')

  const handleBazaarvoice = (BV: any, storedOrder: Order) => {
    const bvItems =
      storedOrder?.items?.reduce((accumulator: any, currentItem: any) => {
        return currentItem.catalog_id
          ? [
              ...accumulator,
              {
                name: currentItem.name,
                price: formatNumber(currentItem.unit_price.amount),
                quantity: String(currentItem.quantity),
                productId: currentItem.sku,
                discount: '0',
              },
            ]
          : accumulator
      }, []) ?? []

    const shippingValue = storedOrder?.items
      ? storedOrder?.items?.reduce((acc: number, item) => {
          if (
            (item?.sku as string).includes('shipping_') ||
            (item?.sku as string).includes(FLAT_SHIPPING_KEY)
          ) {
            return acc + item?.value.amount
          }
          return acc
        }, 0)
      : 0

    const bvOrder = {
      orderId: storedOrder?.id, // provided by your system
      currency: storedOrder?.meta?.display_price?.with_tax?.currency,
      total:
        formatNumber(
          (storedOrder?.meta?.display_price?.without_tax?.amount as number) -
            shippingValue
        ) ?? 0, // subtotal without tax, shipping, discounts
      tax: formatNumber(storedOrder?.meta?.display_price?.tax?.amount ?? 0),
      shipping: formatNumber(shippingValue),
      discount: formatNumber(
        Math.abs(storedOrder?.meta?.display_price?.discount?.amount ?? 0)
      ), // discounts applied to total cart
      items: bvItems,
      email: checkoutData?.customer?.email,
      locale: 'en_US',
      nickname: checkoutData?.customer?.name, // used for email personalization
    }

    BV.pixel.trackTransaction(bvOrder)
    window.localStorage.removeItem(CHECKOUT_ORDER_KEY)
  }

  // Unmount
  useEffect(() => {
    return () => setOrder(null)
  }, [])

  useEffect(() => {
    if (!isPageViewReported && checkoutData && customer !== undefined) {
      const algoliaToken = localStorage.getItem('algoliaUserToken')
      // prepare GTM data
      const {
        coupon,
        orderEmail,
        orderId,
        customerType,
        shipping,
        affiliation,
        revenue,
        tax,
        productIds,
        items,
        currency,
        totalCartValue,
        couponDiscount,
      } = prepareOrderConfirmationData({
        data: checkoutData,
        customer,
      })

      // GTM purchases event call
      purchases({
        ecommerce: {
          couponDiscount: couponDiscount,
          transaction_id: orderId,
          value: totalCartValue,
          tax: tax,
          shipping: shipping,
          currency: currency,
          coupon: coupon,
          items: items,
        },
      })

      // GTM page view call
      orderConfirmationPageView({
        ecomm_pagetype: 'purchase',
        ecomm_pcat: 'purchase',
        orderID: orderId,
        'order-email': orderEmail,
        customerType,
        algoliaToken: algoliaToken,
      })

      localStorage.removeItem('referral')
      setIsPageViewReported(true)
      // On load clear the local storage
      setOrder(checkoutData?.order as unknown as Order)

      if (checkoutData?.order && window) {
        window.localStorage.setItem(
          CHECKOUT_ORDER_KEY,
          JSON.stringify(checkoutData.order)
        )
        ;(window as any).bvCallback = (BV: any) => {
          const checkoutOrder = JSON.parse(
            window.localStorage.getItem(CHECKOUT_ORDER_KEY) as string
          ) as Order
          handleBazaarvoice(BV, checkoutOrder)
        }
      }

      saveData(null)
      // Delete the cart when ready
      deleteCart()
    }
  }, [customer, checkoutData])

  useEffect(() => {
    if (!isLoading && order == null) {
      if (checkoutData?.order == null) {
        router.replace(paths.HOME)
      }
    }
  }, [isLoading, setOrder, checkoutData, order, router])

  if (order == null) {
    return <Loader />
  }

  return (
    <DynamicCheckoutTemplate order={order}>
      <NextSeo title="Order Confirmation" noindex nofollow />
      <Script
        defer
        strategy="lazyOnload"
        type="text/javascript"
        src="https://unpkg.com/default-passive-events"
      />
      <Script type="text/javascript" src={NEXT_PUBLIC_BAZAARVOICE_URL} />
      <Container maxW="container.xl" py={{ base: '4', md: '8' }} px="0">
        <Heading fontSize={{ base: '24', md: '32' }}>
          {intl.formatMessage({ id: 'checkout.orderPlacedTitle' })}
        </Heading>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems={'flex-start'}
          pt={'8'}
          gap={{ base: 5, lg: 10 }}
        >
          <Box
            position="relative"
            py="8"
            px={{ base: '4', md: '6' }}
            backgroundColor="white"
            sx={{
              label: {
                fontWeight: 'extrabold',
                fontSize: 'desktop.body',
              },
              input: {
                fontSize: 'desktop.body',
              },
            }}
            width={isValueLess960 ? '100%' : '56%'}
          >
            <Heading fontSize="2xl" mb="6">
              {intl.formatMessage({ id: 'checkout.orderTitle' })}
            </Heading>
            <Text
              paddingBottom={8}
              fontSize={{ base: 'mobile.body', md: 'desktop.bodySM' }}
            >
              {intl.formatMessage({ id: 'checkout.confirmationBlurb' })}
            </Text>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: 5, md: 7 }}
              width={'100%'}
            >
              {!customer && (
                <Link href={!customer ? '/account/login' : 'account/dashboard'}>
                  <Button
                    as="a"
                    variant="solid"
                    width="100%"
                    px={{ base: '78.5px', md: '90.5px' }}
                    py={{ base: '5', md: '6' }}
                    gap="8"
                    _hover={{ cursor: 'pointer' }}
                    fontSize={'desktop.body'}
                  >
                    {!customer
                      ? intl.formatMessage({ id: 'action.createAccount' })
                      : intl.formatMessage({
                          id: 'action.reviewMyOrders',
                        })}
                  </Button>
                </Link>
              )}
              <Link href="/">
                <Button
                  as="a"
                  variant="outline"
                  width="100%"
                  py={{ base: '5', md: '6' }}
                  px={{ base: '78.5px', md: '90.5px' }}
                  gap="32px"
                  _hover={{ cursor: 'pointer' }}
                  fontSize={'desktop.body'}
                >
                  {intl.formatMessage({ id: 'action.continueShopping' })}
                </Button>
              </Link>
            </Stack>
          </Box>
          {!isValueLess960 && <Sidebar order={order} />}
        </Flex>
        {order && isValueLess960 && <MobileViewOrderSummary order={order} />}
      </Container>
    </DynamicCheckoutTemplate>
  )
}
