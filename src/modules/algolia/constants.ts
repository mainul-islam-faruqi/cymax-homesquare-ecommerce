import { parseIfValidJSON } from '@modules/app/utils'
import { AlgoliaFilterItem } from './types'

export const DEFAULT_SORTBY = ''
export const DEFAULT_INITIAL_REFINEMENTS_LIMIT = process.env
  .NEXT_PUBLIC_DEFAULT_INITIAL_REFINEMENTS_LIMIT
  ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_INITIAL_REFINEMENTS_LIMIT)
  : 12
export const DEFAULT_SHOW_MORE_REFINEMENTS_LIMIT = process.env
  .NEXT_PUBLIC_DEFAULT_SHOW_MORE_REFINEMENTS_LIMIT
  ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_SHOW_MORE_REFINEMENTS_LIMIT)
  : 20
export const DEFAULT_FACETS_LIMIT = process.env.NEXT_PUBLIC_DEFAULT_FACETS_LIMIT
  ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_FACETS_LIMIT)
  : 10

export const ALGOLIA_BASE_INDEX =
  process.env.NEXT_PUBLIC_ALGOLIA_BASE_INDEX ?? ''
export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ''
export const ALGOLIA_SEARCH_API_KEY =
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
export const ALGOLIA_WRITE_API_KEY = process.env.ALGOLIA_WRITE_API_KEY ?? ''

export const ALGOLIA_EXCLUDE_FILTER: string[] =
  parseIfValidJSON(process.env.NEXT_PUBLIC_ALGOLIA_EXCLUDE_FILTER ?? '') || []

export const ALGOLIA_FILTERS: AlgoliaFilterItem[] = [
  {
    type: 'numeric',
    attribute: 'attributes.normalized.rating',
    urlAlias: 'rating',
    translationKey: 'category.refinements.rating',
    items: [
      { label: '1+', start: 1 },
      { label: '2+', start: 2 },
      { label: '3+', start: 3 },
      { label: '4+', start: 4 },
      { label: '5+', start: 5 },
    ],
  },
  {
    type: 'list',
    attribute: 'attributes.normalized.classification',
    urlAlias: 'classification',
    translationKey: 'category.refinements.classification',
    operator: 'and',
  },
  {
    type: 'list',
    attribute: 'attributes.normalized.varietals',
    urlAlias: 'varietals',
    translationKey: 'category.refinements.varietals',
    operator: 'and',
  },
  {
    type: 'list',
    attribute: 'attributes.normalized.brand',
    urlAlias: 'brand',
    translationKey: 'category.refinements.brand',
  },
  {
    type: 'list',
    attribute: 'attributes.normalized.terroir',
    urlAlias: 'terroir',
    translationKey: 'category.refinements.terroir',
  },
  {
    type: 'list',
    attribute: 'attributes.normalized.region',
    urlAlias: 'region',
    translationKey: 'category.refinements.region',
  },
]

export const CATEGORY_SEARCH_FIELDS = [
  'categories',
  'attributes.normalized.classification',
  'attributes.normalized.varietals',
]

export const ALGOLIA_INDEX_LIST = [
  { label: 'algoliaindexlist.bestmatch', value: '' },
  { label: 'algoliaindexlist.newest', value: '_newest' },
  { label: 'algoliaindexlist.name', value: '_nameAlphabetical' },
  { label: 'algoliaindexlist.lowestprice', value: '_lowestPrice' },
  { label: 'algoliaindexlist.highestprice', value: '_highestPrice' },
  { label: 'algoliaindexlist.mostpopular', value: '_mostPopular' },
]

export const LOCALES = [
  { languageCode: 'en', countryLanguageCode: 'en-US', currency: 'USD' },
  { languageCode: 'en', countryLanguageCode: 'en-CA', currency: 'CAD' },
  { languageCode: 'fr', countryLanguageCode: 'fr-CA', currency: 'CAD' },
] as const

export const SELLER_FILTER_FIELD = 'attributes.normalized.seller'

export const PRICE_FILTER =
  process.env.NEXT_PUBLIC_ALGOLIA_PRICE_FILTER ?? 'listPrice.USD.float_price'

export const ON_SALE_FILTER =
  process.env.NEXT_PUBLIC_ALGOLIA_ON_SALE_FILTER ?? 'listPrice.USD.on_sale'

export const AMOUNT_FILTER =
  process.env.NEXT_PUBLIC_ALGOLIA_AMOUNT_FILTER ?? 'salePrice.sale-1.currencies.USD.amount'

export const TAX_FILTER =
  process.env.NEXT_PUBLIC_ALGOLIA_TAX_FILTER ?? 'listPrice.USD.includes_tax'

export const EP_CATEGORY_FILTER = 'ep_categories'

export const CATEGORY_FILTER = 'category'

export const COLLECTION_FILTER = 'collectionName'


