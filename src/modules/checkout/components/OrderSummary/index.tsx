import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { paths } from '@modules/app'
import { CouponSection } from '@modules/app/pages/CartPage/components/CouponSection'
import { PromoCodeAlert } from '@modules/app/pages/CartPage/components/PromoCodeAlert'
import { useItemLevelPromotion } from '@modules/app/pages/CartPage/hooks/useItemLevelPromotion'
import {
  IS_HOMESQUARE,
  formatMoney,
  formatTaxes,
  orderSummaryData,
} from '@modules/app/utils'
import { OrderItem } from '@modules/checkout/components/OrderSummary/OrderItem'
import { EpCartInterface, useCustomCartItem } from '@modules/ep'
import {
  EpProductMap,
  useCart,
  useCartPromotion,
  useEPCartKey,
} from '@myplanetdigital/elasticpath'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-query'

import { OrderSummaryItem } from './OrderSummaryItem'

export interface OrderSummaryProps {
  isDropDown?: boolean
  cart?: EpCartInterface
  map?: EpProductMap
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  isDropDown,
  cart,
  map,
}) => {
  const { asPath } = useRouter()
  const intl = useIntl()

  const [promoCodeStatus, setPromoCodeStatus] = useState<{
    status?: string
    message?: string
  }>({})
  const itemLevelPromotions = useItemLevelPromotion()
  const { deleteCartDiscount } = useCustomCartItem()
  const { refetch } = useQuery([useEPCartKey])
  const { cartId } = useCart()
  const { subtotal, taxes, shipping, total, total_without_tax } = useMemo(
    () => orderSummaryData(cart),
    [cart]
  )

  const { promotionItems, applyPromotionToCart, removePromotionFromCart } =
    useCartPromotion({
      onApplyError: (e) =>
        setPromoCodeStatus({
          status: 'error',
          message: intl.formatMessage({
            id: 'cart.coupon.action.applyError',
          }),
        }),
      onApplySuccess: () =>
        setPromoCodeStatus({
          status: 'success',
          message: intl.formatMessage({
            id: 'cart.coupon.action.applySuccess',
          }),
        }),
      onRemoveError: (e) =>
        setPromoCodeStatus({
          status: 'error',
          message: intl.formatMessage({
            id: 'cart.coupon.action.removeError',
          }),
        }),
      onRemoveSuccess: () =>
        setPromoCodeStatus({
          status: 'success',
          message: intl.formatMessage({
            id: 'cart.coupon.action.removeSuccess',
          }),
        }),
    })

  const handleRemoveItemLevelPromotion = async (
    cartId: string,
    promoCode: string
  ) => {
    await deleteCartDiscount(cartId, promoCode)
    await refetch()
  }

  /**
   *! If these rules change, please update the comment above

   ** Cart page
   *? tax will always be displayed as TBD on the Cart page
   *? use the meta.display_price.without_tax property from EPCC
   */

  /**
   ** Checkout > Delivery Address
   *? tax will always be displayed as TBD on the Checkout > Delivery Address page
   *? use the meta.display_price.without_tax property from EPCC
   */

  /**
   ** Other Pages
   *? tax in the Order Summary section should be up-to-date and as accurate as possible, as we now have both the billing and shipping addresses
   *? For the total use the meta.display_price.with_tax property from EPCC
   */

  const totalPrice = [paths.CHECKOUT_DELIVERY, paths.CART].includes(asPath)
    ? total_without_tax
    : total

  const formattedTaxes =
    paths.CHECKOUT_DELIVERY === asPath
      ? intl.formatMessage({ id: 'order.taxTbd' })
      : formatTaxes(taxes!)

  if (cart === undefined || cart?.isLoading) {
    return <></>
  }

  return (
    <Flex
      width="full"
      boxShadow="none"
      bg="theme.background"
      m="0"
      py={{ base: '3', md: '6' }}
      px={isDropDown ? '0' : { base: '3', md: '6' }}
      flexDir="column"
    >
      {!isDropDown && (
        <Text fontSize="2xl" fontWeight="extrabold">
          {intl.formatMessage({ id: 'orderSummary.orderSummary' })}
        </Text>
      )}

      <Flex
        m="0"
        flexDir="column"
        paddingTop={isDropDown ? '0' : '6'}
        paddingBottom={isDropDown ? '8' : '1'}
      >
        {cart?.data?.map((item) => {
          if (item.type !== 'cart_item') {
            return
          }
          return (
            <OrderItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              custom_inputs={item.custom_inputs}
              unit_price={item.unit_price}
              flow={
                map?.[item.sku]?.attributes?.extensions?.['products(extended)']
              }
              sku={item.sku}
            />
          )
        })}
      </Flex>
      <Stack
        spacing="2"
        pt={5}
        pb={2}
        borderTop={isDropDown ? '1px' : '0px'}
        borderColor="shading.200"
      >
        <OrderSummaryItem
          label={intl.formatMessage({ id: 'orderSummary.summary.subtotal' })}
          value={formatMoney(subtotal?.amount)}
        />
        <OrderSummaryItem
          label={intl.formatMessage({ id: 'orderSummary.shipping' })}
          value={
            typeof shipping?.amount != 'undefined' && shipping?.amount > 0
              ? shipping?.formatted
              : intl.formatMessage({ id: 'orderSummary.freeShipping' })
          }
        />
        {React.Children.toArray(
          promotionItems?.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <Flex justify="space-between" fontSize="sm">
              <Flex alignItems="center">
                <Text color="shading.700">{item.sku}</Text>
                {asPath != paths.OPEN_PATH_FORM && (
                  <Button
                    variant="link"
                    onClick={() =>
                      removePromotionFromCart.mutate({ itemId: item.id })
                    }
                  >
                    <IoIosCloseCircleOutline color="red" size={20} />
                  </Button>
                )}
              </Flex>
              <Text fontWeight="medium" color="red">
                {formatMoney(
                  item?.meta?.display_price?.without_tax?.value?.amount
                )}
              </Text>
            </Flex>
          ))
        )}
        {React.Children.toArray(
          itemLevelPromotions?.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <Flex justify="space-between" fontSize="sm">
              <Flex alignItems="center">
                <Text color="shading.700">{item.code}</Text>
                {asPath != paths.OPEN_PATH_FORM && (
                  <Button
                    variant="link"
                    onClick={() =>
                      handleRemoveItemLevelPromotion(cartId, item?.code)
                    }
                  >
                    <IoIosCloseCircleOutline color="red" size={20} />
                  </Button>
                )}
              </Flex>
              <Text fontWeight="medium" color="red">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(item?.amount?.amount / 100)}
              </Text>
            </Flex>
          ))
        )}
        <OrderSummaryItem
          label={intl.formatMessage({ id: 'orderSummary.summary.tax' })}
          value={formattedTaxes}
        />
      </Stack>
      {asPath != paths.OPEN_PATH_FORM && !IS_HOMESQUARE && (
        <>
          <CouponSection
            itemLevelPromotions={itemLevelPromotions}
            deleteCartDiscount={deleteCartDiscount}
            removePromotionFromCart={removePromotionFromCart}
            applyPromotionToCart={applyPromotionToCart}
            setPromoCodeStatus={setPromoCodeStatus}
          />
          <PromoCodeAlert
            promoCodeStatus={promoCodeStatus}
            setPromoCodeStatus={setPromoCodeStatus}
          />
        </>
      )}
      <Flex justify="space-between" paddingTop={3} fontWeight="bold">
        <Text>{intl.formatMessage({ id: 'orderSummary.total' })}</Text>
        <Text>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(totalPrice?.amount! / 100)}
        </Text>
      </Flex>
    </Flex>
  )
}
