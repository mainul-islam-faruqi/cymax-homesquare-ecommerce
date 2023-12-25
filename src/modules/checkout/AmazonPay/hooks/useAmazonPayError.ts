import { useToast } from '@chakra-ui/react'
import { paths } from '@modules/app'
import { KEY_MULTI_PAGE_QUERY } from '@modules/checkout/hooks'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

export const useAmazonPayError = () => {
  const intl = useIntl()
  const toast = useToast()
  const router = useRouter()

  const amazonPayErrorMessage = useCallback(() => {
    const isAmazonPayCartFlux =
      window.localStorage.getItem(KEY_MULTI_PAGE_QUERY) === 'null'

    toast({
      position: 'top',
      status: 'error',
      title: intl.formatMessage({
        id: 'checkout.payment.amazon.middleware.checkoutError.title',
      }),
      description: intl.formatMessage(
        {
          id: 'checkout.payment.amazon.middleware.checkoutError.description',
        },
        { page: isAmazonPayCartFlux ? 'cart' : 'payment' }
      ),
    })

    setTimeout(() => {
      router.replace(isAmazonPayCartFlux ? paths.CART : paths.CHECKOUT_PAYMENT)
    }, 1500)
  }, [intl, router, toast])

  return { amazonPayErrorMessage }
}
