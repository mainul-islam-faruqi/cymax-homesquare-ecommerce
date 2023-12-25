import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import { useContentfulMegaMenuItem } from '@modules/contentful'
import { MegaMenuItem } from '@modules/contentful/utils'
import React from 'react'
import { LinkStack } from './LinkStack'
interface AccordionStackProps {
  item: MegaMenuItem
}

export const AccordionStack = ({ item }: AccordionStackProps) => {
  const id = item?.sys.id ?? ''
  const label = item?.link?.label ?? ''
  const { children } = useContentfulMegaMenuItem(id)

  return (
    <Accordion allowToggle width="100%" marginTop="0 !important">
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton height="60px">
                <Box flex="1" textAlign="left">
                  {label}
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {React.Children.toArray(
                children?.map((item: any) => (
                  // eslint-disable-next-line react/jsx-key
                  <LinkStack item={item} level={3} />
                ))
              )}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
