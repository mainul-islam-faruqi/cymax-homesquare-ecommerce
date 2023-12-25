import { Box, Container, Divider, Link, Stack, Text } from '@chakra-ui/react'
import { HouzzBBBFooterIcons } from '@modules/app'
import { MegaMenuItem } from '@modules/contentful/utils'
import { useComposable } from '@myplanetdigital/base'
import NextLink from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'
import { Logo } from '..'
import { Legals } from '../Legals'
import { NewsletterForm } from '../NewsletterForm'
import { SocialIcons } from '../SocialIcons'
import { AccordionStack } from './AccordionStack'
import { FooterMobileProps } from './types'

export const FooterMobile = ({ footerData, menu }: FooterMobileProps) => {
  const intl = useIntl()
  const { path } = useComposable()
  const socialIcons = footerData?.fields?.socialIcons
  const legals = footerData?.fields?.legals

  return (
    <Box borderTopWidth="1px">
      <Container as="footer" role="contentinfo" maxW="container.xl">
        <Stack
          justify="space-between"
          align="start"
          direction={{ base: 'column', lg: 'row' }}
          pt={{ base: '8', md: '10' }}
          pb="8"
        >
          <Stack spacing={{ base: 4, md: 6 }} align="start" paddingBottom="6">
            <NextLink
              href={path.getHome()}
              passHref
              aria-label={intl.formatMessage({ id: 'ariaLabel.home' })}
            >
              <Link>
                <Logo height={30} />
              </Link>
            </NextLink>
          </Stack>
          {menu?.length > 0 && (
            <Box w="100%" pb={10}>
              {React.Children.toArray(
                menu?.map((item: MegaMenuItem) => (
                  // eslint-disable-next-line react/jsx-key
                  <AccordionStack key={item?.sys?.id} item={item} />
                ))
              )}
            </Box>
          )}
          <Box w="100%" pb={5}>
            <NewsletterForm />
          </Box>
          <Box w="100%" pb={6}>
            <HouzzBBBFooterIcons />
          </Box>
          <SocialIcons socialIcons={socialIcons} />
        </Stack>
        <Divider />
        <Stack
          pt="4"
          pb="8"
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          align="center"
        >
          <Box>
            <Text fontSize="sm" color="subtle">
              {footerData?.fields?.copyright}
            </Text>
          </Box>
          <Legals legals={legals} isMobile />
        </Stack>
      </Container>
    </Box>
  )
}
