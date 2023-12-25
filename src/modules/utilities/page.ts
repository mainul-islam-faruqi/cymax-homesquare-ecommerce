/* eslint-disable no-console */
import {
  axiosCreateClient,
  EpCollectionResponse,
  EpProductInterface,
  getAuthHeaders,
} from '@myplanetdigital/elasticpath'
import { epCategoryType } from 'pages/api/algolia/facets-names'
import { ELASTIC_PATH_CLIENT_ID, ELASTIC_PATH_HOST } from '../app'
import { clientCredentialsTokenFetchService } from '../ep'
import { ELASTIC_PATH_CLIENT_SECRET } from '../server'

type patternCode = {
  slugFacet: string
  descriptionFacet: string
  type: string
  resolver: string
  code?: string
}

const patternCodesDictionary: { [key: string]: patternCode } = {
  '--C': {
    slugFacet: 'ep_slug_categories',
    descriptionFacet: 'ep_categories',
    type: 'category',
    resolver: 'PLP',
  },
  '--c': {
    slugFacet: 'ep_slug_categories',
    descriptionFacet: 'ep_categories',
    type: 'category',
    resolver: 'PLP',
  },
  '--B': {
    slugFacet: 'brand',
    descriptionFacet: 'brand',
    type: 'brand',
    resolver: 'PAGE',
  },
  '--CL': {
    slugFacet: 'collectionSlug',
    descriptionFacet: 'collectionName',
    type: 'collection',
    resolver: 'PLP',
  },
  '--CP': {
    slugFacet: 'collectionSlug',
    descriptionFacet: 'collectionName',
    type: 'collection',
    resolver: 'PLP',
  },
}

type facetValidationType = {
  facet: string
  valid: boolean
  option: string | epCategoryType
  title: string
}

export function slugPatterIdentifier(slug: string): patternCode {
  console.log(
    'TRACE: Matching slug with known category/brand/collection pages patterns'
  )
  const slugPatternCodes: any = Object.keys(patternCodesDictionary).reduce(
    (acc, code: string) => {
      if (slug.includes(code)) {
        acc = { ...patternCodesDictionary[code], code }
      }
      return acc
    },
    {}
  )
  return slugPatternCodes
}

const removeAllSpecialCharacters = (str: string) =>
  str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')

export async function getFacetOptionFromSlug({
  slug = '',
  facet,
  options = {},
  facetsValidation,
  code,
}: {
  slug: string
  facet: string
  options: any
  facetsValidation: { [key: string]: facetValidationType }
  code: string
}) {
  const categoryRegex = new RegExp('.*?(?=--)')
  const isCollectionName = facet == 'collectionName'
  const cleanSlug = slug.toLowerCase().replace(/\s/g, '-')

  const slugLowerCaseDash = isCollectionName
    ? cleanSlug
    : removeAllSpecialCharacters(
        cleanSlug.match(categoryRegex)?.[0] ?? cleanSlug
      )

  let result
  let substring
  let optionMatch = {}

  substring = options
    ? Object.keys(options).find((option: string) => {
        const cleanOption = option.toLowerCase().replace(/\s/g, '-')
        const optionLowerCaseDash = isCollectionName
          ? `-${cleanOption}-`
          : removeAllSpecialCharacters(cleanOption)

        let isMatch

        switch (facet) {
          case 'ep_categories':
            isMatch = slugLowerCaseDash == optionLowerCaseDash
            break

          default:
            isMatch = slugLowerCaseDash.includes(optionLowerCaseDash)
            break
        }

        if (isMatch) {
          optionMatch = options[option]
        }
        return isMatch
      })
    : false

  if (facet == 'collectionName' && !substring) {
    const brand = facetsValidation?.brand?.option as any
    const brandLength = brand?.toLowerCase().replace(/\s/g, '-').length
    const collectionName = slug
      .substring(brandLength + 1, slug.indexOf(code))
      .replace(/-/g, ' ')

    const httpClient = axiosCreateClient({
      host: ELASTIC_PATH_HOST,
    })

    const clientCredentialsToken = await clientCredentialsTokenFetchService({
      httpClient,
      params: {
        client_id: ELASTIC_PATH_CLIENT_ID,
        client_secret: ELASTIC_PATH_CLIENT_SECRET,
      },
    })

    const headers = {
      ...getAuthHeaders({
        accessToken: clientCredentialsToken?.access_token,
      }),
    }

    try {
      const response = await httpClient.get<
        EpCollectionResponse<EpProductInterface[]>
      >(
        `/pcm/products?filter=eq(extensions.extended.collectionname,${collectionName})`,
        {
          headers,
        }
      )

      const hits = response?.data?.data?.length ?? 0

      if (hits > 0) {
        substring = collectionName.toLowerCase().replace(/\s/g, '-')
        optionMatch = collectionName
      }
    } catch (error: any) {
      return false
    }
  }

  result = substring ? { option: optionMatch, substring } : false

  return result
}

export async function matchRoutePattern({ slug }: any): Promise<any> {
  console.log(`TRACE: matching URL route pattern`)
  const patternCode = slugPatterIdentifier(slug)
  return patternCode?.slugFacet == null ? null : patternCode
}
