import {
  NEXT_PUBLIC_AMAZON_MERCHANT_ID,
  NEXT_PUBLIC_AMAZON_PAY_PUBLIC_KEY_ID,
} from '@modules/app'
import axios from 'axios'

export const amazonPayButtonConfig = (
  payload: string,
  signature?: string,
  amount?: number
) => ({
  merchantId: NEXT_PUBLIC_AMAZON_MERCHANT_ID,
  publicKeyId: NEXT_PUBLIC_AMAZON_PAY_PUBLIC_KEY_ID,
  ledgerCurrency: 'USD',
  checkoutLanguage: 'en_US',
  productType: 'PayAndShip',
  placement: 'Cart',
  buttonColor: 'Gold',
  //This add in order to avoid CORS errros on console.
  estimatedOrderAmount: { amount: amount ?? 0, currencyCode: 'USD' },
  createCheckoutSessionConfig: {
    payloadJSON: payload,
    signature,
  },
})

export const generatePayloadAndSignature = async (cartId: string) => {
  const baseURL = window != null ? window.location.origin : ''
  const review_url = `${baseURL}/checkout/amazonReturn?success=true`

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_EP_MIDDLEWARE_URL}/api/amazon-pay/payload`,
      {
        checkoutReviewReturnUrl: review_url,
        cartId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return true
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error generating Amazon payload and signature: ', e)
    return e
  }
}
