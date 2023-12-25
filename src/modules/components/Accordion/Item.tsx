import { AccordionItem as ChakraAccordionItem } from '@chakra-ui/react'
import React from 'react'
import { Button } from './Button'
import { List } from './List'
import { ItemType } from './types'

export const Item = ({
  links,
  title,
  onClick,
  titleLink,
  accordionItemProps,
  accordionPanelProps,
  accordionButtonProps,
  accordionListTextProps,
  accordionButtonTextProps,
}: ItemType) => {
  return (
    <ChakraAccordionItem
      isFocusable
      borderTop="0"
      borderBottomWidth="1px"
      borderColor="shading.200"
      {...accordionItemProps}
    >
      {({ isExpanded }) => (
        <>
          <Button
            title={title}
            onClick={onClick}
            titleLink={titleLink}
            isExpanded={isExpanded}
            accordionButtonProps={accordionButtonProps}
            accordionButtonTextProps={accordionButtonTextProps}
          />
          {React.Children.toArray(
            links?.map((link) => (
              // eslint-disable-next-line react/jsx-key
              <List
                fields={link?.fields}
                content={link?.content}
                accordionPanelProps={accordionPanelProps}
                accordionListTextProps={accordionListTextProps}
              />
            ))
          )}
        </>
      )}
    </ChakraAccordionItem>
  )
}
