import { AxiosInstance } from 'axios'

export const deleteCustomCartItem = async (
  httpClient: AxiosInstance,
  accessToken: string,
  cartId: string,
  itemId: string
): Promise<boolean> => {
  try {
    await httpClient.delete(`/v2/carts/${cartId}/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return true
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return false
  }
}
