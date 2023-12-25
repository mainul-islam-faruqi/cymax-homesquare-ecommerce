import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const url =
  `${process.env.NEXT_PUBLIC_EP_MIDDLEWARE_URL}/api/taxjar/taxes` ||
  'https://cymax-homesquare-api-git-previewnode-cymax-team.vercel.app/api/taxjar/taxes'

interface TaxAddress {
  country: string
  zip: string
  city: string
  jurisdiction: string
  line1: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cartId, shippingAddress } = req.body as {
    cartId: string
    shippingAddress: TaxAddress
  }

  try {
    await axios.post(url, {
      cartId,
      shippingAddress,
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error while fetching taxes:', e)
    return res.status(204).end()
  }

  return res.status(200).end()
}
