import { getEPClientCredentials } from '@modules/server'
import { EpOrderInterface } from '@myplanetdigital/elasticpath'
import axios from 'axios'

export const updateEPOrder = async (
  orderId: string,
  data: any
): Promise<{ data: EpOrderInterface } | null> => {
  try {
    const clientCredentials = await getEPClientCredentials()
    await axios.put(
      `https://${process.env.NEXT_PUBLIC_ELASTIC_PATH_HOST}/v2/orders/${orderId}`,
      {
        data: {
          type: 'order',
          ...data,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${clientCredentials.access_token}`,
          'x-moltin-auth-store':
            process.env.NEXT_PUBLIC_ELASTIC_PATH_STORE_ID ?? '',
        },
      }
    )
    const epRes = await axios.get(
      `https://${process.env.NEXT_PUBLIC_ELASTIC_PATH_HOST}/v2/orders/${orderId}?include=items`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentials.access_token}`,
          'x-moltin-auth-store':
            process.env.NEXT_PUBLIC_ELASTIC_PATH_STORE_ID ?? '',
        },
      }
    )
    return epRes.data
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
  return null
}
