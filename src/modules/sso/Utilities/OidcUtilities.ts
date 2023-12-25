import { paths } from '@modules/app'
import { EpCustomerToken } from '@modules/ep'
import { getAuthHeaders, useElasticPath } from '@myplanetdigital/elasticpath'
import Router from 'next/router'
import { useQuery } from 'react-query'
import {
  generateCodeVerifierAndS256Challenge,
  PkceParameters,
} from './PkceUtilities'
import { tokenFromOidcData } from './types'

export const OIDC = 'oidc'

interface CustomerData {
  data: {
    data: {
      token: string
      customer_id: string
    }
  }
}

const generateStateToken = () => {
  var array = new Uint8Array(20)
  const randomValues = window.crypto.getRandomValues(array)
  return getBase64URLEncodedOfString(randomValues.join(''))
}

const getBase64URLEncodedOfString = (str: string) => {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export const generateRedirectUri = () => {
  const oidcHandlerRoute = encodeURI(`${window.location.origin}/account/oidc`)
  return `${oidcHandlerRoute}`
}

export const generateOidcLoginRedirectUrl = (
  baseRedirectUrl: string,
  cId: string
): Promise<string> => {
  const stateToken = generateStateToken()
  localStorage.setItem('state', stateToken)

  return generateCodeVerifierAndS256Challenge().then(
    (pkceParameters: PkceParameters) => {
      localStorage.setItem('code_verifier', pkceParameters.codeVerifier)
      let url = new URL(baseRedirectUrl)
      url.searchParams.append('client_id', cId)
      url.searchParams.append('redirect_uri', generateRedirectUri())
      url.searchParams.append('state', stateToken)
      url.searchParams.append('response_type', 'code')
      url.searchParams.append('scope', 'openid email profile')
      url.searchParams.append('code_challenge_method', 'S256')
      url.searchParams.append('code_challenge', pkceParameters.codeChallenge)

      return url.toString()
    }
  )
}

export const getAuthorizationEndpointFromProfile = (profile: any): string => {
  let authorizationEndpoint =
    profile?.meta?.discovery_document?.authorization_endpoint
  return authorizationEndpoint.indexOf('?') >= 0
    ? `${authorizationEndpoint}&`
    : `${authorizationEndpoint}?`
}

export const fetchTokenFromOidcData = async ({
  httpClient,
  headers,
  accessToken,
  authorizationCode,
  redirectUri,
  codeVerifier,
}: tokenFromOidcData): Promise<CustomerData> => {
  const authHeaders = getAuthHeaders({ accessToken })

  return await httpClient.post(
    `/v2/customers/tokens`,
    {
      data: {
        type: 'token',
        authentication_mechanism: OIDC,
        oauth_authorization_code: authorizationCode,
        oauth_redirect_uri: redirectUri,
        oauth_code_verifier: codeVerifier,
      },
    },
    {
      headers: {
        ...headers,
        ...authHeaders,
      },
    }
  )
}

export const useGetCustomerToken = (
  isReady?: boolean,
  authorizationCode?: string,
  codeVerifierCache?: string
) => {
  const { httpClient, headers, accessToken, setCustomerToken } =
    useElasticPath()

  const query = useQuery(
    ['useCustomerLogin'], // Same key that Composable uses
    async () =>
      await fetchTokenFromOidcData({
        httpClient,
        headers,
        accessToken,
        authorizationCode: authorizationCode as string,
        codeVerifier: codeVerifierCache as string,
        redirectUri: generateRedirectUri(),
      }),
    {
      keepPreviousData: true,
      enabled: Boolean(isReady && accessToken),
      onSuccess: (res) => {
        const customerData = res?.data?.data as EpCustomerToken
        if (customerData.token) {
          setCustomerToken(customerData)
        }
      },
    }
  )

  return { customerData: query?.data?.data?.data, isLoading: query?.isLoading }
}

type setRedirectDestinationOptions = {
  path?: string
}

export const setRedirectDestination = (
  options?: setRedirectDestinationOptions
) => {
  if (typeof window !== 'undefined') {
    window?.localStorage.removeItem('destination')
    if (Router.pathname === paths.CHECKOUT_LOGIN) {
      window?.localStorage.setItem('destination', paths.CHECKOUT_DELIVERY)
    } else if (Router.pathname !== paths.CSA_LOGIN) {
      window?.localStorage.setItem(
        'destination',
        options?.path || Router.asPath
      )
    }
  }
}

export const clearLoginInit = (shouldClearRefinement: boolean) => {
  if (typeof window !== 'undefined') {
    if (
      Router.pathname !== paths.LOGIN &&
      Router.pathname !== paths.SSO_VALIDATION
    ) {
      window?.localStorage.removeItem('loginInit')

      // Clear search facets if not in a login route.
      if (
        Router.pathname !== paths.PROFILE &&
        Router.pathname !== paths.ACCOUNT_ADDRESS &&
        shouldClearRefinement
      ) {
        window?.localStorage.removeItem('storedRefinement')
      }
    }
  }
}
