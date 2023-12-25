import { ELASTIC_PATH_CLIENT_ID, ELASTIC_PATH_HOST } from '@modules/app'
import { ELASTIC_PATH_CLIENT_SECRET } from '@modules/server'
import { axiosCreateClient, getAuthHeaders } from '@myplanetdigital/elasticpath'
import { AxiosInstance } from 'axios'
import throttledQueue from 'throttled-queue'
import { clientCredentialsTokenFetchService } from '../auth'

export const useEPGetNodeKey = `useEPGetNodeKey`

const epNodesLimit = 100

const epConcurrentRequests = parseInt(
  process.env.NEXT_PUBLIC_EP_CONCURRENT_REQUESTS || '2',
  10
)
const epConcurrentRequestsDelay = parseInt(
  process.env.NEXT_PUBLIC_EP_CONCURRENT_REQUESTS_DELAY || '1000',
  10
)

interface NodesResponse {
  data: Array<Object>
  links: Object
  meta: {
    page: {
      total: Number
    }
    results: {
      total: Number
    }
  }
}

const fetchEPNodes = async (
  httpClient: AxiosInstance,
  queryParams: string = `page[limit]=${epNodesLimit}`
) => {
  const clientCredentialsToken = await clientCredentialsTokenFetchService({
    httpClient,
    params: {
      client_id: ELASTIC_PATH_CLIENT_ID,
      client_secret: ELASTIC_PATH_CLIENT_SECRET,
    },
  })

  const response = await httpClient.get<NodesResponse>(
    `/catalog/nodes?${queryParams}`,
    {
      headers: {
        ...getAuthHeaders({
          accessToken: clientCredentialsToken?.access_token,
        }),
      },
    }
  )
  return response.data
}

export const fetchAllNodes = async () => {
  let nodes: Array<any> = []
  const httpClient = axiosCreateClient({
    host: ELASTIC_PATH_HOST,
  })

  try {
    const response = await fetchEPNodes(httpClient)
    const total = response.meta.results.total
    nodes = nodes.concat(response.data)

    const throttle = throttledQueue(
      epConcurrentRequests,
      epConcurrentRequestsDelay,
      true
    )

    let queries: Array<string> = []

    if (total > epNodesLimit) {
      let currentElements = epNodesLimit
      while (currentElements < total) {
        const query = `page[limit]=${epNodesLimit}&page[offset]=${currentElements}`
        queries.push(query)
        currentElements += epNodesLimit
      }
    }

    const responses = await Promise.all(
      queries.map((query) =>
        throttle(() => {
          return fetchEPNodes(httpClient, query)
        })
      )
    )

    responses.forEach((response: any) => {
      nodes = nodes.concat(response.data)
    })

    return nodes
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error while fetching EP nodes', e)
    return [e as any]
  }
}

export const fetchAllCachedNodes = async ({ req }: { req: any }) => {
  try {
    const nodes = await fetch(
      `http://${req.headers.host ?? ''}/api/taxonomy/fetch-all-nodes`,
      {
        headers: {
          cookie: req.headers.cookie,
        },
      }
    ).then((response) => {
      //console.log('response', response)
      return response.json()
    })
    return nodes
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error while fetching EP nodes', e)
    return [e as any]
  }
}
