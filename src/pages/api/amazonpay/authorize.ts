import { NEXT_PUBLIC_EP_MIDDLEWARE_URL } from '@modules/app'
import { AuthorizeOrderProps, PaymentMethod } from '@modules/checkout'
import { updateEPOrder } from '@modules/server'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function authorizeAmazonOrder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const data: AuthorizeOrderProps = req.body
      // call EP middleware "authorize" endpoint
      const result = await axios.post(
        `${NEXT_PUBLIC_EP_MIDDLEWARE_URL}/api/amazon-pay/authorize`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      // Update order with payment_method and referral
      const updatedOrder = await updateEPOrder(data.orderId, {
        payment_method: PaymentMethod.AMAZON,
        referral: data.referral,
      })
      res.status(200).json(updatedOrder)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while authorizing amazon pay order', err)
      res.status(500).json({ statusCode: 500, message: (err as Error).message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    res.end()
  }
}
