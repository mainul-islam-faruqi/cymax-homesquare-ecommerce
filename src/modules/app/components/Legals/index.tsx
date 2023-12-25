import { Box, Flex } from '@chakra-ui/react'
import { CallToAction } from '@modules/contentful/components/default/CallToAction'
import { ContentfulCTA } from '@modules/contentful/pages/types'
import React from 'react'

export interface Legal {
  fields: ContentfulCTA
}

interface LegalsProps {
  legals?: Legal[]
  isMobile?: boolean
}

export const Legals = ({ legals, isMobile }: LegalsProps) => {
  return isMobile ? (
    <Flex ml="6" flexWrap="wrap">
      {React.Children.toArray(
        legals?.map((legal: any, idx: number) => (
          // eslint-disable-next-line react/jsx-key
          <Box
            key={legal?.fields?.label}
            flex="50%"
            textAlign={idx % 2 == 0 ? 'left' : 'right'}
          >
            <CallToAction
              buttonChakraProps={{
                fontSize: 'sm',
                fontWeight: 'normal',
                mr: '6',
              }}
              {...legal.fields}
            />
          </Box>
        ))
      )}
    </Flex>
  ) : (
    <>
      {React.Children.toArray(
        legals?.map((legal: any) => (
          // eslint-disable-next-line react/jsx-key
          <Box mr="6" fontSize="sm">
            <CallToAction
              buttonChakraProps={{
                fontSize: 'sm',
                fontWeight: 'normal',
                mr: '6',
              }}
              {...legal.fields}
            />
          </Box>
        ))
      )}
    </>
  )
}
