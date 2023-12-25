import {
  EpCustomerInterface,
  EpServiceDeps,
  getAuthHeaders,
} from '@myplanetdigital/elasticpath'

type EpCustomerUpdate = Partial<Omit<EpCustomerInterface, 'type'>> & {
  resetToken?: string
}

type EpCustomerRequired = Required<EpCustomerUpdate & { resetToken: string }>

export const updateCustomer = async ({
  httpClient,
  headers,
  params,
  accessToken,
}: EpServiceDeps<{
  customerData: EpCustomerUpdate
  customerId: string
}>): Promise<EpCustomerRequired> => {
  const { data } = await httpClient.put<{ data: EpCustomerRequired }>(
    `/v2/customers/${params?.customerId}`,
    {
      data: {
        ...params?.customerData,
        type: 'customer',
      },
    },
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken }),
      },
    }
  )

  return data.data
}
