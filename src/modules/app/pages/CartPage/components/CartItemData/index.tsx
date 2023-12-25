import { Box, Stack, Text } from '@chakra-ui/react'
import { Price } from '@modules/app'
import { EpCartItemInterface } from '@modules/ep'
import { useIntl } from 'react-intl'

type CartItemDataProps = {
  item: EpCartItemInterface
  onClick: (data: EpCartItemInterface) => void
}

export const CartItemData = ({ item, onClick }: CartItemDataProps) => {
  const intl = useIntl()

  return (
    <Box>
      <Stack align="flex-start" spacing="0">
        <Text
          as="a"
          cursor="pointer"
          color="shading.400"
          onClick={() => onClick(item)}
          id={`productSelected ${item?.sku} CartSKU`}
          fontSize={{ base: 'mobile.bodyXS', md: 'desktop.bodyXS' }}
        >
          #{item?.sku}
        </Text>

        <Text
          as="a"
          color="black"
          cursor="pointer"
          onClick={() => onClick(item)}
          fontWeight="bold"
          id={`productSelected ${item?.sku} CartProductName`}
          fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
        >
          {item?.name}
        </Text>
      </Stack>
      <Text
        mt={3}
        as="p"
        color="shading.400"
        fontSize={{ base: 'mobile.bodyXS', md: 'desktop.bodyXS' }}
      >
        {intl.formatMessage({ id: 'cart.unitPrice' })}
      </Text>
      <Price
        rootProps={{
          alignItems: 'flex-start',
          mt: '0.5',
        }}
        priceProps={{
          fontSize: {
            base: 'mobile.bodySM',
            md: 'desktop.bodySM',
          },
          fontWeight: 'bold',
        }}
        salePriceProps={{
          fontSize: {
            base: 'mobile.bodySM',
            md: 'desktop.bodySM',
          },
          fontWeight: 'bold',
        }}
        originalPriceProps={{
          fontSize: {
            base: 'mobile.bodySM',
            md: 'desktop.bodySM',
          },
          fontWeight: 'bold',
        }}
        displayPrice={item?.custom_inputs?.price?.display_price}
        originalDisplayPrice={
          item?.custom_inputs?.price?.original_display_price
        }
      />
    </Box>
  )
}
