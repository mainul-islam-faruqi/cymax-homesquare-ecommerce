// Functions to fetch taxonomy without the use of hooks for ssr

import { EpServiceDeps } from '@myplanetdigital/elasticpath'
import { fetchNodeIdService } from '../nodes'
import { fetchAllCachedNodes } from './fetchAllNodes'
import { buildHashTable, findNode, findParents } from './utils'

interface getTaxonomyByBreadcrumbKeysProps extends EpServiceDeps {
  bread_crumbs: Record<string, string[]>
  req: any
}

interface getParentBreadcrumbProps extends EpServiceDeps {
  bread_crumbs: Record<string, string[]>
}

interface getNodesProps extends EpServiceDeps {
  nodeIds: string[]
}

export const getTaxonomyByBreadcrumbKeys = async ({
  bread_crumbs,
  httpClient,
  headers,
  accessToken,
  req,
}: getTaxonomyByBreadcrumbKeysProps) => {
  // get parent from useParent
  if (typeof bread_crumbs === 'undefined') {
    return null
  }

  const parentBreadcrumb = await getParentBreadcrumb({
    bread_crumbs: bread_crumbs,
    httpClient,
    headers,
    accessToken,
  })

  const parentSlug = parentBreadcrumb?.slug

  const nodes = await fetchAllCachedNodes({ req })
  const currentNode = findNode(parentSlug as string, nodes)
  const nodeHashTable = buildHashTable(nodes)
  return await findParents(nodeHashTable, currentNode)
}

export const getParentBreadcrumb = async ({
  bread_crumbs,
  headers,
  httpClient,
  accessToken,
}: getParentBreadcrumbProps) => {
  const key = Object.keys(bread_crumbs)[0]
  const valuesIds = Object.values(bread_crumbs)[0]?.reverse()
  const breadCrumbKeys = [...valuesIds, key]

  const lastIndex = breadCrumbKeys.length - 1

  const { nodes } = await getNodes({
    nodeIds: [breadCrumbKeys[lastIndex]],
    headers,
    httpClient,
    accessToken,
  })

  // const parentBreadcrumb = useMemo(() => {
  const parentNodeQuery = {
    title: nodes[0] ? nodes[0]?.attributes?.name : '',
    slug: nodes[0] ? nodes[0]?.attributes?.slug : '',
    contentType: 'genericPage',
  }

  let parentBreadcrumb = parentNodeQuery || {}
  return parentBreadcrumb
}

const getNodes = async ({
  nodeIds,
  httpClient,
  headers,
  accessToken,
}: getNodesProps) => {
  const promises = nodeIds.map(
    async (nodeId) =>
      await fetchNodeIdService({
        httpClient,
        headers,
        params: {
          nodeId,
        },
        accessToken,
      })
  )

  const nodes = await Promise.all(promises)
  return { nodes: nodes || [] }
}
