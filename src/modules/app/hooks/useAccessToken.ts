import {
  EpAccessTokenInterface,
  useElasticPath,
} from '@myplanetdigital/elasticpath'
import { QueryClient, useQuery, useQueryClient } from 'react-query'

const REFETCH_INTERVAL_SECONDS = 900 * 1000 //15 minutes

export const useAccessToken = () => {
  const { accessToken } = useElasticPath()
  const queryClient = useQueryClient()
  const { data, refetch, isLoading, isSuccess } = useQuery(
    ['useCustomAccessToken'],
    () => fetchData({ accessToken, queryClient }),
    {
      keepPreviousData: false,
      enabled: !!accessToken,
      //The refetch will be triggered every 15 minutes even if the tab is in the background
      //With this, we can keep the token updated
      refetchIntervalInBackground: true,
      refetchInterval: REFETCH_INTERVAL_SECONDS,
    }
  )

  return { data, refetch, isLoading, isSuccess }
}

/**
 * Returns an initial data if useAccessToken is not yet cached.
 * @param accessToken EP access token
 * @returns EpAccessTokenInterface
 */

type FetchDataProps = {
  accessToken: string
  queryClient: QueryClient
}

const fetchData = ({
  accessToken,
  queryClient,
}: FetchDataProps): EpAccessTokenInterface => {
  const initialData = accessTokenInitialData(accessToken)
  const data = queryClient.getQueryData(['useAccessToken'])
  //Invalidate the data to trigger a new refetch and set the last version of this token
  queryClient.invalidateQueries(['useAccessToken'])
  return (data ?? initialData) as EpAccessTokenInterface
}

/**
 * Initial data for useAccessToken
 * @param accessToken EP access Token
 * @returns EpAccessTokenInterface
 */
const accessTokenInitialData = (
  accessToken: string
): EpAccessTokenInterface => {
  return {
    access_token: accessToken,
    expires: Math.round(Date.now() / 1000),
    expires_in: 500,
    identifier: 'implicit',
    token_type: 'Bearer',
  }
}
