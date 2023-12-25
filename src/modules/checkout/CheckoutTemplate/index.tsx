import { Container } from '@chakra-ui/react'
import { CheckoutHeader } from '@modules/checkout'
import React from 'react'
import { Order } from '../components/OrderConfirmation/types'

export interface CheckoutTemplateProps {
  disableSteps?: boolean
  children: React.ReactNode
  order?: Order
}

export const CheckoutTemplate: React.FC<CheckoutTemplateProps> = ({
  children,
  disableSteps,
  order,
}) => {
  return (
    <>
      <CheckoutHeader disableSteps={disableSteps} order={order} />
      <Container
        as="main"
        minH={{
          base: 'calc(100vh - 240px)',
          md: `calc(100vh - 130px)`,
        }}
        maxW="container.xl"
        py={{ base: '4', md: '8' }}
      >
        {children}
      </Container>
    </>
  )
}
