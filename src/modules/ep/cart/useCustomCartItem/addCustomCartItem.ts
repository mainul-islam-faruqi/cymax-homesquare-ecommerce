import { AxiosInstance } from 'axios'
import { EPCustomCartItemInterface } from '../types'

export const addCustomCartItem = async (
  httpClient: AxiosInstance,
  accessToken: string,
  cartId: string,
  item: EPCustomCartItemInterface
): Promise<boolean> => {
  try {
    await httpClient.post(
      `/v2/carts/${cartId}/items`,
      {
        data: item,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return true
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return false
  }
}
