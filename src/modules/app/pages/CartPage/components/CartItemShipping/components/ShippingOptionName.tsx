import { Text } from '@chakra-ui/react'
import { ShippingOption } from '@modules/ep'
import { useIntl } from 'react-intl'

export const ShippingOptionName: React.FC<Omit<ShippingOption, 'Order'>> = ({
  ProviderName,
  Name,
  Cost,
}) => {
  const intl = useIntl()
  let optionName = ''

  if (Cost > 0) {
    optionName += `$${Cost} - `
  } else {
    optionName += `${intl.formatMessage({ id: 'order.freeShipping' })} - `
  }

  optionName += Name

  if (ProviderName) {
    optionName += ` - ${intl.formatMessage({
      id: 'cart.itemVia',
    })} ${ProviderName}`
  }

  return (
    <Text
      fontWeight="bold"
      fontSize={{ base: 'mobile.bodySM', md: 'desktop.bodySM' }}
    >
      {optionName}
    </Text>
  )
}
