/* eslint-disable no-console */
import {
  ALGOLIA_APP_ID,
  ALGOLIA_BASE_INDEX,
  ALGOLIA_WRITE_API_KEY,
} from '@modules/algolia'
import {
  APP_DOMAIN_BASE_URL,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
  NEXT_PUBLIC_SITE_IDENTIFIER,
  SITEMAP_EXPIRATION_DAYS,
  XML_MAX_PAGES_PER_FILE,
  XML_MAX_RECORDS,
} from '@modules/app'
import ContentfulHandler from '@modules/contentful/utils/composable-contentful/src'
import { getIndexRecordsPage } from '@modules/utilities/algolia'
import {
  createAssetFromFile,
  createEntry,
  updateEntry,
} from '@modules/utilities/contentful'
import { NextApiRequest, NextApiResponse } from 'next'
import { getLastIndex, getNumberOfHits, getNumberOfPages } from './create-index'

const fileLength = XML_MAX_RECORDS * XML_MAX_PAGES_PER_FILE

const getPageRecords = async (cursor?: string) => {
  console.log('Retrieving products from Algolia.')
  let records: { hits: any; cursor: any } | null = null
  let result: string[] = []
  let lastCursor = cursor

  while (result.length < fileLength) {
    records = await getIndexRecordsPage({
      attributesToRetrieve: ['slug', 'cursor'],
      appId: ALGOLIA_APP_ID,
      apiKey: ALGOLIA_WRITE_API_KEY,
      baseIndex: ALGOLIA_BASE_INDEX,
      pageSize: XML_MAX_RECORDS,
      currentCursor: lastCursor ?? null,
    })

    if (records && records?.hits && records?.hits.length) {
      for (let product of records?.hits) {
        result.push(`${APP_DOMAIN_BASE_URL}/${product?.slug}`)
      }

      lastCursor = records.cursor
    }
  }
  console.log(
    `All data fetched from Algolia. { result_length=${
      result?.length
    }, cursor_not_null=${cursor != null}`
  )

  return { result, lastCursor }
}

const generateProductsXml = (records: Array<string>) => {
  console.log('Generating XML elements for products sitemap.')
  let xml = '<urlset>'

  if (records.length) {
    for (const item of records) {
      xml =
        xml +
        `<url><loc>${item}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>`
    }
  }

  return xml + '</urlset>'
}

const updateSitemapIndexEntry = async (
  currentPage: number,
  cursor: string,
  sitemapIndexId: string
) => {
  console.log(
    `Updating product sitemap index entry in Contentful. { entry_id=${sitemapIndexId} }`
  )
  try {
    const currentDate = new Date()

    const fields = {
      updated: {
        'en-US': currentDate,
      },
      currentPage: {
        'en-US': currentPage,
      },
      cursor: {
        'en-US': cursor,
      },
    }

    await updateEntry(
      CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
      CONTENTFUL_SPACE_ID,
      CONTENTFUL_ENVIRONMENT,
      sitemapIndexId,
      fields
    )
  } catch (e: any) {
    console.error(e)
    throw new Error('Error updating sitemap entry')
  }
}

const createOrUpdateSitemapProductEntry = async (
  page: number,
  asset?: any,
  entryId?: string
) => {
  console.log('Saving product sitemap page entry in Contentful.')
  if (!asset) {
    console.error('No asset provided for product sitemap page.')
    throw 'Cant create entry without asset'
  }

  try {
    const currentDate = new Date()
    const expirationDate = new Date()
    expirationDate.setDate(currentDate.getDate() + SITEMAP_EXPIRATION_DAYS)

    const fields = {
      title: {
        'en-US': `${NEXT_PUBLIC_SITE_IDENTIFIER}-sitemap-product-${page}`,
      },
      created: {
        'en-US': currentDate,
      },
      updated: {
        'en-US': currentDate,
      },
      expirationDate: {
        'en-US': expirationDate,
      },
      page: {
        'en-US': page,
      },
      site: {
        'en-US': NEXT_PUBLIC_SITE_IDENTIFIER,
      },
      xmlFile: {
        'en-US': {
          sys: {
            id: asset?.sys?.id,
            linkType: 'Asset',
            type: 'Link',
          },
        },
      },
    }

    if (!entryId) {
      // Create content to contentful
      console.log(`Creating new entry for product sitemap page in Contentful.`)
      await createEntry(
        CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
        CONTENTFUL_SPACE_ID,
        CONTENTFUL_ENVIRONMENT,
        'sitemapPage',
        fields
      )
    } else {
      console.log(
        `Updating entry for product sitemap page in Contentful. { entry_id=${entryId} } `
      )
      await updateEntry(
        CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
        CONTENTFUL_SPACE_ID,
        CONTENTFUL_ENVIRONMENT,
        entryId,
        fields
      )
    }
  } catch (e: any) {
    console.error(e)
    throw new Error('Error creating product sitemap entry')
  }
}

