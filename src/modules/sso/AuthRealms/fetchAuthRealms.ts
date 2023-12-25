import { EpServiceDeps, getAuthHeaders } from '@myplanetdigital/elasticpath'
import { authRealmsResponse } from './types'

export const fetchAuthRealms = async ({
  httpClient,
  headers,
  accessToken,
}: EpServiceDeps): Promise<authRealmsResponse> => {
  const authHeaders = getAuthHeaders({ accessToken })
  return await httpClient.get(`/v2/settings/customer-authentication/`, {
    headers: {
      ...headers,
      ...authHeaders,
    },
  })
}
