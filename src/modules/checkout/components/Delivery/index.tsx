import { Spinner } from '@chakra-ui/react'
import { useMultiPageCheckout } from '@modules/checkout/hooks'
import { useCart, useUser } from '@myplanetdigital/elasticpath'
import { DeliveryComponent } from './component'

export const Delivery = () => {
  const { cartId, cart } = useCart()
  const { checkoutData, isLoading, saveData } = useMultiPageCheckout()
  const { customer, isLoading: customerIsLoading } = useUser()

  if (isLoading || cart.isLoading || customerIsLoading) {
    return <Spinner />
  }

  return (
    <DeliveryComponent
      data={checkoutData}
      saveData={saveData}
      cartId={cartId}
      customer={customer}
    />
  )
}
