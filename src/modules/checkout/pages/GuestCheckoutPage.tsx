import { Button, Container, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { paths } from '@modules/app/paths'
import { NextSeo } from 'next-seo'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { useGtmPageViewCheckout } from '@modules/gtm'
import { setRedirectDestination } from '@modules/sso/Utilities/OidcUtilities'

export const GuestCheckoutPage = () => {
  const intl = useIntl()

  useGtmPageViewCheckout()

  const [mediaQuery] = useMediaQuery(`(min-width: 1440px) `)
  const [isLargerThan1440, setIsLargerThan1440] = useState(false)

  useEffect(() => {
    if (mediaQuery !== isLargerThan1440) {
      setIsLargerThan1440(mediaQuery)
    }
  }, [mediaQuery])

  // Set redirect page to use after login.
  setRedirectDestination({ path: paths.CHECKOUT_DELIVERY })

  return (
    <>
      <NextSeo
        title={intl.formatMessage({ id: 'account.login.title' })}
        noindex
        nofollow
      />
      <Flex
        w="100%"
        direction={{ base: 'column', xl: 'row', lg: 'row' }}
        background="shading.100"
        gap={{ base: 5, md: 10 }}
        padding={{ base: 5, md: 10 }}
        justifyContent="center"
      >
        <Container
          maxW={isLargerThan1440 ? '660px' : '100%'}
          background="theme.background"
          p={{ base: 5, md: 10 }}
          margin={0}
        >
          <Text
            as="h2"
            mb={2}
            fontWeight="extrabold"
            fontSize={{ base: 'mobile.lg', md: 'desktop.md' }}
          >
            {intl.formatMessage({
              id: 'checkout.guestCustomer.title',
            })}
          </Text>
          <Text
            as="p"
            p="0"
            m="0"
            minH={{ sm: '0', md: 12 }}
            fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
          >
            {intl.formatMessage({
              id: 'checkout.guestCustomer.subtitle',
            })}
          </Text>
          <NextLink href={paths.CHECKOUT_DELIVERY} passHref>
            <Button
              as="a"
              width="100%"
              height={12}
              mt={10}
              fontSize={'desktop.body'}
            >
              {intl.formatMessage({
                id: 'checkout.guestCustomer.btnText',
              })}
            </Button>
          </NextLink>
        </Container>
        <Container
          maxW={isLargerThan1440 ? '660px' : '100%'}
          background="theme.background"
          p={{ base: 5, md: 10 }}
          margin={0}
        >
          <Text
            as="h2"
            mb={2}
            fontWeight="extrabold"
            fontSize={{ base: 'mobile.lg', md: 'desktop.md' }}
          >
            {intl.formatMessage({ id: 'account.login.title' })}
          </Text>
          <Text as="p" minH={{ sm: '0', md: 12 }} p="0" m="0">
            {intl.formatMessage({ id: 'account.login.subTitle' })}
          </Text>
          <NextLink href={paths.LOGIN} passHref>
            <Button
              as="a"
              width="100%"
              height={12}
              mt={10}
              fontSize={'desktop.body'}
            >
              {intl.formatMessage({
                id: 'checkout.guestCustomer.loginBtnText',
              })}
            </Button>
          </NextLink>
        </Container>
      </Flex>
    </>
  )
}
