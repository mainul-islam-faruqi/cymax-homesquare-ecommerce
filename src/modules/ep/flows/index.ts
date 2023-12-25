import { EpServiceDeps, getAuthHeaders } from '@myplanetdigital/elasticpath'
import { EpFlowEntryInterface } from '../auth/types'

export const flowCreateEntryService = async ({
  httpClient,
  headers,
  params,
  accessToken,
}: EpServiceDeps<{
  slug: string
}>) => {
  const response = await httpClient.post<{
    data: {
      type: 'entry'
    }
  }>(
    `/v2/flows/${params?.slug}/entries`,
    {
      data: {
        type: 'entry',
        ...params,
      },
    },
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken }),
      },
    }
  )

  return response.data
}

export const flowGetEntryByIdService = async ({
  httpClient,
  headers,
  params,
  accessToken,
}: EpServiceDeps<{
  id?: string
  slug?: string
}>) => {
  const response = await httpClient.get(
    `/v2/flows/${params?.slug}/entries/${params?.id}`,
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken }),
      },
    }
  )

  return response.data.data ?? null
}

export const flowUpdateEntryService = async ({
  httpClient,
  headers,
  params,
  accessToken,
}: EpServiceDeps<{
  slug: string
  entryId: string
}>) => {
  const response = await httpClient.put<{
    data: {
      type: 'entry'
    }
  }>(
    `/v2/flows/${params?.slug}/entries/${params?.entryId}`,
    {
      data: {
        type: 'entry',
        ...params,
      },
    },
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken }),
      },
    }
  )

  return response.data
}

export const flowDeleteEntryService = async ({
  httpClient,
  headers,
  params,
  accessToken,
}: EpServiceDeps<{
  slug: string
  entryId: string
}>) => {
  const response = await httpClient.delete<{
    data: {
      type: 'entry'
      id: string
    }
  }>(`/v2/flows/${params?.slug}/entries/${params?.entryId}`, {
    headers: {
      ...headers,
      ...getAuthHeaders({ accessToken }),
    },
  })

  return response.data
}

export const entityCreateRelationshipEntryService = async ({
  httpClient,
  headers,
  params,
  accessToken,
}: EpServiceDeps<{
  entityFrom: EpFlowEntryInterface
  entityTo: EpFlowEntryInterface
}>) => {
  const response = await httpClient.post<{
    data: {
      type: 'entry'
    }
  }>(
    `/v2${params?.entityFrom?.isFlow ? '/flows' : ''}/${
      params?.entityFrom?.slug
    }${params?.entityFrom?.isFlow ? '/entries' : ''}/${
      params?.entityFrom?.entryId
    }/relationships/${params?.entityFrom?.field}`,
    {
      data: [
        {
          type: params?.entityTo?.slug,
          id: params?.entityTo?.entryId,
        },
      ],
    },
    {
      headers: {
        ...headers,
        ...getAuthHeaders({ accessToken }),
      },
    }
  )

  return response.data
}
