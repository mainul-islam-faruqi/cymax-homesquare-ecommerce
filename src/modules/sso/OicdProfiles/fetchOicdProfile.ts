import { EpServiceDeps, getAuthHeaders } from '@myplanetdigital/elasticpath'
import { OicdProfilesResponse } from './type'

interface FetchOicdProfileProps {
  authRealmID?: string
}

export const fetchOicdProfiles = async ({
  customerToken,
  httpClient,
  headers,
  accessToken,
  authRealmID,
}: FetchOicdProfileProps & EpServiceDeps): Promise<OicdProfilesResponse> => {
  return await httpClient.get(
    `/v2/authentication-realms/${authRealmID}/oidc-profiles/`,
    {
      headers: {
        ...headers,
        ...getAuthHeaders({
          accessToken,
          customerToken,
        }),
      },
    }
  )
}
