import { Box, Flex, Text } from '@chakra-ui/react'
import { ChakraNextImage, Prop65Warning } from '@modules/app'
import { isCaliforniaCounty } from '@modules/app/utils'
import { EpCartItemInterface } from '@modules/ep'
import { EpFlowFieldsInterface } from '@myplanetdigital/elasticpath/esm'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

export type OrderItemProps = Pick<
  EpCartItemInterface,
  'name' | 'quantity' | 'custom_inputs' | 'unit_price' | 'quantity' | 'sku'
> & {
  flow?: EpFlowFieldsInterface
}

export const OrderItem: React.FC<OrderItemProps> = ({
  custom_inputs,
  unit_price,
  name,
  quantity,
  flow,
  sku,
}) => {
  const intl = useIntl()

  const isProp65County = useMemo(() => {
    return isCaliforniaCounty()
  }, [])
  const image = custom_inputs?.main_image

  return (
    <Flex
      minH={92}
      alignItems="flex-start"
      _last={{ marginBottom: 0 }}
      mt={4}
      _first={{ marginTop: 0 }}
    >
      <Box width="92px" height="92px" position="relative" mr={4}>
        {image && (
          <ChakraNextImage
            objectFit="contain"
            layout="fill"
            alt={image?.name}
            src={image?.url}
          />
        )}
      </Box>
      <Flex flexDir="column" width="100%">
        {sku && (
          <Text
            fontSize={{ base: 'mobile.bodyXS', md: 'desktop.bodyXS' }}
            color="shading.400"
            wordBreak="break-word"
          >
            #{sku}
          </Text>
        )}
        <Text
          fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
          color="shading.900"
          wordBreak="break-word"
          fontWeight="normal"
        >
          {name}
        </Text>
        <Text
          fontSize={{ base: 'mobile.bodySM', md: 'desktop.bodySM' }}
          color="shading.900"
          wordBreak="break-word"
          fontWeight="bold"
        >
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: unit_price?.currency,
          }).format(unit_price?.amount / 100)}
        </Text>
        <Text
          fontSize={{ base: 'mobile.bodySM', md: 'desktop.bodySM' }}
          color="shading.400"
          wordBreak="break-word"
        >
          {intl.formatMessage(
            { id: 'checkout.quantity' },
            { quantity: quantity }
          )}
        </Text>
        {flow?.californiaprop65 && isProp65County && (
          <Flex mt={1} w="100%">
            <Prop65Warning
              chemical_list={flow?.chemical_list}
              accordionComponent
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
