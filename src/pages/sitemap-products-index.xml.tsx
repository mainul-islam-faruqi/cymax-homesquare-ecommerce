import { GetServerSideProps } from 'next'
import { getServerSideSitemapIndex } from 'next-sitemap'

import {
  ALGOLIA_APP_ID,
  ALGOLIA_BASE_INDEX,
  ALGOLIA_SEARCH_API_KEY,
} from '@modules/algolia'
import {
  APP_DOMAIN_BASE_URL,
  SITEMAP_CACHE_MAX_AGE,
  SITEMAP_CACHE_STALE_WHILE_REVALIDATE,
  XML_MAX_PAGES_PER_FILE,
  XML_MAX_RECORDS,
} from '@modules/app'

const { getIndexNumberOfHits } = require('@modules/utilities/algolia.js')

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result: any = []
  try {
    // Get number of products from Algolia
    const numberOfHits = await getIndexNumberOfHits({
      appId: ALGOLIA_APP_ID,
      apiKey: ALGOLIA_SEARCH_API_KEY,
      baseIndex: ALGOLIA_BASE_INDEX,
    })

    const numberOfPages = Math.ceil(
      numberOfHits / (XML_MAX_RECORDS * XML_MAX_PAGES_PER_FILE)
    )

    if (numberOfPages) {
      for (let i = 1; i <= numberOfPages; i++) {
        result.push(`${APP_DOMAIN_BASE_URL}/sitemap-products-${i}.xml`)
      }
    }
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('Error while generating products xml file', e)
  }

  ctx.res.setHeader('Content-Type', 'text/xml')
  ctx.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${SITEMAP_CACHE_MAX_AGE}, stale-while-revalidate=${SITEMAP_CACHE_STALE_WHILE_REVALIDATE}`
  )

  return getServerSideSitemapIndex(ctx, result)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
