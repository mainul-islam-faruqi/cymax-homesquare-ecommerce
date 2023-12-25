import { Grid, GridItem, useMediaQuery } from '@chakra-ui/react'
import { useCart } from '@myplanetdigital/elasticpath'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { CheckoutTemplateProps } from '../CheckoutTemplate'
import { Payment, Sidebar } from '../components'

import { useGtmPageViewCheckout } from '@modules/gtm'
import dynamic from 'next/dynamic'

const DynamicCheckoutTemplate = dynamic<CheckoutTemplateProps>(
  () => import('../CheckoutTemplate').then((res) => res.CheckoutTemplate),
  { ssr: false }
)

export const PaymentInformationPage: React.FC = () => {
  const { cart } = useCart()
  const router = useRouter()
  const [isValueLess960] = useMediaQuery('(max-width: 960px)')

  useGtmPageViewCheckout()

  useEffect(() => {
    if (!cart.isLoading && cart.isEmpty) {
      router.replace('/cart')
    }
  }, [cart, router])

  if (cart.isLoading || cart.isEmpty) {
    return null
  }

  return (
    <DynamicCheckoutTemplate>
      <NextSeo title="Checkout-Delivery" noindex nofollow />
      <Grid
        templateColumns={isValueLess960 ? '1fr' : '1fr 42%'}
        pt={isValueLess960 ? '2' : '8'}
        gap="10"
      >
        <GridItem>
          <Payment />
        </GridItem>
        {!isValueLess960 && (
          <GridItem marginTop="16" paddingTop="1.5">
            <Sidebar />
          </GridItem>
        )}
      </Grid>
    </DynamicCheckoutTemplate>
  )
}
