import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { useIntl } from 'react-intl'

interface Prop65WarningAccordion {
  message?: string
}

export const Prop65WarningAccordion = ({ message }: Prop65WarningAccordion) => {
  const intl = useIntl()
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Accordion
      w="100%"
      allowToggle={true}
      bg="warning.100"
      borderRadius="4px"
      borderLeftWidth={5}
      borderLeftColor="warning.500"
      borderTop="transparent"
    >
      <AccordionItem borderBottom="none">
        <AccordionButton
          _hover={{
            background: 'warning.100',
          }}
        >
          <HStack flex="1" textAlign="left">
            <BsFillExclamationCircleFill
              color="#DD6B20"
              size={isMobile ? 16 : 20}
            />
            <Text fontWeight="bold" fontSize={{ base: 'xs', md: 'sm' }}>
              {intl.formatMessage({ id: 'prop65.warning' })}
            </Text>
          </HStack>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pt={0} pb={2} px={4}>
          <Text fontSize={{ base: 'xxs', md: 'xs' }}>
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
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
