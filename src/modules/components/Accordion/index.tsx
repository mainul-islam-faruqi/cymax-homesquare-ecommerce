import { Accordion as ChakraAccordion, Box } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { Header } from './Header'
import { Item } from './Item'
import { AccordionType } from './types'

export const Accordion = ({
  fields,
  containerProps,
  accordionProps,
  accordionItemProps,
  accordionPanelProps,
  accordionButtonProps,
  accordionListTextProps,
  accordionButtonTextProps,
}: AccordionType) => {
  const { items } = fields || {}

  const [indexes, setIndexes] = useState<number[]>([])

  const handleIndexes = (value: number[]) => {
    setIndexes(value)
  }

  const toggleAllAccordions = useCallback(() => {
    if (indexes.length > 0) {
      handleIndexes([])
    } else {
      const newIndexes: number[] = []
      items?.forEach((_, index: number) => {
        newIndexes.push(index)
      })
      handleIndexes(newIndexes)
    }
  }, [items, indexes])

  const toggleAccordion = useCallback(
    (value: number) => {
      const containsIndex = indexes.includes(value)
      if (containsIndex) {
        const newIndexes = indexes.filter((item) => item !== value)
        handleIndexes(newIndexes)
      } else {
        setIndexes((prev) => [value, ...prev])
      }
    },
    [indexes]
  )

  const handleExpand = useCallback(
    (value: number | 'all') => {
      if (typeof value === 'string') {
        toggleAllAccordions()
      } else {
        toggleAccordion(value)
      }
    },
    [toggleAccordion, toggleAllAccordions]
  )

  return (
    <Box
      mb="10"
      top="10"
      w="100%"
      as="aside"
      position="sticky"
      minW={['100%', '225px', '225px', '225px', '250px', '295px']}
      {...containerProps}
    >
      {fields?.title && (
        <Header
          indexes={indexes}
          title={fields?.title}
          onClick={() => handleExpand('all')}
        />
      )}
      <ChakraAccordion
        allowMultiple
        index={indexes}
        borderBottomWidth="0px"
        aria-label="sidebar menu"
        {...accordionProps}
      >
        {React.Children.toArray(
          items?.map((item: any, idx: number) => (
            // eslint-disable-next-line react/jsx-key
            <Item
              onClick={() => handleExpand(idx)}
              titleLink={item?.fields?.titleLink}
              links={item?.links || item?.fields?.links}
              title={item?.title || item?.fields?.title}
              accordionItemProps={accordionItemProps}
              accordionPanelProps={accordionPanelProps}
              accordionButtonProps={accordionButtonProps}
              accordionListTextProps={accordionListTextProps}
              accordionButtonTextProps={accordionButtonTextProps}
            />
          ))
        )}
      </ChakraAccordion>
    </Box>
  )
}
