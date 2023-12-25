import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionItem,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { useLogout } from '@modules/app/hooks/useLogout'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { paths } from '@modules/app/paths'
import { setRedirectDestination } from '@modules/sso/Utilities/OidcUtilities'
import { useComposable } from '@myplanetdigital/base'
import { useUser } from '@myplanetdigital/elasticpath'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { BiSupport } from 'react-icons/bi'
import { FiUser } from 'react-icons/fi'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { useIntl } from 'react-intl'
import { Logo } from '../Logo'
import { MegaDrawerItem } from './MegaDrawerItem'
import { MegaDrawerType } from './types'

export const MegaDrawer = ({ data }: MegaDrawerType) => {
  const { customer } = useUser()
  const { token: csaMember } = useCsa()
  const { logout } = useLogout()
  const intl = useIntl()
  const router = useRouter()
  const { path } = useComposable()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef() as
    | (React.RefObject<FocusableElement> & React.LegacyRef<HTMLButtonElement>)
    | undefined

  const handleLogout = () => {
    onClose()
    logout()
  }

  return (
    <>
      <IconButton
        icon={<HamburgerIcon fontSize={25} />}
        aria-label={intl.formatMessage({
          id: 'ariaLabel.openMegaDrawer',
        })}
        color="shading.900"
        bgColor="transparent"
        ref={btnRef}
        onClick={onOpen}
        border="0"
        mr="1"
      >
        {intl.formatMessage({
          id: 'ariaLabel.open',
        })}
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader position="relative">
            <DrawerCloseButton
              top="50%"
              transform={'translateY(-50%)'}
              right={4}
            />
            <NextLink href={path.getHome()} passHref>
              <Link>
                <Logo
                  height={30}
                  aria-label={intl.formatMessage({ id: 'ariaLabel.home' })}
                />
              </Link>
            </NextLink>
          </DrawerHeader>
          <DrawerBody
            display="flex"
            flexDir="column"
            justifyContent="space-between"
          >
            <Accordion allowToggle>
              {React.Children.toArray(
                data?.map((item) => (
                  // eslint-disable-next-line react/jsx-key
                  <AccordionItem>
                    <MegaDrawerItem item={item} closeAll={onClose} />
                  </AccordionItem>
                ))
              )}
            </Accordion>
            <Flex flexDir="column" pb={4}>
              {Boolean(customer) || Boolean(csaMember) ? (
                <>
                  <Button
                    display="flex"
                    alignItems="center"
                    variant="link"
                    aria-label={intl.formatMessage({
                      id: 'ariaLabel.account',
                    })}
                    fontWeight="normal"
                    onClick={() => {
                      router.push(
                        customer ? paths.ACCOUNT_ADDRESS : paths.CSA_DASHBOARD
                      ),
                        onClose()
                    }}
                    mb={6}
                  >
                    {customer ? (
                      <FiUser fontSize={17} />
                    ) : (
                      <BiSupport fontSize={17} />
                    )}
                    <Text as="span" ml="2">
                      {intl.formatMessage({
                        id: 'account.dashboard.title',
                      })}
                    </Text>
                  </Button>
                  <Button
                    display="flex"
                    alignItems="center"
                    as="a"
                    variant="link"
                    aria-label={intl.formatMessage({
                      id: 'ariaLabel.logout',
                    })}
                    fontWeight="normal"
                    onClick={handleLogout}
                  >
                    <RiLogoutBoxLine size={17} />
                    <Text as="span" ml="2">
                      {intl.formatMessage({ id: 'action.logout' })}
                    </Text>
                  </Button>
                </>
              ) : (
                <Button
                  display="flex"
                  alignItems="center"
                  variant="link"
                  aria-label={intl.formatMessage({
                    id: 'action.login',
                  })}
                  fontWeight="normal"
                  onClick={() => {
                    setRedirectDestination()
                    router.push(paths.LOGIN), onClose()
                  }}
                >
                  <FiUser size={17} />
                  <Text as="a" ml="2">
                    {intl.formatMessage({ id: 'action.login' })}
                  </Text>
                </Button>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
