import {
  APP_DOMAIN_BASE_URL,
  SITEMAP_CACHE_MAX_AGE,
  SITEMAP_CACHE_STALE_WHILE_REVALIDATE,
} from '@modules/app'
import axios, { AxiosInstance } from 'axios'
import { GetServerSideProps } from 'next'
import { getServerSideSitemap } from 'next-sitemap'

const nodeLimit: number = process.env.NEXT_PUBLIC_ELASTIC_PATH_NODE_LIMIT
  ? parseInt(process.env.NEXT_PUBLIC_ELASTIC_PATH_NODE_LIMIT, 10)
  : 100

const epChannel = process.env.NEXT_PUBLIC_ELASTIC_PATH_CHANNEL ?? undefined

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result: any = []

  // get EP token
  const epInstance = axios.create({
    baseURL: `https://${process.env.NEXT_PUBLIC_ELASTIC_PATH_HOST}`,
    headers: {
      accept: 'application/json',
      'x-moltin-auth-store': process.env.NEXT_PUBLIC_ELASTIC_PATH_STORE_ID!,
    },
  })

  const epAccessToken = await getEpAccessToken(epInstance)

  // Get taxonomies nodes
  const catalog = await getEpAllNodes(epInstance, epAccessToken)
  for (let category of catalog) {
    result.push({
      loc: `${APP_DOMAIN_BASE_URL}/${category.attributes.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.7,
    })
  }

  ctx.res.setHeader('Content-Type', 'text/xml')
  ctx.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${SITEMAP_CACHE_MAX_AGE}, stale-while-revalidate=${SITEMAP_CACHE_STALE_WHILE_REVALIDATE}`
  )

  return getServerSideSitemap(ctx, result)
}

// Default export to prevent next.js errors
export default function Sitemap() {}

export async function getEpAccessToken(axionsInstance: AxiosInstance) {
  const params = new URLSearchParams()
  params.append('client_id', process.env.NEXT_PUBLIC_ELASTIC_PATH_CLIENT_ID!)
  params.append('client_secret', process.env.ELASTIC_PATH_CLIENT_SECRET!)
  params.append('grant_type', 'client_credentials')

  const response = await axionsInstance.post('oauth/access_token', params)
  return response.data.access_token
}

async function getEpNodes(
  axionsInstance: AxiosInstance,
  accessToken: string,
  query?: string
) {
  const nodeLimit = 100
  const queryParams = query ?? `page[limit]=${nodeLimit}`
  const response = await axionsInstance.get(`catalog/nodes?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(epChannel && { 'EP-Channel': epChannel }),
    },
  })
  return response.data
}

async function getEpAllNodes(
  axiosInstance: AxiosInstance,
  accessToken: string
) {
  const nodeLimit = 100
  let nodes: any[] = []

  try {
    const response = await getEpNodes(axiosInstance, accessToken)
    const total = response.meta.results.total
    nodes = nodes.concat(response.data)
    if (total > nodeLimit) {
      let currentElements = nodeLimit
      while (currentElements < total) {
        const query = `page[limit]=${nodeLimit}&page[offset]=${currentElements}`
        nodes = nodes.concat(
          (await getEpNodes(axiosInstance, accessToken, query)).data
        )
        currentElements += nodeLimit
      }
    }
    return nodes
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error while fetching EP nodes', e)
    return [e]
  }
}

export async function getEpProducts(
  axionsInstance: AxiosInstance,
  accessToken: string,
  query?: string
) {
  const queryParams = query ?? `page[limit]=${nodeLimit}`
  const response = await axionsInstance.get(
    `/pcm/catalog/products/?${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(epChannel && { 'EP-Channel': epChannel }),
      },
    }
  )
  return response.data
}
