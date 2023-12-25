import { OIDC_PROVIDER_NAME } from '@modules/app'
import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { updateToken } from '@modules/ep/auth/utils'
import {
  EpAccessTokenInterface,
  useElasticPath,
  useUser,
} from '@myplanetdigital/elasticpath'
import { useQuery } from 'react-query'
import { fetchAuthRealms } from '../AuthRealms/fetchAuthRealms'
import { fetchOicdProfiles } from '../OicdProfiles/fetchOicdProfile'
import { generateOidcLoginRedirectUrl } from '../Utilities/OidcUtilities'

export const useOidcProvider = () => {
  const { httpClient, headers, customerToken } = useElasticPath()
  const { data, refetch } = useAccessToken()

  const { token: csaToken } = useCsa()
  const { customer } = useUser()

  const query = useQuery(
    ['useOicdProvider'],
    async () => {
      const accessToken = await updateToken(
        refetch,
        data as EpAccessTokenInterface
      )
      const { data: authRealmsResponse } = await fetchAuthRealms({
        httpClient,
        headers,
        accessToken,
      })
      const { data: realmsData } = authRealmsResponse
      const authRealmID =
        realmsData?.relationships['authentication-realm']?.data?.id ?? null
      const { client_id } = realmsData?.meta

      const profiles = await fetchOicdProfiles({
        customerToken: customerToken?.token,
        httpClient,
        headers,
        accessToken,
        authRealmID,
      })
      const providerProfile = profiles?.data?.data?.find(
        (profile) => profile.name === OIDC_PROVIDER_NAME
      )
      const providerAuthorizationEndpoint =
        providerProfile?.links?.['authorization-endpoint']
      const providerAuthorizationUrl =
        providerAuthorizationEndpoint && !customer && !csaToken
          ? await generateOidcLoginRedirectUrl(
              providerAuthorizationEndpoint,
              client_id
            )
          : ''

      const issuerUrl = providerProfile?.meta?.issuer

      return {
        providerUrl: providerAuthorizationUrl,
        issuerUrl,
      }
    },
    {
      keepPreviousData: true,
      enabled: Boolean(data),
    }
  )

  return {
    providerUrl: query?.data?.providerUrl,
    issuerUrl: query?.data?.issuerUrl,
    refetch: query?.refetch,
  }
}
