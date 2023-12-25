import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react'
import { AccordionIcon } from '@modules/components'
import React from 'react'
import { useIntl } from 'react-intl'
import { BundleCard } from './BundleCard'
import { BundleDetailsAccordionType } from './types'

export const BundleAccordion: React.FC<BundleDetailsAccordionType> = ({
  items,
  title,
  borderBottom,
  accordionProps,
}) => {
  const intl = useIntl()

  return (
    <Accordion
      allowMultiple
      borderBottomWidth="0px"
      aria-label={intl.formatMessage({
        id: title || 'product.bundleShowMoreButton',
      })}
      {...accordionProps}
    >
      <AccordionItem
        isFocusable
        border={borderBottom ? 'inherit' : 'none'}
        borderTop="0"
        borderBottomWidth="1px"
        borderColor="shading.200"
      >
        {({ isExpanded }) => (
          <>
            <AccordionButton
              p="4"
              display="flex"
              justifyContent="space-between"
            >
              <Text
                fontWeight="bold"
                flex="1"
                textAlign="left"
                fontSize={{ base: 'sm', md: 'desktop.body' }}
              >
                {intl.formatMessage({
                  id: title || 'product.bundleShowMoreButton',
                })}
              </Text>
              <AccordionIcon isExpanded={isExpanded} />
            </AccordionButton>
            <AccordionPanel p="0" borderBottomWidth="0">
              {React.Children.toArray(
                items?.map((item, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <BundleCard index={index} item={item} />
                ))
              )}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
