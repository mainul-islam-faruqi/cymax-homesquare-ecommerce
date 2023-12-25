import { Flex, Spinner, useToast } from '@chakra-ui/react'
import { paths } from '@modules/app/paths'
import { useOidcProvider } from '@modules/sso/Hooks/useOidcProvider'
import { NextSeo } from 'next-seo'
import { NextRouter, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useCsa } from '../CsaLoginPage/hooks'

export const CustomerLoginPage = () => {
  const intl = useIntl()
  const toast = useToast()
  const { providerUrl, refetch } = useOidcProvider()
  const router = useRouter()
  const { token, isLoading } = useCsa()

  const title = intl.formatMessage({ id: 'account.login.title' })

  handleSsoCancel(router)

  useEffect(() => {
    if (!isLoading) {
      if (token) {
        toast({
          position: 'top',
          status: 'warning',
          description: intl.formatMessage({ id: 'csa.validation.login' }),
        })
        router.push(paths.HOME)
      } else if (typeof window !== 'undefined') {
        const loginInit = window?.localStorage.getItem('loginInit') || false
        if (loginInit !== 'true') {
          if (providerUrl) {
            window?.localStorage.setItem('loginInit', 'true')
            router.push(providerUrl)
          } else {
            refetch()
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerUrl, isLoading])

  useEffect(() => {}, [isLoading])

  return (
    <Flex w="100%" justifyContent="center" alignItems="center" py={20}>
      <NextSeo title={title} noindex nofollow />
      <Spinner />
    </Flex>
  )
}

const handleSsoCancel = (router: NextRouter) => {
  if (typeof window !== 'undefined') {
    const loginInit = window?.localStorage.getItem('loginInit') || false
    const destination =
      window?.localStorage.getItem('destination') || paths.HOME

    const checkout_paths = [
      paths.CHECKOUT_LOGIN,
      paths.CHECKOUT_DELIVERY,
      paths.CHECKOUT_ORDER_CONFIRMATION,
      paths.CHECKOUT_PAYMENT,
    ]

    if (loginInit === 'true') {
      if (checkout_paths.includes(destination)) {
        // If user started login proccess inside one of the checkout pages
        // and canceled okta login, redirects back to cart.
        router.push(paths.CART)
      } else {
        router.push(destination)
      }
    }
  }
}
