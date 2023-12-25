import { Grid, GridItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { CheckoutTemplateProps } from '../CheckoutTemplate'
import { OpenPathForm, Sidebar } from '../components'

import { paths } from '@modules/app'
import { useGtmPageViewCheckout } from '@modules/gtm'
import { useCart } from '@myplanetdigital/elasticpath'
import dynamic from 'next/dynamic'

const DynamicCheckoutTemplate = dynamic<CheckoutTemplateProps>(
  () => import('../CheckoutTemplate').then((res) => res.CheckoutTemplate),
  { ssr: false }
)

export const CreditCardPage: React.FC = () => {
  const { cart } = useCart()
  const router = useRouter()

  useGtmPageViewCheckout()

  useEffect(() => {
    if (!cart.isLoading && cart.isEmpty) {
      router.replace(paths.HOME)
    }
  }, [cart, router])

  if (cart.isLoading || cart.isEmpty) {
    return null
  }

  return (
    <DynamicCheckoutTemplate>
      <Grid
        templateColumns={['1fr', null, null, '1fr 42%']}
        pt={{ base: '2', md: '8' }}
        gap="10"
      >
        <GridItem>
          <OpenPathForm />
        </GridItem>
        <GridItem
          display={{ base: 'none', md: 'initial' }}
          marginTop="16"
          paddingTop="1.5"
        >
          <Sidebar />
        </GridItem>
      </Grid>
    </DynamicCheckoutTemplate>
  )
}
