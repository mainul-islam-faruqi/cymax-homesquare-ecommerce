import {
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
  SITEMAP_CACHE_MAX_AGE,
  SITEMAP_CACHE_STALE_WHILE_REVALIDATE,
} from '@modules/app'
import { getAsset } from '@modules/utilities/contentful'
import { GetServerSidePropsContext } from 'next'
import { getLastIndex } from 'pages/api/sitemap-generator/create-index'
import { getSitemapPageEntry } from 'pages/api/sitemap-generator/create-product-page'

const { getIndexNumberOfHits } = require('@modules/utilities/algolia.js')

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  console.log('TRACE: generating sitemap-product-[number] page')
  const result: any = []
  let pageNumber = parseInt((ctx?.params?.pid as string) ?? '0')
  let sitemapContent = ''

  try {
    // Get sitemap index from algolia
    const indexEntry = await getLastIndex()

    const numberOfPages = indexEntry?.fields?.totalPages
    if (pageNumber > numberOfPages || pageNumber < 0) {
      console.log(
        `INFO: Invalid page number, returning 404. requested_page=${pageNumber}, total_pages=${numberOfPages}`
      )
      ctx.res.statusCode = 404
      return { props: {} }
    }
    // Get number of products from Algolia
    const entry = await getSitemapPageEntry(pageNumber)

    if (pageNumber >= 0 && entry) {
      const asset = await getAsset({
        assetId: entry?.fields?.xmlFile?.sys?.id,
        token: CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
        spaceId: CONTENTFUL_SPACE_ID,
        enviromentId: CONTENTFUL_ENVIRONMENT,
      })

      const sitemapUrl = asset?.fields?.file['en-US']?.url

      if (!sitemapUrl) {
        throw new Error(`Sitemap file not found.`)
      }

      const sitemap = await fetch(`https:${sitemapUrl}`)
      sitemapContent = await (await sitemap.blob()).text()
    }
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('Error while displaying products xml file', e)
    ctx.res.end()
    return { props: {} }
  }

  ctx.res.setHeader('Content-Type', 'text/xml')
  ctx.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${SITEMAP_CACHE_MAX_AGE}, stale-while-revalidate=${SITEMAP_CACHE_STALE_WHILE_REVALIDATE}`
  )
  ctx.res.write(sitemapContent)
  ctx.res.end()

  return {
    props: {},
  }
}

// Default export to prevent next.js errors
export default function Sitemap() {
  return null
}
