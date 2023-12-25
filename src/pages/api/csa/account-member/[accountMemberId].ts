import { ELASTIC_PATH_HOST } from '@modules/app'
import { sanitizeElasticPathId } from '@modules/utilities/sanitizers'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { headers, query } = req
    const accountMemberId = query?.accountMemberId as string

    const sanitizedAccountMemberId = sanitizeElasticPathId(accountMemberId)

    if (!sanitizedAccountMemberId) {
      throw new Error('Invalid account member id')
    }

    const accessToken = headers['authorization']?.split(' ')[1]
    const accountMemberHeader = 'ep-account-management-authentication-token'
    const accountMemberToken = (headers[accountMemberHeader] as string) ?? ''

    const response = await axios.get(
      `https://${ELASTIC_PATH_HOST}/v2/account-members/${sanitizedAccountMemberId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'EP-Account-Management-Authentication-Token': accountMemberToken,
        },
      }
    )
    res.status(200).json({ ...response.data })
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(
      'Error while saving account Member Token result',
      err.response
    )
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
