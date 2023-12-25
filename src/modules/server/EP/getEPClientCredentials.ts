import { ELASTIC_PATH_CLIENT_ID, ELASTIC_PATH_HOST } from '@modules/app'
import axios from 'axios'
import { stringify } from 'querystring'
import { ELASTIC_PATH_CLIENT_SECRET } from '@modules/server/server-config'

export type EPClientCredentialsType = {
  identifier: string
  expires: number
  access_token: string
}

// USE ONLY ON SERVER-SIDE. THE CLIENT CREDENTIALS SHOULD NEVER BE MADE AVIALABLE PUBLICLY
export const getEPClientCredentials =
  async (): Promise<EPClientCredentialsType> => {
    const result = await axios.post(
      `https://${ELASTIC_PATH_HOST}/oauth/access_token`,
      stringify({
        grant_type: 'client_credentials',
        client_id: ELASTIC_PATH_CLIENT_ID,
        client_secret: ELASTIC_PATH_CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    return result.data
  }
