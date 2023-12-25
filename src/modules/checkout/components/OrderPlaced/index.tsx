import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useCheckout, useUser } from '@myplanetdigital/elasticpath'
import { NextSeo } from 'next-seo'
import NextLink from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'

export const OrderPlaced = () => {
  const { response } = useCheckout()
  const { customer } = useUser()
  const intl = useIntl()
  return (
    <Box>
      <Heading fontSize={{ base: '24', md: '32' }}>
        {intl.formatMessage({ id: 'checkout.orderPlacedTitle' })}
      </Heading>

      <NextSeo title="Order Confirmation" noindex nofollow />

      <Box
        position="relative"
        py="8"
        px="6"
        backgroundColor="white"
        mt="8"
        sx={{
          label: {
            fontWeight: 'extrabold',
            fontSize: 'desktop.body',
          },
          input: {
            fontSize: 'desktop.body',
          },
        }}
      >
        <Heading fontSize="2xl" mb="6">
          {intl.formatMessage({ id: 'checkout.orderTitle' })}
        </Heading>
        <Text pb="6">
          {intl.formatMessage({ id: 'checkout.confirmationBlurb' })}
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }} spacing="6">
          <NextLink
            href={!customer ? '/account/create-account' : 'account/dashboard'}
          >
            <Button
              as="a"
              variant="solid"
              width="100%"
              py={{ base: '5', md: '6' }}
              _hover={{ cursor: 'pointer' }}
              fontSize={{ base: 'desktop.body', md: 'desktop.bodyLG' }}
            >
              {!customer
                ? intl.formatMessage({ id: 'action.createAccount' })
                : intl.formatMessage({ id: 'action.reviewMyOrders' })}
            </Button>
          </NextLink>
          <NextLink href="/">
            <Button
              as="a"
              variant="outline"
              width="100%"
              py={{ base: '5', md: '6' }}
              _hover={{ cursor: 'pointer' }}
              fontSize={{ base: 'desktop.body', md: 'desktop.bodyLG' }}
            >
              {intl.formatMessage({ id: 'action.continueShopping' })}
            </Button>
          </NextLink>
        </Stack>
      </Box>
    </Box>
  )
}
