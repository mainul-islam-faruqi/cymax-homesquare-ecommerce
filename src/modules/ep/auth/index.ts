import qs from 'qs'
import {
  EpServiceDeps,
  EpAccessTokenInterface,
  TokenIdentifier,
  ImplicitToken,
  ClientCredentialsToken,
} from './types'

type AuthServiceBaseDeps<T> = Required<
  Pick<EpServiceDeps<T>, 'httpClient' | 'params'>
>

type FetchClientCredentialsTokenServiceDeps = Omit<
  EpServiceDeps<{
    client_id: string
    client_secret?: string
  }>,
  'accessToken' | 'customerToken'
>

type FetchTokenServiceDeps<T> = AuthServiceBaseDeps<
  T extends ClientCredentialsToken
    ? Required<AuthServiceParams<T>>
    : AuthServiceParams<T>
>

type AuthServiceParams<T> = {
  client_id: string
  client_secret?: string
  grant_type?: T
}

type TokenFetchService = <T extends TokenIdentifier = ImplicitToken>(
  deps: FetchTokenServiceDeps<T>
) => Promise<EpAccessTokenInterface<T>>

export const tokenFetchService: TokenFetchService = async ({
  httpClient,
  params,
}) => {
  const { client_id, client_secret, grant_type = 'implicit' } = params
  const res = await httpClient.post(
    `/oauth/access_token`,
    qs.stringify({
      client_id,
      client_secret,
      grant_type,
    }),
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    }
  )
  return res.data
}

export const clientCredentialsTokenFetchService: TokenFetchService = async ({
  httpClient,
  params,
}: FetchClientCredentialsTokenServiceDeps) => {
  const res = await httpClient.post(
    `/oauth/access_token`,
    qs.stringify({
      client_id: params?.client_id,
      client_secret: params?.client_secret,
      grant_type: 'client_credentials',
    }),
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    }
  )

  return res.data
}
