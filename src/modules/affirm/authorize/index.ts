import { AFFIRM_API_BASE_URL } from '@modules/app'
import axios, { AxiosRequestConfig } from 'axios'
import { AuthorizeRequestBody } from './types'
export * from './types'

const AFFIRM_KEYS = {
  SECRET: process.env.AFFIRM_SECRET_KEY ?? '',
  PUBLIC: process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY_ID ?? '',
}

const AXIOS_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: AFFIRM_KEYS.PUBLIC,
    password: AFFIRM_KEYS.SECRET,
  },
}

export const authorize = async (data: AuthorizeRequestBody): Promise<void> => {
  await axios.post(
    `${AFFIRM_API_BASE_URL}/api/v2/charges`,
    { checkout_token: data.checkoutToken, order_id: data.orderId },
    AXIOS_CONFIG
  )
}
