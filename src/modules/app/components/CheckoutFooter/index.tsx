import { Box, Text } from '@chakra-ui/react'
import { FooterData } from '@modules/app'
import { CallToAction } from '@modules/contentful/components/default/CallToAction'
import React from 'react'

export type CheckoutFooterFields = { fields: FooterData }

interface CheckoutFooter {
  data: CheckoutFooterFields
}

export interface FooterObjectProps {
  data?: {
    fields: FooterData | null
  } | null
}

export const CheckoutFooter = ({ data }: FooterObjectProps) => {
  return (
    <Box
      w="100%"
      as="footer"
      bg="primary.500"
      color="shading.100"
      py="6"
      px={{ base: '4', md: '16' }}
      display={{ base: 'block', md: 'flex' }}
      fontSize={{ base: 'mobile.bodySM', md: 'desktop.bodySM' }}
      alignItems="center"
    >
      <Box mb={{ base: 3, md: 0 }}>
        <Text>{data?.fields?.copyright}</Text>
      </Box>
      <Box
        display={{ base: 'grid', md: 'flex' }}
        alignItems="center"
        gridTemplateColumns="1fr 1fr"
        gap="3"
        ml={{ base: 0, md: '8' }}
      >
        {React.Children.toArray(
          data?.fields?.legals?.map((legal, index) => (
            // eslint-disable-next-line react/jsx-key
            <CallToAction
              buttonChakraProps={{
                fontSize: { base: 'mobile.bodySM', md: 'desktop.bodySM' },
                fontWeight: 'normal',
                mr: '6',
                color: 'shading.100',
                justifyContent: index % 2 ? 'flex-end' : 'flex-start',
                width: { base: '100%', md: 'unset' },
              }}
              {...legal.fields}
            />
          ))
        )}
      </Box>
    </Box>
  )
}
