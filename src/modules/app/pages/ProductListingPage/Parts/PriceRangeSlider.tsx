import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'
import { CustomRangeSlider } from './CustomRangeSlider'

export const PriceRangeSlider: FunctionComponent = () => {
  const { formatMessage } = useIntl()

  return (
    <AccordionItem w="full" border="none">
      {({ isExpanded }) => (
        <>
          <Heading>
            <AccordionButton
              py={2}
              px={4}
              height={'42px'}
              borderBottom="1px solid"
              borderColor="shading.300"
            >
              <Box
                flex="1"
                textAlign="left"
                fontWeight={'extrabold'}
                fontSize={'mobile.body'}
              >
                {formatMessage({ id: 'category.filters.price' })}
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize="xs" />
              ) : (
                <AddIcon fontSize="xs" />
              )}
            </AccordionButton>
          </Heading>
          <AccordionPanel
            px={1}
            py={isExpanded ? '19.5px' : 6}
            borderBottom={'1px solid'}
            borderColor={'shading.300'}
            marginBottom={isExpanded ? 8 : 0}
          >
            <CustomRangeSlider />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
