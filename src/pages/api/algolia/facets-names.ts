import { ALGOLIA_BASE_INDEX } from '@modules/algolia'
import { searchClient } from '@modules/app'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * @description This value is the maximum number of facets values that Algolia can retrieve per facet
 * {@link https://support.algolia.com/hc/en-us/articles/5588550618897-Clarifying-confusion-with-facets-facet-values-maxFacetHits-and-maxValuesPerFacet}
 */

const MAX_VALUE_PER_FACET = parseInt(
  process.env.NEXT_PUBLIC_CACHED_FACET_OPTIONS_LIMIT ?? '2000'
)

const plpCacheMaxAge = parseInt(process.env.PLP_CACHE_MAX_AGE || '172800')
const plpCacheStaleWhileRevalidate = parseInt(
  process.env.PLP_CACHE_STALE_WHILE_REVALIDATE || '28800'
)

const facets = [
  'brand',
  'collectionName',
  'ep_categories.lvl0',
  'ep_categories.lvl1',
  'ep_categories.lvl2',
  'ep_categories.lvl3',
  'ep_categories.lvl4',
]

export type epCategoryType = {
  name: string
  filter: string
  level: number
}

export type facetsResultsType = {
  brand: { [key: string]: string }
  ep_categories: {
    [key: string]: epCategoryType
  }
  collectionName: { [key: string]: string }
}

export async function getFacetsNames() {
  let response: any = {}

  for (const facet of facets) {
    response[facet] = await searchClient
      .initIndex(`${ALGOLIA_BASE_INDEX}`)
      .search('', {
        hitsPerPage: 0,
        facets: [facet],
        maxValuesPerFacet: MAX_VALUE_PER_FACET,
        attributesToRetrieve: [facet],
      })
  }

  const facetsResults: facetsResultsType = {
    brand: {},
    ep_categories: {},
    collectionName: {},
  }

  const numberOfFacets: { [key: string]: number } =
    Object.keys(response).reduce(
      (accumulator, key) => ({
        ...accumulator,
        [key]: Object.keys(response[key].facets?.[key] ?? ({} as Object))
          .length,
      }),
      {}
    ) ?? {}

  const areFacetOptionsValid = Object.keys(numberOfFacets).every((facet) => {
    return numberOfFacets?.[facet] ?? false
  })

  if (!areFacetOptionsValid) {
    console.error(
      `Some or all facets options fetched from Algolia are ${
        areFacetOptionsValid ? 'valid' : 'invalid'
      }, this are the number of options fetched for each of the necessary attributes:`,
      numberOfFacets,
      'Make sure the attributes brand, collectionName and ep_categories are included in attributresForFacetting on the indices configuration in Algolia.'
    )
  }

  for (let facet of facets) {
    if (facet == 'brand' || facet == 'collectionName') {
      facetsResults[facet] = Object.keys(
        response[facet].facets?.[facet] ?? {}
      ).reduce((acc: { [key: string]: string }, brandName: string) => {
        acc[
          brandName
            .toLowerCase()
            .replace(/\s[&]\s/g, '-')
            .replace(/\s/g, '-')
        ] = brandName
        return acc
      }, {})
    } else if (facet.includes('ep_categories')) {
      Object.keys(response[facet].facets?.[facet] ?? {})?.map((category) => {
        const filterIndex = splitCategory(category) as string
        const levelNumber = parseInt(facet.replace(/[^\d]/gi, ''), 10)
        facetsResults['ep_categories'][filterIndex] = parseLevel(
          category,
          levelNumber
        )
      })
    }
  }

  return facetsResults
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    'Cache-Control',
    `s-maxage=${plpCacheMaxAge}, stale-while-revalidate=${plpCacheStaleWhileRevalidate}`
  )
  try {
    const facetsNames = await getFacetsNames()

    res.status(200).json(facetsNames ?? {})
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: (err as Error).message })
  }
}

function splitCategory(categoryValue: string) {
  return categoryValue
    ?.split('>')
    ?.at(-1)
    ?.trim()
    .replace(/\s[&]\s/g, '-')
    .replace(/\s/g, '-')
}

function parseLevel(category: string, level: number) {
  const filterIndex = splitCategory(category) as string
  return {
    name: filterIndex.toLowerCase(),
    filter: category,
    level: level,
  }
}
