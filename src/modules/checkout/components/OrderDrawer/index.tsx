import {
  CloseButton,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from '@chakra-ui/react'
import { getSKUs } from '@modules/app/utils'
import { EpOrderSummary } from '@modules/checkout/components/EpOrderSummary'
import { OrderSummary } from '@modules/checkout/components/OrderSummary'
import { EpCartItemInterface, useProductsByAttribute } from '@modules/ep'
import {
  EpFilterAttribute,
  EpFilterOperator,
  useCart,
} from '@myplanetdigital/elasticpath'
import { useIntl } from 'react-intl'
import { Order } from '../OrderConfirmation/types'

export const OrderDrawer: React.FC<{
  closeDrawer: () => void
  order?: Order
  cartItems?: EpCartItemInterface[]
}> = ({ closeDrawer, cartItems, order }) => {
  const intl = useIntl()

  const { cart } = useCart()

  const productSKUs = getSKUs(order ? cartItems : cart?.data)
  const { productMap } = useProductsByAttribute({
    values: productSKUs,
    filterAttribute: EpFilterAttribute.SKU,
    filterOperator: EpFilterOperator.IN,
  })

  return (
    <>
      <DrawerOverlay />
      <DrawerContent maxHeight="100%">
        <DrawerHeader
          borderBottomWidth="1px"
          borderBottomColor="gray.200"
          py={2}
          pr={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="desktop.body" fontWeight="bold">
            {intl.formatMessage({ id: 'checkout.orderSummary' })}
          </Text>
          <CloseButton right={4} top={3} onClick={() => closeDrawer()} />
        </DrawerHeader>
        <DrawerBody px="5">
          {order ? (
            <EpOrderSummary isDropDown order={order} />
          ) : (
            <OrderSummary isDropDown cart={cart} map={productMap} />
          )}
        </DrawerBody>
      </DrawerContent>
    </>
  )
}
