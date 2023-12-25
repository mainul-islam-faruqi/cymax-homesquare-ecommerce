import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { EpFlowFieldValue } from '@myplanetdigital/elasticpath'
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { useIntl } from 'react-intl'
import { Prop65WarningAccordion } from './Prop65WarningAccordion'

interface Prop65Props {
  chemical_list: EpFlowFieldValue
  accordionComponent?: boolean
}

export const Prop65Warning = ({
  accordionComponent = false,
  chemical_list,
}: Prop65Props) => {
  const intl = useIntl()
  const message = chemical_list
    ? intl.formatMessage(
        { id: 'prop65.customMessage' },
        {
          chemicalList: chemical_list,
        }
      )
    : intl.formatMessage({ id: 'prop65.genericMessage' })

  if (accordionComponent) {
    return <Prop65WarningAccordion message={message} />
  }

  return (
    <Box
      bg="warning.100"
      p={3}
      pr={5}
      borderRadius="4px"
      borderLeftWidth={5}
      borderLeftColor="warning.500"
      mb={5}
    >
      <HStack alignItems="center">
        <Box>
          <BsFillExclamationCircleFill color="#DD6B20" size={20} />
        </Box>
        <VStack alignItems="flex-start">
          <Text fontWeight="bold" fontSize={{ base: 'xs', md: 'sm' }}>
            {intl.formatMessage({ id: 'prop65.warning' })}
          </Text>
          <Text mt="0px !important" fontSize={{ base: 'xxs', md: 'xs' }}>
            {message}{' '}
            <Text
              as="a"
              href={`//${intl.formatMessage({ id: 'prop65.url' })}`}
              rel="noreferrer"
              target="_blank"
              textDecoration="underline"
            >
              {intl.formatMessage({ id: 'prop65.url' })}
            </Text>
          </Text>
        </VStack>
      </HStack>
    </Box>
  )
}
