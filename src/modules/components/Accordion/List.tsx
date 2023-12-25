import { AccordionPanel as AccordionChakraPanel, Box } from '@chakra-ui/react'
import { CallToAction } from '@modules/contentful/components/default/CallToAction'
import { LinksProps } from './types'

export const List = ({
  fields,
  content,
  accordionListTextProps,
  accordionPanelProps,
}: LinksProps) => {
  const { label } = fields || {}
  const renderCta = fields && label && !content

  return (
    <>
      {(content || label) && (
        <AccordionChakraPanel
          p="0"
          borderBottomWidth="0"
          _hover={{
            background: 'blackAlpha.50',
            transitionProperty:
              'background-color,border-color,color,fill,stroke,opacity,box-shadow,transform',
            transitionDuration: '200ms',
          }}
          {...accordionPanelProps}
        >
          {renderCta && (
            <CallToAction
              textOverflowEllipsis
              buttonChakraProps={{
                p: '4',
                w: '100%',
                h: '100%',
                size: 'none',
                fontSize: 'base',
                fontWeight: '400',
                lineHeight: '150%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                maxW: '245px',
              }}
              {...fields}
            />
          )}
          {!renderCta && (
            <Box
              p="4"
              w="100%"
              h="100%"
              fontSize="14px"
              fontWeight="400"
              lineHeight="150%"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
              {...accordionListTextProps}
            />
          )}
        </AccordionChakraPanel>
      )}
    </>
  )
}
