import { Box, Flex, Text } from '@chakra-ui/react'
import { ChakraNextImage } from '@modules/app'
import { productSelected } from '@modules/gtm'
import React from 'react'
import { useIntl } from 'react-intl'
import { Bundle } from './types'

type BundleCardProps = {
  index: number
  item: Bundle
}

export const BundleCard: React.FC<BundleCardProps> = ({ index, item }) => {
  const intl = useIntl()
  const clickOnBundle = (bundle: Bundle) => {
    productSelected({
      ecommerce: {
        items: [
          {
            item_name: bundle?.name,
            item_id: bundle?.id,
            price: item.price,
            item_brand: bundle?.brand,
            item_category: bundle?.category?.toString(),
            quantity: item.quantity,
          },
        ],
      },
    })

    window.open(`/${bundle?.slug}`, '_blank')
  }

  return (
    <Flex
      my={3}
      alignItems="center"
      cursor="pointer"
      onClick={() => clickOnBundle(item)}
      id={`productSelected ${item?.id} Bundle`}
    >
      <Box
        position="relative"
        height={{ base: '60px', md: '85px' }}
        width={{ base: '60px', md: '92px' }}
      >
        <ChakraNextImage
          layout="fill"
          src={item?.url}
          alt={item?.name}
          objectFit="contain"
          id={`productSelected ${item?.id} Bundle Image`}
        />
      </Box>
      <Flex flexDirection="column" ml={{ base: 3, md: 6 }}>
        <Text
          as="h2"
          fontSize={{ base: 'sm', md: 'desktop.body' }}
          fontWeight="normal"
          id={`productSelected ${item?.id} Bundle Title`}
        >
          {item?.name}
        </Text>
        <Text
          fontSize={{ base: 'xs', md: 'sm' }}
          color="shading.400"
          id={`productSelected ${item?.id} Bundle Quantity`}
        >
          {intl.formatMessage(
            { id: 'product.bundleQuantity' },
            {
              quantity: item?.quantity,
            }
          )}{' '}
        </Text>
      </Flex>
    </Flex>
  )
}
