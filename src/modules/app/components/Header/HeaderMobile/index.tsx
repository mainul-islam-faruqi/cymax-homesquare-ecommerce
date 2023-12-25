import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack
} from '@chakra-ui/react'
import { paths } from '@modules/app/paths'
import { searchCreated } from '@modules/gtm'
import { useComposable } from '@myplanetdigital/base'
import NextLink from 'next/link'
import Router, { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { FiSearch, FiShoppingCart } from 'react-icons/fi'
import { useIntl } from 'react-intl'
import { Logo } from '../../Logo'
import { MegaDrawer } from '../../MegaDrawer'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { HeaderProps } from '../types'

const HeaderMobile = ({
  cartQuantity,
  headerData,
  headerMenu,
}: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [temporalScrollPosition, setTemporalScrollPosition] = useState(0)
  const intl = useIntl()
  const { path } = useComposable()
  const [searchText, setSearchText] = useState('')

  const scrollPosition = useScrollPosition()
  const scrollDirection = useScrollDirection()
  const isVisible = scrollPosition || scrollDirection === 'up'

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

  useEffect(() => {
    if (!isInputFocused) {
      setShowSearch(isVisible)
    }
  }, [scrollPosition])

  useEffect(() => {
    if (isInputFocused) {
      setShowSearch(true)
      if (scrollPosition) {
        document.body.style.position = 'fixed'
        document.body.style.left = '0'
        document.body.style.right = '0'
        document.body.style.top = '0'
        document.body.style.bottom = '0'
        window.scroll({
          top: temporalScrollPosition,
          left: 0,
          behavior: 'smooth',
        })
      }
    } else {
      document.body.style.position = 'relative'
      window.scroll({
        top: temporalScrollPosition,
        left: 0,
        behavior: 'smooth',
      })
    }
  }, [isInputFocused])

  return (
    <Box
      as="header"
      borderColor="transparent"
      borderBottomWidth="1px"
      id="global-header-mobile"
    >
      <Container
        bg="white"
        py={4}
        maxW="container.xl"
        borderBottomWidth="2px"
        borderBottomColor={'shading.200'}
      >
        <Stack spacing="4" direction="column" justify="space-between">
          <Stack spacing="1">
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" justifyContent="start">
                <MegaDrawer data={headerMenu} />
                <NextLink
                  href={path.getHome()}
                  passHref
                  aria-label={intl.formatMessage({
                    id: 'ariaLabel.home',
                  })}
                >
                  <Link display="flex">
                    <Logo height={30} />
                  </Link>
                </NextLink>
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Box mr={1} display="flex" alignItems="center">
                  <IconButton
                    icon={<FiSearch size={24} />}
                    aria-label={intl.formatMessage({
                      id: 'ariaLabel.search',
                    })}
                    variant="link"
                    onClick={() => setShowSearch(!showSearch)}
                  />
                </Box>
                <NextLink
                  href={path.getCart()}
                  passHref
                  aria-label={intl.formatMessage({
                    id: 'ariaLabel.cart',
                  })}
                >
                  <Link display="flex" ml={1}>
                    <FiShoppingCart
                      size={24}
                      aria-label={intl.formatMessage({ id: 'ariaLabel.cart' })}
                    />
                    <Box
                      transform="translateY(-10px)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="white"
                      fontSize="xs"
                      fontWeight="bold"
                      borderRadius="base"
                      bg={cartQuantity ? 'red.500' : 'transparent'}
                      width="auto"
                      h={4}
                      px={0.5}
                    >
                      {cartQuantity ? cartQuantity : ''}
                    </Box>
                  </Link>
                </NextLink>
              </Flex>
            </Flex>
          </Stack>
        </Stack>
      </Container>
      <Container
        bg="white"
        py={2}
        display={showSearch ? 'block' : 'none'}
        maxW={'100%'}
        borderBottomWidth="1px"
        borderBottomColor="shading.200"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <InputGroup width={'full'}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="shading.400" boxSize="5" />
            </InputLeftElement>
            <Input
              value={searchText}
              fontSize="base"
              bg="shading.100"
              placeholder={headerData?.fields?.searchText}
              onChange={handleSearch}
              onFocus={() => {
                setTemporalScrollPosition(window.pageYOffset)
                setIsInputFocused(true)
              }}
              aria-label={intl.formatMessage({
                id: 'ariaLabel.search',
              })}
              onBlur={() => {
                setIsInputFocused(false)
              }}
              onKeyDown={handleOnKeyPress}
              _placeholder={{
                color: 'shading.400',
                fontWeight: '400',
                fontSize: 'base',
              }}
            />
          </InputGroup>
        </Box>
      </Container>
    </Box>
  )
}

export default HeaderMobile
