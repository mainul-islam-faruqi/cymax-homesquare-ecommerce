import { Box } from '@chakra-ui/react'
import { getSKUs } from '@modules/app/utils'
import { EpOrderSummary, OrderSummary } from '@modules/checkout'
import { useCart, useProductsByAttribute } from '@modules/ep'
import {
  EpFilterAttribute,
  EpFilterOperator,
} from '@myplanetdigital/elasticpath'
import React from 'react'
import { Order } from '../OrderConfirmation/types'

export const Sidebar: React.FC<{
  order?: Order
}> = ({ order }) => {
  const { cart } = useCart()
  const productSKUs = getSKUs(cart.data)
  const { productMap } = useProductsByAttribute({
    values: productSKUs,
    filterAttribute: EpFilterAttribute.SKU,
    filterOperator: EpFilterOperator.IN,
  })

  return (
    <Box position="sticky" top="20" bg="white">
      {order != null ? (
        <EpOrderSummary order={order} />
      ) : (
        <OrderSummary cart={cart} map={productMap} />
      )}
    </Box>
  )
}
