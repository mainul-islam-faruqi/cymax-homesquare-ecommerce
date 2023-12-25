import { LockIcon } from '@chakra-ui/icons'
import { Button, Divider, Flex, Stack, Text } from '@chakra-ui/react'
import {
  NEXT_PUBLIC_FF_EXPRESS_CHECKOUT_TOGGLE,
  NEXT_PUBLIC_PAYMENT_TOGGLE_AMAZONPAY,
} from '@modules/app/constants'
import { CouponSection } from '@modules/app/pages/CartPage/components/CouponSection'
import { formatMoney, orderSummaryData } from '@modules/app/utils'
import { AmazonPayButton } from '@modules/checkout'
import { useCustomCartItem } from '@modules/ep'
import {
  useCart,
  useCartPromotion,
  useEPCartKey,
} from '@myplanetdigital/elasticpath'
import React, { useMemo, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-query'
import { useItemLevelPromotion } from '../../hooks/useItemLevelPromotion'
import { PromoCodeAlert } from '../PromoCodeAlert'
import { CartSummaryItem } from './CartSummaryItem'

export const CartSummary: React.FC<{
  includeItems?: boolean
  handleCheckForGuestCheckoutRedirect?: () => void
}> = ({ includeItems, handleCheckForGuestCheckoutRedirect }) => {
  const intl = useIntl()
  const { cart, cartId } = useCart()
  const itemLevelPromotions = useItemLevelPromotion()
  const { deleteCartDiscount } = useCustomCartItem()
  const { refetch } = useQuery([useEPCartKey])

  const [promoCodeStatus, setPromoCodeStatus] = useState<{
    status?: string
    message?: string
  }>({})
  const { promotionItems, applyPromotionToCart, removePromotionFromCart } =
    useCartPromotion({
      onApplyError: (e) =>
        setPromoCodeStatus({
          status: 'error',
          message: intl.formatMessage({
            id: 'cart.coupon.action.applyError',
          }),
        }),
      onApplySuccess: () => {
        setPromoCodeStatus({
          status: 'success',
          message: intl.formatMessage({
            id: 'cart.coupon.action.applySuccess',
          }),
        })
      },
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

  const { shipping, subtotal, total_without_tax } = useMemo(
    () => orderSummaryData(cart),
    [cart]
  )

  return (
    <Stack
      spacing="6"
      width="full"
      mt={{ base: '5', md: 'initial' }}
      border={{ base: '1px', md: 'none' }}
      borderColor="gray.100"
    >
      <Stack
        spacing="4"
        boxShadow={{ base: 'none', md: 'base' }}
        borderTop="0.5px solid"
        borderColor="shading.200"
        px="6"
        py={{ base: '8', md: '6' }}
      >
        <Text
          fontSize={{ base: 'mobile.md', md: 'desktop.sm' }}
          fontWeight="extrabold"
        >
          {intl.formatMessage({ id: 'cart.summary.title' })}
        </Text>
        <Stack spacing="2">
          {includeItems && (
            <>
              <Text fontWeight="semibold">
                {intl.formatMessage({ id: 'cart.items' })}
              </Text>
              {cart?.data?.map((item) => {
                if (item.type !== 'cart_item') {
                  return
                }
                return (
                  <CartSummaryItem
                    key={item.id}
                    label={item.name}
                    value={formatMoney(
                      item.meta.display_price.without_tax.value.amount
                    )}
                  />
                )
              })}
              <Divider />
            </>
          )}
          <CartSummaryItem
            label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
            value={new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(subtotal?.amount! / 100)}
          />
          <CartSummaryItem
            label={intl.formatMessage({ id: 'cart.shipping' })}
            value={
              typeof shipping?.amount != 'undefined' && shipping?.amount > 0
                ? new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(shipping?.amount! / 100)
                : intl.formatMessage({ id: 'orderSummary.freeShipping' })
            }
          />
          {promotionItems?.map((item) => (
            <Flex key={item.id} justify="space-between" fontSize="sm">
              <Flex alignItems="center">
                <Text color="shading.700">{item.sku}</Text>
                <Button
                  p={0}
                  ml={1}
                  minW="auto"
                  variant="link"
                  onClick={() =>
                    removePromotionFromCart.mutate({ itemId: item.id })
                  }
                >
                  <IoIosCloseCircleOutline color="red" size={20} />
                </Button>
              </Flex>
              <Text fontWeight="medium" color="red">
                {formatMoney(item.meta.display_price.without_tax.value.amount)}
              </Text>
            </Flex>
          ))}
          {itemLevelPromotions?.map((item) => (
            <Flex key={item?.id} justify="space-between" fontSize="sm">
              <Flex alignItems="center">
                <Text color="shading.700">{item?.code}</Text>
                <Button
                  p={0}
                  ml={1}
                  minW="auto"
                  variant="link"
                  onClick={() =>
                    handleRemoveItemLevelPromotion(cartId, item?.code)
                  }
                >
                  <IoIosCloseCircleOutline color="red" size={20} />
                </Button>
              </Flex>
              <Text fontWeight="medium" color="red">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(item?.amount?.amount / 100)}
              </Text>
            </Flex>
          ))}
          <CartSummaryItem
            label={intl.formatMessage({ id: 'cart.summary.tax' })}
            value={intl.formatMessage({ id: 'order.taxTbd' })}
          />
          <CouponSection
            deleteCartDiscount={deleteCartDiscount}
            itemLevelPromotions={itemLevelPromotions}
            applyPromotionToCart={applyPromotionToCart}
            removePromotionFromCart={removePromotionFromCart}
            setPromoCodeStatus={setPromoCodeStatus}
          />
          <PromoCodeAlert
            promoCodeStatus={promoCodeStatus}
            setPromoCodeStatus={setPromoCodeStatus}
          />
          <Flex
            justify="space-between"
            fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
            pt="5"
            fontWeight="bold"
          >
            <Text>{intl.formatMessage({ id: 'cart.total' })}</Text>
            <Text>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(total_without_tax?.amount! / 100)}
            </Text>
          </Flex>
        </Stack>
        <Button
          mt={4}
          onClick={handleCheckForGuestCheckoutRedirect}
          variant="solid"
          size="xl"
          width="100%"
          fontWeight="extrabold"
          fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
          data-insights-object-id={cart.data?.map((item) => item.id).join(',')}
        >
          <LockIcon marginRight="2" />
          {intl.formatMessage({ id: 'cart.secureCheckout' })}
        </Button>
        {NEXT_PUBLIC_FF_EXPRESS_CHECKOUT_TOGGLE &&
          NEXT_PUBLIC_PAYMENT_TOGGLE_AMAZONPAY && (
            <>
              <Divider marginTop="32px !important" color="shading.200" />
              <Text textAlign="center" fontSize="14px" fontWeight="bold">
                {intl.formatMessage({ id: 'cart.expressCheckout' })}
              </Text>
              <AmazonPayButton
                id="cartAmazonPayButton2"
                buttonProps={{
                  w: '100% !important',
                  minW: '100% !important',
                  marginTop: '24px !important',
                }}
                loadingProps={{
                  w: '100% !important',
                  minW: '100% !important',
                }}
              />
            </>
          )}
      </Stack>
    </Stack>
  )
}
