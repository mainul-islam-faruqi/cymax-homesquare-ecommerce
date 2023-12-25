import { Box, Flex, Link, useMediaQuery } from '@chakra-ui/react'
import { Logo } from '@modules/app'
import { useComposable } from '@myplanetdigital/base'
import NextLink from 'next/link'
import { FiShoppingCart } from 'react-icons/fi'
import { useIntl } from 'react-intl'
import { BiSupport } from 'react-icons/bi'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'

export const CheckoutHeaderTop = () => {
  const { path } = useComposable()
  const { token: csaToken } = useCsa()
  const intl = useIntl()

  const [isValueLess960] = useMediaQuery('(max-width: 960px)')
  return (
    <>
      {isValueLess960 && (
        <Box
          px="4"
          pt="4"
          pb="2"
          borderBottom="1px"
          borderColor="shading.200"
          backgroundColor="theme.background"
        >
          <Flex justify="space-between" alignItems="flex-start" w="100%">
            <NextLink
              href={path.getHome()}
              passHref
              aria-label={intl.formatMessage({ id: 'ariaLabel.home' })}
            >
              <Link cursor="pointer" display="flex" alignItems="center">
                <Logo height={30} />
                {csaToken && (
                  <Box marginLeft={3.5}>
                    <BiSupport size={20} />
                  </Box>
                )}
              </Link>
            </NextLink>
            <NextLink
              href={path.getCart()}
              passHref
              aria-label={intl.formatMessage({ id: 'ariaLabel.cart' })}
            >
              <Link>
                <FiShoppingCart
                  size={20}
                  aria-label={intl.formatMessage({ id: 'ariaLabel.cart' })}
                />
              </Link>
            </NextLink>
          </Flex>
        </Box>
      )}
    </>
  )
}
