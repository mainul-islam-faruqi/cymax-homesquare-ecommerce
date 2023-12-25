import { ELASTIC_PATH_CLIENT_ID, ELASTIC_PATH_HOST } from '@modules/app'
import { axiosCreateClient, getAuthHeaders } from '@myplanetdigital/elasticpath'
import { ELASTIC_PATH_CLIENT_SECRET } from '@modules/server'
import { clientCredentialsTokenFetchService } from '../auth'

export const useEPGetNodeKey = `useEPGetNodeKey`

export const fetchHierarchyById = async (hierarchyId?: string) => {
  const httpClient = axiosCreateClient({
    host: ELASTIC_PATH_HOST,
  })
  try {
    const clientCredentialsToken = await clientCredentialsTokenFetchService({
      httpClient,
      params: {
        client_id: ELASTIC_PATH_CLIENT_ID,
        client_secret: ELASTIC_PATH_CLIENT_SECRET,
      },
    })

    const response = await httpClient.get(
      `/catalog/hierarchies/${hierarchyId}`,
      {
        headers: {
          ...getAuthHeaders({
            accessToken: clientCredentialsToken?.access_token,
          }),
        },
      }
    )
    return response.data?.data?.attributes ?? null
  } catch (e) {
    // eslint-disable-next-line no-console
    //console.error('Error while fetching EP hierarchy', e)
    return e
  }
}
