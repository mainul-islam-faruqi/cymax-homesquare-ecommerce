import { paths } from '@modules/app'
import { EpCustomerToken, useElasticPath } from '@myplanetdigital/elasticpath'
import { useQuery } from 'react-query'
import { login } from "../../gtm/login/index"
import {
  fetchTokenFromOidcData,
  generateRedirectUri
} from '../Utilities/OidcUtilities'

export const useGetCustomerToken = (
  isReady?: boolean,
  authorizationCode?: string,
  codeVerifierCache?: string
) => {
  const { httpClient, headers, accessToken, setCustomerToken } =
    useElasticPath()

  const query = useQuery(
    ['useCustomerLogin'], // Same key that Composable uses
    async () => {
      return await fetchTokenFromOidcData({
        httpClient,
        headers,
        accessToken,
        authorizationCode: authorizationCode as string,
        codeVerifier: codeVerifierCache as string,
        redirectUri: generateRedirectUri(),
      })
    },
    {
      keepPreviousData: true,
      enabled: Boolean(isReady && accessToken),
      onSuccess: (res: any) => {
        login({
          loginstatus: "loggedin",
          page_details: window?.localStorage.getItem('destination') || paths.ACCOUNT_ADDRESS
        });
        const customerData = res?.data?.data as EpCustomerToken
        if (customerData?.token) {
          setCustomerToken(customerData)
        }
      },
      onError: (error) => {
        login({
          loginstatus: "logging failure",
          page_details: window?.localStorage.getItem('destination') || paths.ACCOUNT_ADDRESS
        });
        // Handle your login failure here
      },
    }
  )

  return { customerData: query?.data?.data?.data, isLoading: query?.isLoading }
}