export const getSitemapPageEntry = async (page: number) => {
  console.log('Retrieving Contentful entry for product sitemap page')
  const client = new ContentfulHandler()

  const sitemapPageEntries = await client.getEntriesWithSpecificFields(
    'sitemapPage',
    '',
    [],
    [
      { name: 'page', value: page.toString() },
      { name: 'site', value: NEXT_PUBLIC_SITE_IDENTIFIER as string },
    ]
  )

  if (sitemapPageEntries && sitemapPageEntries.items.length) {
    console.log(
      `Contentful entry for product sitemap page found. { entry_id=${sitemapPageEntries?.items?.[0]?.sys?.id} }`
    )
    return sitemapPageEntries.items[0]
  }
  console.log('No entry found in Contentful for the product sitemap page')

  return null
}

const uploadXmlAsset = async (page: number, content: string) => {
  console.log('Uploading asset to Contentful with XML data.')
  const title = `Product Page ${page}`
  const description = `This asset is used to store the product page number ${page} in JSON format. This file is used to build sitemap.xml and robots.txt; please don't delete it.`
  const contentType = 'text/xml'
  const filename = `product-page-${page}.xml`

  const asset = await createAssetFromFile(
    CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT,
    title,
    description,
    contentType,
    filename,
    content
  )
  if (asset == null) {
    console.log(`XML asset upload to Contentful failed.`)
    return null
  }
  console.log(
    `XML asset uploaded to Contentful. { asset_id=${asset?.sys?.id} }`
  )
  return asset
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Starting the generation of another product sitemap page.')
  const query = req.query
  const { token } = query

  const sitemapIndex = await getLastIndex()

  if (sitemapIndex) {
    try {
      const numberOfHits = await getNumberOfHits()
      const numberOfPages = await getNumberOfPages(numberOfHits)
      const pageNumber = sitemapIndex?.fields?.currentPage
        ? sitemapIndex?.fields?.currentPage + 1
        : 1
      console.log(
        `Generating product sitemap page. product_sitemap_page_num=${pageNumber}`
      )
      if (pageNumber > numberOfPages) {
        console.log('All pages already generated returning.')
        return res
          .status(200)
          .send('All sitemap pages have already been generated.')
      }

      const { result: records, lastCursor } = await getPageRecords(
        sitemapIndex?.fields?.cursor
      )
      const xml = await generateProductsXml(records)

      const uploadedAsset = await uploadXmlAsset(pageNumber, xml)

      if (!uploadedAsset) {
        return res.status(500).send('Could not create sitemap file!')
      }

      const entry = await getSitemapPageEntry(pageNumber)

      await createOrUpdateSitemapProductEntry(
        pageNumber,
        uploadedAsset,
        entry?.sys?.id
      )

      // update sitemap index sitemap
      const cursor = lastCursor ?? ''
      const sitemapIndexId = sitemapIndex?.sys.id ?? ''
      await updateSitemapIndexEntry(pageNumber, cursor, sitemapIndexId)

      console.info('Product sitemap page generation successful')
      return res
        .status(200)
        .send(`Products page ${pageNumber} have been stored`)
    } catch (e) {
      console.error(e)
      return res.status(500).send(`Error creating product page.`)
    }
  } else {
    console.warn(
      'Ending function as no product sitemap index found in Contentful.'
    )
    return res.status(503).send('No sitemap index has been found.')
  }
}
