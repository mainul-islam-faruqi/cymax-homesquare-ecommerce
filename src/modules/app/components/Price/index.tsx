import { HStack, StackProps, Text, TextProps } from '@chakra-ui/react'
import { EpDisplayPrice, EpDisplayPriceValue } from '@modules/ep'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'

interface ProductPriceProps {
  rootProps?: StackProps
  priceProps?: TextProps
  salePriceProps?: TextProps
  originalPriceProps?: TextProps
  originalDisplayPrice?: EpDisplayPrice
  displayPrice?: EpDisplayPrice
  quantity?: number
}

export const Price = ({
  rootProps,
  priceProps,
  salePriceProps,
  originalPriceProps,
  originalDisplayPrice,
  displayPrice,
  quantity,
}: ProductPriceProps) => {
  const regularPrice = useMemo(() => {
    return originalDisplayPrice?.without_tax ?? originalDisplayPrice?.with_tax
  }, [originalDisplayPrice])

  const currentPrice = useMemo(() => {
    return displayPrice?.without_tax ?? displayPrice?.with_tax
  }, [displayPrice])

  const handlePriceToQuantity = useCallback(
    (price?: EpDisplayPriceValue) => {
      const newPrice = price?.amount
        ? price?.amount * (quantity || 1)
        : price?.amount
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(newPrice! / 100)
    },
    [quantity]
  )

  const intl = useIntl()

  const getPercent = (salePrice: number, listPrice: number) => {
    let numberPercent: number = 0
    try {
      numberPercent = 100 - Math.trunc((salePrice / listPrice) * 100)
    } catch (e: any) {
      console.error(e)
      throw new Error('Error getting percent price')
    }
    return intl.formatMessage(
      { id: 'productDetailsPageHeader.savePercent' },
      {
        percent: numberPercent,
      }
    )
  }

  if (!regularPrice && !currentPrice) {
    return null
  }

  const regularPriceAmount = regularPrice?.amount ?? 0
  const currentPriceAmount = currentPrice?.amount ?? 0
  const hasSpecialPrice = Boolean(currentPriceAmount < regularPriceAmount)

  return (
    <HStack spacing="1" {...rootProps}>
      {hasSpecialPrice && (
        <Text
          as="span"
          fontWeight="normal"
          color="danger.500"
          fontSize="base"
          {...salePriceProps}
        >
          {handlePriceToQuantity(currentPrice)}
        </Text>
      )}
      <Text
        as="span"
        fontWeight="normal"
        color={hasSpecialPrice ? 'shading.400' : 'black'}
        textDecoration={hasSpecialPrice ? 'line-through' : 'none'}
        {...(hasSpecialPrice ? originalPriceProps : priceProps)}
      >
        {hasSpecialPrice
          ? handlePriceToQuantity(regularPrice)
          : handlePriceToQuantity(currentPrice)}
      </Text>
      {hasSpecialPrice && (
        <Text
          as="span"
          fontWeight="normal"
          color="danger.500"
          textDecoration="none"
          {...(hasSpecialPrice ? originalPriceProps : priceProps)}
        >
          {getPercent(currentPriceAmount, regularPriceAmount)}
        </Text>
      )}
    </HStack>
  )
}
