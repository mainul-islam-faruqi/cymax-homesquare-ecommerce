import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import { useContentfulMegaMenuItem } from '@modules/contentful'
import React from 'react'
import { LinkStack } from './LinkStack'
import { AccordionStackProps, LinkItem } from './types'

export const AccordionStack = ({ item }: AccordionStackProps) => {
  const id = item?.sys.id ?? ''
  const label = item?.link?.label ?? ''
  const { children } = useContentfulMegaMenuItem(id)

  return (
    <Accordion allowToggle width="100%" marginTop="0 !important">
      <AccordionItem border={0}>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                py={3}
                px={4}
                borderBottom={'1px solid'}
                borderColor="gray.200"
              >
                <Box fontSize="sm" flex="1" textAlign="left">
                  {label}
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pt={0} px={0} pb={2}>
              {React.Children.toArray(
                children?.map((item: any) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <LinkStack item={item as LinkItem} level={3} />
                  )
                })
              )}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
