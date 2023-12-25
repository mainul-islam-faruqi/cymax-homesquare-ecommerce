import { AxiosInstance } from 'axios'

export const deleteCartDiscount = async (
  httpClient: AxiosInstance,
  accessToken: string,
  cartId: string,
  promoCode: string
): Promise<boolean> => {
  try {
    // Used request instead of delete as "data" is a required field.
    await httpClient.request({
      url: `/v2/carts/${cartId}/discounts/${promoCode}`,
      method: 'delete',
      data: {
        data: {},
      },
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
