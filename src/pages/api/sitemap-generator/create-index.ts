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
import { createEntry, updateEntry } from '@modules/utilities/contentful'
import { NextApiRequest, NextApiResponse } from 'next'

const { getIndexNumberOfHits } = require('@modules/utilities/algolia.js')

export const getNumberOfHits = async () => {
  console.log('Getting number of hits from Algolia.')
  let numberOfHits: number = 0
  try {
    // Get number of products from Algolia
    numberOfHits = await getIndexNumberOfHits({
      appId: ALGOLIA_APP_ID,
      apiKey: ALGOLIA_WRITE_API_KEY,
      baseIndex: ALGOLIA_BASE_INDEX,
    })
    console.log(`hits_number=${numberOfHits}`)
  } catch (e: any) {
    console.error(e)
    throw new Error('Error getting number of products')
  }

  return numberOfHits
}

export const getNumberOfPages = async (numberOfHits: number) => {
  let numberOfPages: number = 0
  try {
    numberOfPages = Math.ceil(
      numberOfHits / (XML_MAX_RECORDS * XML_MAX_PAGES_PER_FILE)
    )
    console.log(
      `Calculated number of pages. sitemap_product_pages=${numberOfPages}`
    )
  } catch (e: any) {
    console.error(e)
    throw new Error('Error getting number of pages')
  }

  return numberOfPages
}

const generatePagesXml = async (numberOfPages: number) => {
  console.log('Generating product sitemap pages.')
  let xml: string = '<sitemapindex>'

  if (numberOfPages) {
    for (let i = 1; i <= numberOfPages; i++) {
      let loc: string = `<loc>${APP_DOMAIN_BASE_URL}/sitemap-products-${i}.xml</loc>`
      xml = xml + loc
    }
  }

  return xml + '</sitemapindex>'
}

const createOrUpdateSitemapIndexEntry = async (
  numberOfHits: number,
  numberOfPages: number,
  xml: string,
  lastIndexId?: string
) => {
  try {
    // set fields
    const contentData = {
      'en-US': {
        nodeType: 'document',
        data: {},
        content: [
          {
            nodeType: 'paragraph',
            data: {},
            content: [
              {
                nodeType: 'text',
                data: {},
                value: xml,
                marks: [],
              },
            ],
          },
        ],
      },
    }

    const currentDate = new Date()
    const expirationDate = new Date()
    expirationDate.setDate(currentDate.getDate() + SITEMAP_EXPIRATION_DAYS)

    const fields = {
      title: {
        'en-US': `${NEXT_PUBLIC_SITE_IDENTIFIER}-sitemap-products-index`,
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
      currentPage: {
        'en-US': 0,
      },
      totalProducts: {
        'en-US': numberOfHits,
      },
      totalPages: {
        'en-US': numberOfPages,
      },
      cursor: {
        // always reset the cursor on create-index
        'en-US': null,
      },
      site: {
        'en-US': NEXT_PUBLIC_SITE_IDENTIFIER,
      },
      data: contentData,
    }

    if (!lastIndexId) {
      // save content to contentful
      await createEntry(
        CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
        CONTENTFUL_SPACE_ID,
        CONTENTFUL_ENVIRONMENT,
        'sitemapIndex',
        fields
      )
    } else {
      await updateEntry(
        CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
        CONTENTFUL_SPACE_ID,
        CONTENTFUL_ENVIRONMENT,
        lastIndexId,
        fields
      )
    }
  } catch (e: any) {
    console.log(e)
    throw new Error('Error creating index sitemap entry')
  }
}

export const getLastIndex = async () => {
  const client = new ContentfulHandler()

  const sitemapIndexEntries = await client.getEntriesWithSpecificFields(
    'sitemapIndex',
    '',
    [],
    [{ name: 'site', value: NEXT_PUBLIC_SITE_IDENTIFIER as string }]
  )

  if (sitemapIndexEntries && sitemapIndexEntries.items.length) {
    return sitemapIndexEntries.items[0]
  }

  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query
  const { token } = query

  try {
    // check if we need to create/update sitemap index
    const lastIndex = await getLastIndex()

    if (lastIndex) {
      const currentDate = new Date()
      const expirationDate = new Date(lastIndex.fields.expirationDate)

      if (expirationDate.getTime() > currentDate.getTime()) {
        return res.status(200).send('Current sitemap has not expired yet.')
      }
    }

    // get number of pages from algolia then create the xml content
    const numberOfHits = await getNumberOfHits()
    const numberOfPages = await getNumberOfPages(numberOfHits)
    const xml = await generatePagesXml(numberOfPages)

    if (lastIndex) {
      console.log('Updating Contentful entry with generated XML.')
      await createOrUpdateSitemapIndexEntry(
        numberOfHits,
        numberOfPages,
        xml,
        lastIndex?.sys.id
      )
    } else {
      console.log('Creating Contentful entry with generated XML.')
      await createOrUpdateSitemapIndexEntry(numberOfHits, numberOfPages, xml)
    }
  } catch (e) {
    console.error(e)
    return res.status(500).send('Error creating sitemap index')
  }

  return res.status(200).send('Sitemap index created')
}
