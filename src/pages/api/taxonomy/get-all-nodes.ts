import { fetchAllCachedNodes } from '@modules/ep/taxonomy/fetchAllNodes'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  buildHashTable,
  findNode,
  findParents,
} from '../../../modules/ep/taxonomy/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query
    const nodes = await fetchAllCachedNodes({ req })
    const currentNode = findNode(slug as string, nodes)
    const nodeHashTable = buildHashTable(nodes)
    const parentNode = await findParents(nodeHashTable, currentNode)

    res.status(200).json(parentNode)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err })
  }
}
