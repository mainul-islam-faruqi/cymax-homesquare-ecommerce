import { Flex, Spinner } from '@chakra-ui/react'
import { paths } from '@modules/app'
import { useUser } from '@myplanetdigital/elasticpath'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGetCustomerToken } from './Hooks/useGetCustomerToken'

export const OidcHandler = () => {
  const router = useRouter()
  const [localCodeVerifier, setLocalCodeVerifier] = useState('')
  const [queryCodeVerifier, setQueryCodeVerifier] = useState('')

  const [oidcDataReady, setOidcDataReady] = useState(false)
  const { customerData } = useGetCustomerToken(
    oidcDataReady,
    queryCodeVerifier,
    localCodeVerifier
  )
  const { customer, isLoading: isComposableUserLoading } = useUser()

  useEffect(() => {
    if (router.isReady && !isComposableUserLoading) {
      const localCode = localStorage.getItem('code_verifier') || ''
      const localState = localStorage.getItem('state') || ''
      const queryState = router?.query?.state?.toString() || ''
      const queryCode = router?.query?.code?.toString() || ''

      setLocalCodeVerifier(localCode)
      setQueryCodeVerifier(queryCode)

      if (
        queryCodeVerifier &&
        queryState &&
        localState &&
        localCodeVerifier &&
        !oidcDataReady
      ) {
        if (queryState === localState) {
          console.info(
            'SSO Login success: Data received does match the stored data'
          )
          setOidcDataReady(true)
        } else {
          console.error(
            'SSO Login error: Data received does not match the stored data'
          )
        }
      }

      if (customer) {
        const destination =
          window?.localStorage.getItem('destination') || paths.ACCOUNT_ADDRESS
        router.replace(destination)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    router.isReady,
    queryCodeVerifier,
    localCodeVerifier,
    oidcDataReady,
    customer,
    isComposableUserLoading,
  ])

  return (
    <Flex w="100%" justifyContent="center" alignItems="center" py={20}>
      <Spinner />
    </Flex>
  )
}
