import { PASSWORD_PROFILE_ID } from '@modules/app/constants'
import { EpServiceDeps } from '@modules/ep'
import { getAuthHeaders, useElasticPath } from '@myplanetdigital/elasticpath'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import { FormData } from '..'
import { isValidToken } from '../utils'
import {
  AccountMemberData,
  EpAccountMemberResponse,
  EpResponseData,
  PublicProfileAccessToken,
} from './types'

const BASE_URI = '/v2/account-members/tokens'
export const KEY_CSA_TOKEN = 'useCsaToken'
export const KEY_LOGIN_MUTATION = 'useMutationLogin'
export const KEY_TOKEN_QUERY = 'useQueryToken'
export const KEY_CSA_MEMBER_QUERY = 'useCsaMember'

export const accountMembershipLogin = async ({
  httpClient,
  headers,
  params,
  accessToken,
}: EpServiceDeps<FormData>): Promise<EpResponseData> => {
  return (
    await httpClient.post<EpResponseData>(
      BASE_URI,
      {
        data: {
          type: 'account_management_authentication_token',
          authentication_mechanism: 'password',
          password_profile_id: PASSWORD_PROFILE_ID,
          username: params?.email,
          password: params?.password,
        },
      },
      {
        headers: {
          ...headers,
          ...getAuthHeaders({
            accessToken,
          }),
        },
      }
    )
  ).data
}

export const useCsa = () => {
  const { httpClient, headers, accessToken } = useElasticPath()

  const fetchToken = () => {
    const tokenFromStorage = window.localStorage.getItem(KEY_CSA_TOKEN)
    if (!tokenFromStorage) {
      return null
    }

    const token = JSON.parse(tokenFromStorage)
    const isTokenValid = isValidToken(token)

    return isTokenValid ? token : csaLogout()
  }

  const tokenQuery = useQuery([KEY_TOKEN_QUERY], fetchToken)

  const loginMutation = useMutation(async ({ email, password }: FormData) => {
    const response = await accountMembershipLogin({
      httpClient,
      headers,
      params: {
        email,
        password,
      },
      accessToken,
    })
    //Save token in local storage
    const tokenFromStorage = JSON.stringify({
      ...response.data[0],
      account_member_id: response.meta.account_member_id,
    })

    window.localStorage.setItem(KEY_CSA_TOKEN, tokenFromStorage)
    //Set new value to query
    await tokenQuery.refetch()
  })

  const csaLogout = async () => {
    window.localStorage.removeItem(KEY_CSA_TOKEN)
    await tokenQuery.refetch()
  }

  return {
    login: loginMutation,
    isLoadingLogin: loginMutation.isLoading,
    token: tokenQuery.data as PublicProfileAccessToken,
    isLoading: tokenQuery.isLoading,
    logout: csaLogout,
  }
}

export const useGetCsaMember = () => {
  const { headers, accessToken } = useElasticPath()

  const csaMemberQuery = useQuery(
    [KEY_CSA_MEMBER_QUERY],
    async () => {
      const tokenFromStorage = window.localStorage.getItem(KEY_CSA_TOKEN)
      if (!tokenFromStorage) {
        return null
      }
      const csaToken = JSON.parse(tokenFromStorage) as PublicProfileAccessToken

      //Own api route
      const csaAccountMember = (
        await axios.get<EpAccountMemberResponse>(
          `/api/csa/account-member/${csaToken.account_member_id}`,
          {
            headers: {
              ...headers,
              Authorization: `Bearer ${accessToken}`,
              'EP-Account-Management-Authentication-Token': csaToken?.token,
            },
          }
        )
      ).data
      return csaAccountMember.data
    },
    { enabled: Boolean(accessToken) }
  )

  return {
    csaMember: csaMemberQuery.data as AccountMemberData | null,
    isLoading: csaMemberQuery.isLoading,
  }
}
