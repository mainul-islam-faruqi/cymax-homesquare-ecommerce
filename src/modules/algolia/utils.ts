import { IndexUiState } from 'instantsearch.js/es/types'
import {
  ALGOLIA_BASE_INDEX,
  ALGOLIA_FILTERS,
  ALGOLIA_INDEX_LIST,
  DEFAULT_SORTBY,
  SELLER_FILTER_FIELD,
} from './constants'

export const getSellerFilter = (seller?: string) => {
  return seller ? `${SELLER_FILTER_FIELD}: ${seller}` : ''
}

export const getIndexName = (
  locale: string,
  sortBy: string = DEFAULT_SORTBY
) => {
  if (sortBy == null || sortBy === DEFAULT_SORTBY) {
    return ALGOLIA_BASE_INDEX
  }
  return `${ALGOLIA_BASE_INDEX}${sortBy}`
}

export const getSortByFromIndex = (indexName: string, locale: string) => {
  return ALGOLIA_INDEX_LIST.reduce<string | undefined>(
    (acc, { value: sortBy }) => {
      return getIndexName(locale, sortBy) === indexName ? sortBy : acc
    },
    undefined
  )
}

export const getFiltersAttributesNormalized = () => {
  return ALGOLIA_FILTERS.map((filter) => ({
    attribute: filter.attribute,
    urlAlias: filter.urlAlias,
  }))
}

export const getRouteFilters = (
  filters: IndexUiState['refinementList'] | IndexUiState['numericMenu']
) => {
  return Object.entries(filters || {}).reduce<Record<string, string>>(
    (acc, [filter, values]) => {
      const filterAlias = getFilterAttributeUrlAlias(filter)
      if (filterAlias) {
        return {
          ...acc,
          [filterAlias]: typeof values === 'string' ? values : values.join(','),
        }
      }
      return acc
    },
    {}
  )
}

interface FilterState {
  numericMenu: {
    [attribute: string]: string
  }
  refinementList: {
    [attribute: string]: string[]
  }
}

export const getAlgoliaStateFilters = (filters: Record<string, string>) => {
  return Object.entries(filters || {}).reduce<FilterState>(
    (acc, [filterAlias, value]) => {
      const fullAttribute = getFilterRawAttribute(filterAlias)
      if (!fullAttribute) return acc
      const { attribute, type } = fullAttribute
      switch (type) {
        case 'list':
          const previousValue = acc.refinementList[attribute] || []
          return {
            ...acc,
            refinementList: {
              ...acc.refinementList,
              [attribute]: [...previousValue, ...value.split(',')],
            },
          }
        case 'numeric':
          return {
            ...acc,
            numericMenu: {
              ...acc.numericMenu,
              [attribute]: value,
            },
          }
      }
    },
    {
      numericMenu: {},
      refinementList: {},
    }
  )
}

const getFilterAttributeUrlAlias = (rawAttribute: string) => {
  return ALGOLIA_FILTERS.find((filter) => filter.attribute === rawAttribute)
    ?.urlAlias
}

const getFilterRawAttribute = (attributeAlias: string) => {
  return ALGOLIA_FILTERS.find((filter) => filter.urlAlias === attributeAlias)
}
