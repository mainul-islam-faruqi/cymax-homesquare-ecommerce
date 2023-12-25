import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Drawer,
  Flex,
  HStack,
  Link,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import { Logo, paths } from '@modules/app'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { formatMoney, orderSummaryData } from '@modules/app/utils'
import { CheckoutHeaderTop } from '@modules/checkout'
import { OrderDrawer } from '@modules/checkout/components/OrderDrawer'
import { EpCartItemInterface, useCart } from '@modules/ep'
import { useComposable } from '@myplanetdigital/base'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { BiSupport } from 'react-icons/bi'
import { useIntl } from 'react-intl'
import { Order } from '../OrderConfirmation/types'
import { CheckoutTabs } from './CheckoutTabs'

export interface CheckoutHeaderInterface {
  disableSteps?: boolean
  cartItems?: EpCartItemInterface[]
  order?: Order
}

export const CheckoutHeader: React.FC<CheckoutHeaderInterface> = ({
  cartItems,
  disableSteps = false,
  order,
}) => {
  const { cart } = useCart()
  const intl = useIntl()
  const { path } = useComposable()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { asPath } = useRouter()
  const [isValueLess960] = useMediaQuery('(max-width: 960px)')
  const { token: csaToken } = useCsa()

  const orderQuantity = useMemo(() => {
    return order?.items?.reduce((acc, curr) => {
      if (curr?.custom_inputs && !curr?.sku?.includes('shipping_')) {
        return acc + curr?.quantity
      }

      return acc
    }, 0)
  }, [order])
  const isCheckoutPage = asPath === paths.CHECKOUT_PAYMENT

  const { total_without_tax, total } = useMemo(
    () => orderSummaryData(cart),
    [cart]
  )

  useEffect(() => {
    const closeMenuIfScreenIsLargeEnough = () => {
      if (window.innerWidth > 960) {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('resize', closeMenuIfScreenIsLargeEnough)
    }
    return () =>
      window.removeEventListener('resize', closeMenuIfScreenIsLargeEnough)
  }, [isOpen, onClose])

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      borderBottom="1px"
      borderColor="shading.200"
    >
      <CheckoutHeaderTop />
      <Flex backgroundColor="theme.background" justifyContent="center">
        <Container maxW="container.xl" p={isValueLess960 ? '0' : '3'}>
          {!isValueLess960 && (
            <Flex justifyContent="space-between" alignItems="center">
              <HStack spacing="10">
                <NextLink
                  href={path.getHome()}
                  passHref
                  aria-label={intl.formatMessage({ id: 'ariaLabel.home' })}
                >
                  <Link cursor="pointer" display="flex" alignItems="center">
                    <Logo height={28} />
                    {csaToken && (
                      <Box marginLeft={3.5}>
                        <BiSupport size={20} />
                      </Box>
                    )}
                  </Link>
                </NextLink>
                <HStack spacing="4">
                  <CheckoutTabs disableSteps={disableSteps} />
                </HStack>
              </HStack>
              {asPath !== paths.OPEN_PATH_FORM && (
                <NextLink
                  href={path.getCart()}
                  passHref
                  aria-label={intl.formatMessage({
                    id: 'checkout.backToShopping',
                  })}
                >
                  <Link fontWeight="extrabold">
                    {intl.formatMessage({ id: 'checkout.backToShopping' })}
                  </Link>
                </NextLink>
              )}
            </Flex>
          )}
          {/* Mobile only */}
          {isValueLess960 && (
            <>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                borderBottom="1px"
                borderColor="shading.200"
              >
                <CheckoutTabs disableSteps={disableSteps} />
              </Flex>
              <Flex px="4" py="3" justifyContent="space-between">
                <Button
                  variant="link"
                  fontWeight="normal"
                  onClick={onOpen}
                  fontSize="desktop.bodySM"
                >
                  {intl.formatMessage({ id: 'checkout.orderSummary' })} (
                  {order ? orderQuantity : cart?.quantity}
                  ) <ChevronDownIcon fontSize="xl" />
                </Button>
                <Text fontSize="desktop.bodySM">
                  {order
                    ? formatMoney(order?.meta.display_price.with_tax.amount)
                    : formatMoney(
                        isCheckoutPage
                          ? total?.amount!
                          : total_without_tax?.amount!
                      )}
                </Text>
              </Flex>
              <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                <OrderDrawer
                  closeDrawer={onClose}
                  cartItems={cartItems}
                  order={order}
                />
              </Drawer>
            </>
          )}
        </Container>
      </Flex>
    </Box>
  )
}
