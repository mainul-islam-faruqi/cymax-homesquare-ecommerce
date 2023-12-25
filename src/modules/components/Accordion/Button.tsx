import { AccordionButton, Text } from '@chakra-ui/react'
import { CallToAction } from '@modules/contentful/components/default/CallToAction'
import { AccordionIcon } from './Icon'
import { ButtonType } from './types'

export const Button = ({
  title,
  onClick,
  titleLink,
  isExpanded,
  accordionButtonProps,
  accordionButtonTextProps,
}: ButtonType) => {
  return (
    <AccordionButton
      onClick={onClick}
      {...accordionButtonProps}
      p="4"
      display="flex"
      justifyContent="space-between"
      borderBottom={
        accordionButtonProps?.borderBottom && isExpanded ? '1px' : '0'
      }
    >
      {!titleLink?.fields ? (
        <Text
          as="p"
          flex="1"
          fontSize="base"
          textAlign="left"
          fontWeight={isExpanded ? '600' : '400'}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          {...accordionButtonTextProps}
        >
          {title}
        </Text>
      ) : (
        <CallToAction
          textOverflowEllipsis
          buttonChakraProps={{
            h: '24px',
            size: 'none',
            fontSize: 'base',
            fontWeight: `${isExpanded ? '600' : '400'}`,
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            _hover: { textDecoration: 'underline' },
            maxW: '245px',
          }}
          {...titleLink?.fields}
        />
      )}
      <AccordionIcon isExpanded={isExpanded} />
    </AccordionButton>
  )
}
