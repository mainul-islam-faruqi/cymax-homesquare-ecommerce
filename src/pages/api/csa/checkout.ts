import { ELASTIC_PATH_HOST } from '@modules/app'
import { sanitizeElasticPathId } from '@modules/utilities/sanitizers'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { headers, body } = req
      const cartId = body?.cartId as string

      const sanitizedCartId = sanitizeElasticPathId(cartId)

      if (!sanitizedCartId) {
        throw new Error('Invalid cart id')
      }

      const accessToken = headers['authorization']?.split(' ')[1]
      const accountMemberHeader = 'ep-account-management-authentication-token'
      const accountMemberToken = (headers[accountMemberHeader] as string) ?? ''

      const response = await axios.post(
        `https://${ELASTIC_PATH_HOST}/v2/carts/${sanitizedCartId}/checkout`,
        {
          data: {
            ...body.data,
          },
        },
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
      console.error('Error while placing the order', err.response)
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    res.end()
  }
}
