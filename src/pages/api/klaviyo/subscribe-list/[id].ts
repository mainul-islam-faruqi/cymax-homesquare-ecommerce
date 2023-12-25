import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { id } = req.query
    const KLAVIYO_API_PRIVATE_API_KEY = process.env.KLAVIYO_API_PRIVATE_API_KEY
    const url = `https://a.klaviyo.com/api/v2/list/${id}/subscribe?api_key=${KLAVIYO_API_PRIVATE_API_KEY}`

    try {
      const response = await axios.post(
        url,
        {
          profiles: req.body,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      res.status(200).send(response?.data)
    } catch (error) {
      const status = (error as any)?.response?.status
      const message = (error as any)?.response?.data
      console.error('Error while subscribing to list', status, message)

      res.status(status).send({ message: 'Error while subscribing to list' })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    res.end()
  }
}
