import { Flex, Stack, Text } from '@chakra-ui/react'
import { orderSummaryData } from '@modules/app/utils'
import { OrderItem } from '@modules/checkout/components/OrderSummary/OrderItem'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Order } from '../OrderConfirmation/types'
import { OrderSummaryItem } from '../OrderSummary/OrderSummaryItem'

export const EpOrderSummary: React.FC<{
  order: Order
  isDropDown?: boolean
}> = ({ order, isDropDown }) => {
  const intl = useIntl()

  const { shipping, subtotal, total } = useMemo(
    () => orderSummaryData(order),
    [order]
  )

  if (order == null) {
    return null
  }

  return (
    <Stack
      boxShadow="none"
      py={{ base: '3', md: '6' }}
      width="full"
      px={isDropDown ? '0' : { base: '3', md: '6' }}
    >
      {!isDropDown && (
        <Text fontSize="2xl" fontWeight="extrabold">
          {intl.formatMessage({ id: 'epOrderSummary.orderSummary' })}
        </Text>
      )}

      <Stack
        paddingTop={isDropDown ? '0' : '6'}
        paddingBottom={isDropDown ? '9' : '1'}
      >
        {React.Children.toArray(
          order?.items?.map((item) => {
            if (!item?.custom_inputs || item?.sku?.includes('shipping_')) {
              return
            }
            return (
              // eslint-disable-next-line react/jsx-key
              <OrderItem
                unit_price={item?.unit_price}
                name={item?.name}
                quantity={item?.quantity}
                custom_inputs={item?.custom_inputs}
                sku={item?.sku}
              />
            )
          })
        )}
      </Stack>
      <Stack
        spacing="2"
        pt="5"
        pb="3"
        borderTop={isDropDown ? '1px' : '0px'}
        borderColor="shading.200"
      >
        <OrderSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
          value={new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(subtotal?.amount! / 100)}
        />

        <OrderSummaryItem
          label={intl.formatMessage({ id: 'order.shipping' })}
          value={
            typeof shipping?.amount != 'undefined' && shipping?.amount > 0
              ? new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(shipping?.amount! / 100)
              : intl.formatMessage({ id: 'orderSummary.freeShipping' })
          }
        />
        <OrderSummaryItem
          label={intl.formatMessage({ id: 'epOrderSummary.summary.tax' })}
          value={new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(order?.meta?.display_price?.tax?.amount! / 100)}
        />
        {order?.meta?.display_price.discount?.amount && (
          <OrderSummaryItem
            label={intl.formatMessage({
              id: 'epOrderSummary.summary.discount',
            })}
            value={new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(order?.meta?.display_price?.discount?.amount! / 100)}
          />
        )}
      </Stack>
      <Flex
        justify="space-between"
        pt="5"
        borderTop="1px"
        borderColor="shading.200"
        fontWeight="bold"
      >
        <Text>{intl.formatMessage({ id: 'epOrderSummary.total' })}</Text>
        <Text>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(total?.amount! / 100)}
        </Text>
      </Flex>
    </Stack>
  )
}
