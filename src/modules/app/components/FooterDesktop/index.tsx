import {
  Box,
  Container,
  Divider,
  Flex,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { HouzzBBBFooterIcons } from '@modules/app'
import { useComposable } from '@myplanetdigital/base'
import NextLink from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'
import { FooterData } from '../Footer'
import { Legals } from '../Legals'
import { Logo } from '../Logo'
import { NewsletterForm } from '../NewsletterForm'
import { SocialIcons } from '../SocialIcons'
import { LinkStack } from './LinkStack'

interface FooterDesktopProps {
  menu: any
  footerData?: {
    fields: FooterData | null
  } | null
}

export const FooterDesktop = ({ menu, footerData }: FooterDesktopProps) => {
  const intl = useIntl()
  const { path } = useComposable()
  const socialIcons = footerData?.fields?.socialIcons
  const legals = footerData?.fields?.legals

  return (
    <Box borderTopWidth="1px">
      <Container
        as="footer"
        role="contentinfo"
        id="global-footer-desktop"
        minW="100%"
        p={0}
      >
        <Box px="desktop" maxW="container.max" margin="0 auto">
          <Stack
            align="start"
            justify="flex-start"
            pt={{ base: '8', md: '10' }}
            pb={{ base: '4', md: '5' }}
            px={{ base: 0, md: 5, lg: 0 }}
            direction={{ base: 'column', md: 'row' }}
            spacing="0"
          >
            <Flex
              flexDirection="column"
              align="start"
              paddingBottom="5"
              mr="10%"
            >
              <NextLink
                href={path.getHome()}
                passHref
                aria-label={intl.formatMessage({ id: 'ariaLabel.home' })}
              >
                <Link>
                  <Logo height={30} />
                </Link>
              </NextLink>
              <NewsletterForm />
              <HouzzBBBFooterIcons />
            </Flex>
            <Flex
              flex="1"
              align="start"
              direction={{ base: 'column', md: 'row' }}
            >
              {React.Children.toArray(
                menu?.map((item: any) => (
                  // eslint-disable-next-line react/jsx-key
                  <SimpleGrid
                    columns={1}
                    gap="10"
                    width={{ base: 'full', lg: 'auto' }}
                  >
                    <LinkStack item={item} level={1} />
                  </SimpleGrid>
                ))
              )}
            </Flex>
          </Stack>
          <Flex display="flex" justifyContent="end" alignItems="center" mb="6">
            <SocialIcons socialIcons={socialIcons} />
          </Flex>
          <Divider />
        </Box>
        <Stack
          pt="4"
          px="desktop"
          pb="10"
          justify="start"
          direction={{ base: 'column-reverse', md: 'row' }}
          align="center"
          maxW="container.max"
          margin="0 auto"
        >
          <Text fontSize="sm" color="subtle" mr="6">
            {footerData?.fields?.copyright}
          </Text>

          <Legals legals={legals} />
        </Stack>
      </Container>
    </Box>
  )
}
