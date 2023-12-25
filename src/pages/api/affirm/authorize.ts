import { authorize } from '@modules/affirm'
import { AuthorizeRequestBody } from '@modules/affirm/authorize/types'
import { NextApiRequest, NextApiResponse } from 'next'

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { checkout_token } = req.body
    const { order_id } = req.query
    const data: AuthorizeRequestBody = {
      checkoutToken: checkout_token,
      orderId: order_id as string,
    }
    try {
      await authorize(data)
      //TODO update order in order to change order's status,
      //middleware EP change is pending, EP team has to develop.
      res.redirect(`${APP_DOMAIN}/checkout/order-confirmation`)
    } catch (error: unknown) {
      console.log(error)
      res.redirect(`${APP_DOMAIN}/checkout/payment-information`)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    res.end()
  }
}
