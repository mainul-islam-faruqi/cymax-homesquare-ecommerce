import { Box, BoxProps, Skeleton } from '@chakra-ui/react'
import { orderSummaryData } from '@modules/app/utils'
import { useCart } from '@myplanetdigital/elasticpath'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { amazonPayButtonConfig } from './helpers'
import { usePayloadAndSignature } from './hooks/usePayloadAndSignature'

type AmazonPayButtonProps = {
  buttonProps?: BoxProps
  loadingProps?: BoxProps
  id: string
}

export const AmazonPayButton = ({
  buttonProps,
  loadingProps,
  id,
}: AmazonPayButtonProps) => {
  const { payload, signature } = usePayloadAndSignature()
  const [amazonDataAvailable, setAmazonDataAvailable] = useState(false)
  const { cart } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      if (window != null) {
        if (signature && payload && cart && !amazonDataAvailable) {
          const { subtotal } = orderSummaryData(cart)
          await window.amazon?.Pay?.renderButton(
            `#${id}`,
            amazonPayButtonConfig(
              payload,
              signature,
              parseFloat((subtotal?.amount! / 100).toFixed(2))
            )
          )
          setAmazonDataAvailable(true)
        }
      }
    }
    fetchData()
  }, [signature, payload, amazonDataAvailable, cart])

  return (
    <>
      <Script
        defer
        type="text/javascript"
        src="https://static-na.payments-amazon.com/checkout.js"
      />
      <Box
        id={id}
        height="64px !important"
        marginTop={6}
        display={amazonDataAvailable ? 'block' : 'none'}
        {...buttonProps}
      />
      <Skeleton
        id="AmazonPayLoading"
        marginTop={6}
        height="42px"
        display={amazonDataAvailable ? 'none' : 'block'}
        {...loadingProps}
      />
    </>
  )
}
