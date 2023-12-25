import { fetchHierarchyById } from '@modules/ep/taxonomy/fetchHierarchyById'
import { EpNodeWithRelationships, NodeHashTable } from './types'

export const findNode = (slug: string, nodes: EpNodeWithRelationships[]) => {
  const node = nodes.find(
    (node) =>
      (node?.attributes?.slug ?? '').toLowerCase() ===
      (slug ?? '').toLowerCase()
  )
  return node ?? null
}

export const buildHashTable = (nodes: EpNodeWithRelationships[]) => {
  const hashTable: NodeHashTable = {}
  for (let i = 0; i < nodes?.length; i++) {
    const { id } = nodes[i]
    hashTable[id] = nodes[i]
  }
  return hashTable
}

export const findParents = async (
  nodeTable: NodeHashTable,
  currentNode: EpNodeWithRelationships | null
): Promise<any> => {
  let parentNode = null

  if (currentNode?.relationships.parent) {
    const parentData = nodeTable[currentNode?.relationships?.parent?.data?.id]
    const name = parentData?.attributes?.name
    const slug = parentData?.attributes?.slug
    const id = parentData?.id

    parentNode = findParents(nodeTable, {
      id,
      name,
      slug,
      type: 'node',
      relationships: parentData?.relationships,
      children: currentNode,
    })
  } else {
    const hierarchy = await fetchHierarchyById(
      currentNode?.relationships?.hierarchy?.data?.id
    )
    const { name, slug } = hierarchy ?? {}

    parentNode = {
      name: name ?? null,
      slug: slug ?? null,
      type: 'hierarchy',
      children: currentNode ?? null,
    }
  }

  return parentNode
}
