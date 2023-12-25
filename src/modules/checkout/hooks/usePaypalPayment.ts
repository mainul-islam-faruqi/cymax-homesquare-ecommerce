import {
  CheckoutPaymentExtraDataBase,
  CheckoutPaymentMethodMutationParams,
  EpDisplayPriceValue,
  EpServiceDeps,
  getAuthHeaders,
  useElasticPath,
} from '@myplanetdigital/elasticpath'
import { useMutation, UseMutationResult } from 'react-query'

export interface EpPaymentPaypalExtraData {
  method?: string
}

export type PaypalMutation = UseMutationResult<
  unknown,
  unknown,
  CheckoutPaypalMethodMutationType<EpPaymentPaypalExtraData> & { order: any },
  unknown
>

interface EpPaypalGatewayResponse {
  data: {
    id: string
    client_parameters: {
      redirect_url: string
      cancel_url: string
    }
    type: 'transaction'
    reference: string
    gateway: string
    amount: number
    refunded_amount: number
    currency: string
    transaction_type: string
    status: 'complete'
    relationships: {
      order: {
        data: {
          type: 'order'
          id: string
        }
      }
    }
    meta: {
      display_price: EpDisplayPriceValue
      display_refunded_amount: {
        total: EpDisplayPriceValue
      }
      timestamps: {
        created_at: string
        updated_at: string
      }
    }
  }
}

export declare type CheckoutPaypalMethodMutationType<
  ExtraData extends CheckoutPaymentExtraDataBase = any
> = UseMutationResult<
  EpPaypalGatewayResponse,
  unknown,
  CheckoutPaymentMethodMutationParams<ExtraData>
>

export const usePaypalPayment = () => {
  const { httpClient, accessToken, customerToken, headers } = useElasticPath()

  const mutation: UseMutationResult<unknown, unknown, { order: any }, unknown> =
    useMutation(['usePaypalPayment'], async ({ order }) => {
      return await orderPaymentPaypalCreateService({
        httpClient,
        accessToken,
        customerToken: customerToken?.token,
        headers,
        params: {
          orderId: order.id,
        },
      })
    })

  return {
    paypalPayment: mutation,
  }
}

//https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/paying-for-an-order/paypal-express-checkout-payments.html#step-2-post-complete-the-payment
const orderPaymentPaypalCreateService = async ({
  httpClient,
  headers,
  params,
  accessToken,
  customerToken,
}: EpServiceDeps<
  EpPaymentPaypalExtraData & {
    orderId: any
  }
>) => {
  const orderId = params?.orderId
  const method = 'authorize'
  const baseURL = window != null ? window.location.origin : ''
  const return_url = `${baseURL}/checkout/paypalReturn?success=true`
  const cancel_url = `${baseURL}/checkout/paypalReturn?success=false`

  try {
    const response = await httpClient.post<EpPaypalGatewayResponse>(
      `/v2/orders/${orderId}/payments`,
      {
        data: {
          gateway: 'paypal_express_checkout',
          method,
          options: {
            description: 'Test description',
            soft_descriptor: 'integration test',
            application_context: {
              shipping_preference: 'SET_PROVIDED_ADDRESS',
              user_action: 'PAY_NOW',
              return_url,
              cancel_url,
            },
          },
        },
      },
      {
        headers: {
          ...headers,
          ...getAuthHeaders({ accessToken, customerToken }),
        },
      }
    )
    const data = response?.data?.data
    const transactionId = data?.id
    const redirectUrl = data?.client_parameters?.redirect_url

    localStorage.setItem('PENDING_PAYPAL_ORDER_ID', orderId || '')
    localStorage.setItem('PENDING_PAYPAL_TRANSACTION_ID', transactionId || '')

    window.open(redirectUrl, '_self')
    return response.data
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error while saving paypal auth info to EP', e)
    return e
  }
}
