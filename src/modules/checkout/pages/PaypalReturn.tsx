import { paths } from '@modules/app'
import { Loader, usePaypalPaymentConfirmation } from '@modules/checkout'
import { useToast } from '@modules/ui'
import { useElasticPath } from '@myplanetdigital/elasticpath'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

export const PaypalReturn = () => {
  const router = useRouter()
  const toast = useToast()
  const intl = useIntl()
  const { paypalConfirmation, error } = usePaypalPaymentConfirmation()
  const { accessToken, customerToken } = useElasticPath()
  const [isProcessing, setIsProcessing] = useState(true)

  // Confirm Paypal payment in EP when accessToken is ready
  useEffect(() => {
    const confirm = async () => {
      await paypalConfirmation()
    }
    if (paypalConfirmation != null && isProcessing && accessToken !== '') {
      confirm().finally(() => setIsProcessing(false))
    }
  }, [paypalConfirmation, isProcessing, accessToken, customerToken])

  // Handle Paypal confirmation result
  useEffect(() => {
    if (!isProcessing) {
      if (error != null && error !== '') {
        toast({
          status: 'error',
          title: intl.formatMessage({ id: 'checkout.paypalErrorTitle' }),
          description: intl.formatMessage({
            id: 'checkout.paypalErrorDescription',
          }),
        })
        router.replace(paths.CART)
      } else {
        router.replace(paths.CHECKOUT_ORDER_CONFIRMATION)
      }
    }
  }, [isProcessing, error, router, toast, intl])

  return <Loader />
}
