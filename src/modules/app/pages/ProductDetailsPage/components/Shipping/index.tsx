import { Divider, Flex, Text } from '@chakra-ui/react'
import { NEXT_PUBLIC_SITE_IDENTIFIER } from '@modules/app/constants'
import { EpFlowFieldValue } from '@myplanetdigital/elasticpath'
import { TbTruck } from 'react-icons/tb'
import { useIntl } from 'react-intl'

export type ShippingOption = {
  Order: number
  ProviderName: string
  Name: string
  Cost: number
}

export interface ShippingInterface {
  shippingOption?: ShippingOption | null
  shippingDayTo?: EpFlowFieldValue | undefined
  shippingDayFrom?: EpFlowFieldValue | undefined
}

export const Shipping: React.FC<ShippingInterface> = ({
  shippingOption,
  shippingDayFrom,
  shippingDayTo,
}) => {
  const intl = useIntl()
  const isString = typeof shippingOption === 'string'
  const isCymax = NEXT_PUBLIC_SITE_IDENTIFIER === 'cymax'
  const isFree =
    !isString &&
    shippingOption?.Cost === 0 &&
    (isCymax
      ? intl.formatMessage({ id: 'order.freeShipping' }).toUpperCase()
      : intl.formatMessage({ id: 'productDetailsPageShipping.FreeHomesquare' }))
  const cost = !isString && shippingOption?.Cost ? shippingOption?.Cost : ''

  return (
    <Flex direction="column" pb={8} minH="165px">
      <TbTruck size="23px" />
      {shippingOption && (
        <Text as="p" pt={3} pb={2} fontWeight="bold" fontSize="base">
          {intl.formatMessage(
            {
              id: !!shippingOption?.ProviderName
                ? 'productDetailsPageShipping.shippingViaMethod'
                : 'productDetailsPageShipping.shippingMethod',
            },
            {
              shippingMethod: !isString ? shippingOption?.ProviderName : '',
            }
          )}
        </Text>
      )}
      {(isFree || cost) && (
        <Text as="p" fontSize="sm" fontWeight="normal" lineHeight="150%">
          {intl.formatMessage(
            { id: 'productDetailsPageShipping.shippingPrice' },
            {
              shippingPrice: isFree || cost,
            }
          )}
        </Text>
      )}
      {(shippingDayFrom || shippingDayTo) && (
        <Text as="p" pb={6} fontSize="sm" fontWeight="normal" lineHeight="150%">
          {intl.formatMessage(
            { id: 'productDetailsPageShipping.deliveryTime' },
            {
              shippingDayFrom,
              shippingDayTo,
            }
          )}
        </Text>
      )}
      <Divider />
    </Flex>
  )
}
