import { EpServiceDeps, getAuthHeaders } from '@myplanetdigital/elasticpath'
import { EpCustomerInterface } from '@modules/ep'

export const getCustomerByEmail = async ({
  httpClient,
  headers,
  params,
  accessToken,
}: EpServiceDeps<{
  customerEmail: string
}>): Promise<EpCustomerInterface | undefined> => {
  const { data } = await httpClient.get<{
    data: EpCustomerInterface[]
  }>(
    `/v2/customers?filter=eq(email,${encodeURIComponent(
      params?.customerEmail ?? ''
    )})`,
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken }),
      },
    }
  )
  return data.data[0]
}
