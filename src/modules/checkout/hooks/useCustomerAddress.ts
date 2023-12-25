import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { updateToken } from '@modules/ep/auth/utils'
import {
  EpAddressInterface,
  getAuthHeaders,
  useElasticPath,
  useUser,
} from '@myplanetdigital/elasticpath'
import { AxiosInstance } from 'axios'
import { useQuery } from 'react-query'

interface CustomerAddressServiceProps {
  httpClient: AxiosInstance
  headers: any
  customerId?: string
  accessToken: string
  customerToken?: string
}

interface EpAddressResult {
  data: EpAddressCustomInterface[]
}

interface EpAddressCustomInterface extends EpAddressInterface {
  id?: string
  isCommercial: boolean
  industry?: string
}

export const useCustomerAddress = () => {
  const { httpClient, customerToken, headers, accessToken } = useElasticPath()
  const { data, refetch } = useAccessToken()
  const { customer } = useUser()

  const query = useQuery(
    ['useCustomerAddress'],
    async () => {
      const accessToken = await updateToken(refetch, data)
      const res: EpAddressResult = await getCustomerAddressService({
        httpClient,
        accessToken,
        customerToken: customerToken?.token,
        headers,
        customerId: customer?.id,
      })

      return res
    },
    {
      enabled: Boolean(customer),
      keepPreviousData: true,
    }
  )

  return {
    customerAddress: query?.data,
  }
}

//https://documentation.elasticpath.com/commerce-cloud/docs/api/payments/paying-for-an-order/paypal-express-checkout-payments.html#step-2-post-complete-the-payment
const getCustomerAddressService = async ({
  httpClient,
  headers,
  customerId,
  accessToken,
  customerToken,
}: CustomerAddressServiceProps) => {
  try {
    const response = await httpClient.get(
      `/v2/customers/${customerId}/addresses`,
      {
        headers: {
          ...headers,
          ...getAuthHeaders({ accessToken, customerToken }),
        },
      }
    )

    return response?.data
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error while saving paypal auth info to EP', e)
    return e
  }
}
