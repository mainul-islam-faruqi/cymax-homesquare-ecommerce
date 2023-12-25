import { Box, Flex, Text } from '@chakra-ui/react'
import { formatMoney, formatTaxes, orderSummaryData } from '@modules/app/utils'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { OrderSummaryItem } from '../../OrderSummary/OrderSummaryItem'
import { Order } from '../types'

interface OrderSummaryMobileViewProps {
  order: Order
}

export const MobileViewOrderSummary: React.FC<OrderSummaryMobileViewProps> = ({
  order,
}) => {
  const intl = useIntl()

  const { subtotal, total, taxes, shipping } = useMemo(
    () => orderSummaryData(order),
    [order]
  )

  return (
    <Flex flexDir="column" mt={8} gap={2} pb={20}>
      <OrderSummaryItem
        label={intl.formatMessage({ id: 'orderSummary.summary.subtotal' })}
        value={formatMoney(subtotal?.amount!)}
      />
      <OrderSummaryItem
        label={intl.formatMessage({ id: 'orderSummary.shipping' })}
        value={
          shipping?.formatted ??
          intl.formatMessage({ id: 'orderSummary.freeShipping' })
        }
      />
      <Box paddingBottom={2}>
        <OrderSummaryItem
          label={intl.formatMessage({ id: 'orderSummary.summary.tax' })}
          value={formatTaxes(taxes!)}
        />
      </Box>
      <Flex
        justify="space-between"
        paddingTop={4}
        fontWeight="bold"
        borderTopWidth="1px"
        borderColor="muted"
      >
        <Text>{intl.formatMessage({ id: 'orderSummary.total' })}</Text>
        <Text>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(total?.amount! / 100)}
        </Text>
      </Flex>
    </Flex>
  )
}
