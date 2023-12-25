// pages/server-sitemap.xml/index.tsx

import {
  APP_DOMAIN_BASE_URL,
  SITEMAP_CACHE_MAX_AGE,
  SITEMAP_CACHE_STALE_WHILE_REVALIDATE,
} from '@modules/app'
import { contentfulGraphqlClient } from '@modules/contentful/utils'
import { GetServerSideProps } from 'next'
import { getServerSideSitemap } from 'next-sitemap'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const result: any = []

  const site = process.env.NEXT_PUBLIC_SITE_IDENTIFIER ?? ''
  const graphqlQuery = `
    query {
    	genericPageCollection(preview: false) {
        items {
          slug
          sys {
            publishedAt
          }
        }
      }
      genericPageWithMenuCollection(preview: false) {
        items {
          slug
          sys {
            publishedAt
          }
        }
      }
      plpCollection(preview:false) {
        items {
          slug
          sys {
            publishedAt
          }
        }
      }
    }
  `

  try {
    const res = await contentfulGraphqlClient
      .query(graphqlQuery, { site })
      .toPromise()

    const {
      genericPageCollection,
      genericPageWithMenuCollection,
      plpCollection,
    } = res.data
    for (let item of genericPageCollection.items) {
      result.push({
        loc: `${APP_DOMAIN_BASE_URL}/${item?.slug}`,
        lastmod: item?.sys?.publishedAt ?? new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      })
    }
    for (let item of genericPageWithMenuCollection.items) {
      result.push({
        loc: `${APP_DOMAIN_BASE_URL}/${item?.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      })
    }
    for (let item of plpCollection.items) {
      result.push({
        loc: `${APP_DOMAIN_BASE_URL}/${item?.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      })
    }
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('Error fetching contentful data', e)
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
