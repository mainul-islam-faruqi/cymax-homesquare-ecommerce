import { useAccessToken } from '@modules/app/hooks/useAccessToken'
import { updateToken } from '@modules/ep/auth/utils'
import {
  EpServiceDeps,
  getAuthHeaders,
  useElasticPath,
} from '@myplanetdigital/elasticpath'
import { useEffect, useState } from 'react'
import { useQueries } from 'react-query'
import { EpGetNodeDataInterfaceData } from './types'

export const useEPGetNodeKey = `useEPGetNodeKey`

export const fetchNodeIdService = async ({
  httpClient,
  headers,
  params,
  accessToken,
}: EpServiceDeps<{
  nodeId: string
}>): Promise<EpGetNodeDataInterfaceData> => {
  const response = await httpClient.get(`/catalog/nodes/${params?.nodeId}`, {
    headers: {
      ...headers,
      ...getAuthHeaders({ accessToken }),
    },
  })

  return response.data.data ?? null
}

export const useGetNodes = (nodeIds: string[]) => {
  const { httpClient, headers } = useElasticPath()
  const [accessToken, setAccessToken] = useState('')
  const { data, refetch } = useAccessToken()

  useEffect(() => {
    if (data) {
      const fetchAccessToken = async () => {
        const token = await updateToken(refetch, data)
        setAccessToken(token)
      }
      fetchAccessToken()
    }
  }, [accessToken, data, refetch])

  const userQueries = useQueries(
    nodeIds.map((nodeId) => {
      return {
        queryKey: [useEPGetNodeKey, nodeId],
        queryFn: () =>
          fetchNodeIdService({
            httpClient,
            headers,
            params: {
              nodeId,
            },
            accessToken,
          }),
        enabled: nodeIds.length > 0 && !!nodeId && !!headers && !!accessToken,
      }
    })
  )

  return { nodes: userQueries || [] }
}
