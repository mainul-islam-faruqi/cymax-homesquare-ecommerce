import { fetchAllNodes } from '@modules/ep/taxonomy/fetchAllNodes'
import { NextApiRequest, NextApiResponse } from 'next'

const plpCacheMaxAge = parseInt(process.env.PLP_CACHE_MAX_AGE || '172800')
const plpCacheStaleWhileRevalidate = parseInt(
  process.env.PLP_CACHE_STALE_WHILE_REVALIDATE || '28800'
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    'Cache-Control',
    `s-maxage=${plpCacheMaxAge}, stale-while-revalidate=${plpCacheStaleWhileRevalidate}`
  )

  try {
    const nodes = await fetchAllNodes()

    res.status(200).json(nodes)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err })
  }
}
