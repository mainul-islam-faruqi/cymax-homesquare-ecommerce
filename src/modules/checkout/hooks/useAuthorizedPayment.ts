
import { EpOrderInterface } from '@modules/ep';
import {
  CheckoutPaymentExtraDataBase,
  CheckoutPaymentMethodMutationParams,
  EpDisplayPriceValue,
  EpServiceDeps,
  getAuthHeaders,
  useElasticPath
} from '@myplanetdigital/elasticpath';
import axios from 'axios';
import { useMutation, UseMutationResult } from 'react-query';
import { AffirmSuccess } from './useAffirmPayment';
interface EpGatewayResponse {
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
 
export declare type CheckoutMethodMutationType<
  ExtraData extends CheckoutPaymentExtraDataBase = any
> = UseMutationResult<
  EpGatewayResponse,
  unknown,
  CheckoutPaymentMethodMutationParams<ExtraData>
>
export const useAuthorizedPayment = () => {
  const { httpClient, accessToken, customerToken, headers } = useElasticPath()
 
  const mutation: UseMutationResult<
    unknown,
    unknown,
    { order: EpOrderInterface },
    unknown
  > = useMutation(['useAuthorizedPayment'], async ({ order }) => {
    return await orderPaymentCreateService({
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
    authorizedPayment: mutation,
  }
}
export const useAuthorizedAffirmPayment = () => {
  const { httpClient, accessToken, customerToken, headers } = useElasticPath()
 
  const mutation: UseMutationResult<
    unknown,
    unknown,
    { order: EpOrderInterface , success_object:AffirmSuccess },
    unknown
  > = useMutation(['useAuthorizedPayment'], async ({ order,success_object }) => {
    return await orderAffirmPaymentCreateService({
      httpClient,
      accessToken,
      customerToken: customerToken?.token,
      headers,
      params: {
        orderId: order.id,
        transactionId: success_object.checkout_token,
      },
    })
  })
 
  return {
    authorizedPayment: mutation,
  }
}
 
//https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/paying-for-an-order/paypal-express-checkout-payments.html#step-2-post-complete-the-payment
const orderPaymentCreateService = async ({
  httpClient,
  headers,
  params,
  accessToken,
  customerToken,
}: EpServiceDeps<{
  method?: string
  orderId: any
}>) => {
  const orderId = params?.orderId
  const method = 'authorize'
 
  try {
    const response = await httpClient.post<EpGatewayResponse>(
      `/v2/orders/${orderId}/payments`,
      {
        data: {
          gateway: 'manual',
          method,
        },
      },
      {
        headers: {
          ...headers,
          ...getAuthHeaders({ accessToken, customerToken }),
        },
      }
    )
 
    return response.data
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error while saving payment auth info to EP', e)
    return e
  }
}
 
 
 const orderAffirmPaymentCreateService = async ({
  headers,
  params,
  accessToken,
  customerToken,
}: EpServiceDeps<{
  orderId: string,
  transactionId?: string, // Optional in case not all orders will have this
}>) => {
  const orderId = params?.orderId;
  const transactionId = params?.transactionId;
  
  // Define your backend base URL
  const backendBaseUrl = process.env.NEXT_PUBLIC_EP_MIDDLEWARE_URL;
  const secretKey = process.env.NEXT_PUBLIC_AFFIRM_SECRET_KEY

  try {
    const response = await axios.post(
      `${backendBaseUrl}/api/affirm/authorize`, // Combine base URL with endpoint
      {
        transactionId,
        orderId,
        configuration: {
          secret_key: secretKey
        }
      },
      {
        headers: {          
          'Content-Type': 'application/json',
        },
      }
    );
 
    return response.data;
  } catch (e:any) {

    if (e.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', e.response.data);
      console.error('Status:', e.response.status);
      console.error('Headers:', e.response.headers);
    } else if (e.request) {
      // The request was made but no response was received
      console.error('Error request:', e.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', e.message);
    }
    console.error('Error config:', e.config);

    return {       
      error: true,       
      message: 'Error while authorizing payment with Affirm',       
      details: e.response?.data || e.message,     
    };

  }
};
