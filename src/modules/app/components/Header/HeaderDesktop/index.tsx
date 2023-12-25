import {
  Box,
  Container,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
} from '@chakra-ui/react'
import { useInputFocus } from '@modules/app/hooks'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { paths } from '@modules/app/paths'
import { searchCreated } from '@modules/gtm'
import { clickEvent } from '@modules/gtm/clickEvent'
import { setRedirectDestination } from '@modules/sso/Utilities/OidcUtilities'
import { useComposable } from '@myplanetdigital/base'
import NextLink from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { BiSupport } from 'react-icons/bi'
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'
import { useIntl } from 'react-intl'
import { Logo } from '../../Logo'
import { MegaMenu } from '../../MegaMenu'
import { HeaderProps } from '../types'

export const HeaderDesktop = ({
  cartQuantity,
  headerMenu,
  headerData,
  cartData,
}: HeaderProps) => {
  const intl = useIntl()
  const { path } = useComposable()
  const [searchText, setSearchText] = useState('')
  const { textFieldFocusFX } = useInputFocus()
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any stored refinement to avoid keep filters from PLP to PRP.
    if (typeof window !== 'undefined') {
      localStorage.removeItem('storedRefinement')
    }
    setSearchText(e.target.value)
  }, [])

  const { asPath } = useRouter()

  const handleOnKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (searchText.trim() === '') {
          Router.push({ pathname: paths.HOME })
          return
        }
        const customerToken = localStorage.getItem('ep_customerToken')
        searchCreated({
          search_term: searchText.trim(),
          page_details: asPath,
          loginstatus: customerToken ? 'loggedin' : 'loggedout',
        })
        Router.push({ pathname: '/search', query: { query: searchText } })
        setSearchText('')
      }
    },
    [searchText]
  )
  const { token: csaToken } = useCsa()

  const handleCartIconClick = useCallback(() => {
    clickEvent({
      event: 'clickEvent',
      category: '',
      subcategory: '',
      page_details: path?.getCart(),
      section: intl.formatMessage({ id: 'ariaLabel.header' }),
      clicktext: intl.formatMessage({ id: 'ariaLabel.cart' }),
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
  }, [path])

  const handleSearchIconClick = useCallback(() => {
    clickEvent({
      event: 'clickEvent',
      category: '',
      subcategory: '',
      page_details: '/search',
      section: intl.formatMessage({ id: 'ariaLabel.header' }),
      clicktext: intl.formatMessage({
        id: 'ariaLabel.search',
      }),
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
  }, [])

  return (
    <Box as="header" height="auto" id="global-header-mobile">
      <Container
        borderBottom="1px"
        borderBottomColor="shading.200"
        py={3}
        px={0}
        bg="white"
        minW="100%"
      >
        <Stack
          spacing="4"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          alignItems={'center'}
          margin="0 auto"
          maxW="container.max"
          px={{ base: 0, md: '20px', lg: 'desktop' }}
        >
          <Stack spacing="1">
            <NextLink
              href={path.getHome()}
              passHref
              aria-label={intl.formatMessage({
                id: 'ariaLabel.home',
              })}
            >
              <Link>
                <Logo height={35} />
              </Link>
            </NextLink>
          </Stack>
          <InputGroup maxW={{ lg: 'lg' }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="shading.400" boxSize="5" />
            </InputLeftElement>
            <Input
              value={searchText}
              fontSize="base"
              borderColor="transparent"
              bg="shading.100"
              placeholder={headerData?.fields?.searchText}
              onChange={handleSearch}
              onClick={handleSearchIconClick}
              onKeyDown={handleOnKeyPress}
              _placeholder={{
                color: 'shading.400',
                fontWeight: '400',
                fontSize: 'base',
                textAlign: 'center',
              }}
              aria-label={intl.formatMessage({
                id: 'ariaLabel.search',
              })}
              _focus={{ ...textFieldFocusFX, borderColor: 'primary.500' }}
            />
          </InputGroup>
          <Flex justifyContent="center" alignItems="center">
            <Box mr={3}>
              <Box transform="translateY(-1px) translateX(5px)">
                <NextLink
                  passHref
                  href={csaToken ? paths.CSA_DASHBOARD : paths.ACCOUNT_ADDRESS}
                >
                  <Link
                    onClick={() => {
                      setRedirectDestination()
                    }}
                    aria-label={intl.formatMessage({
                      id: 'ariaLabel.account',
                    })}
                  >
                    {csaToken ? <BiSupport size={24} /> : <FiUser size={24} />}
                  </Link>
                </NextLink>
              </Box>
            </Box>
            <NextLink
              href={path.getCart()}
              passHref
              aria-label={intl.formatMessage({
                id: 'ariaLabel.cart',
              })}
            >
              <Link display="flex" ml={3}>
                <FiShoppingCart
                  size={24}
                  aria-label={intl.formatMessage({ id: 'ariaLabel.cart' })}
                  data-insights-object-id={cartData
                    ?.map((item) => item.id)
                    .join(',')}
                />
                {!!cartQuantity && (
                  <Flex
                    transform="translateY(-10px)"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontSize="xs"
                    fontWeight="bold"
                    borderRadius="base"
                    bg={cartQuantity ? 'red.500' : 'transparent'}
                    minW="15px"
                    h="15px"
                    p="2px"
                  >
                    {cartQuantity ?? ''}
                  </Flex>
                )}
              </Link>
            </NextLink>
          </Flex>
        </Stack>
      </Container>
      <MegaMenu data={headerMenu} />
    </Box>
  )
}
