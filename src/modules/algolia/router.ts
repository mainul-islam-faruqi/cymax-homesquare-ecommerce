import { RouterProps } from 'instantsearch.js/es/middlewares/createRouterMiddleware'
import { UiState } from 'instantsearch.js/es/types'
import singletonRouter from 'next/router'
import { createInstantSearchRouterNext } from 'react-instantsearch-hooks-router-nextjs'
import { DEFAULT_SORTBY, ON_SALE_FILTER, PRICE_FILTER } from './constants'
import {
  getAlgoliaStateFilters,
  getIndexName,
  getRouteFilters,
  getSortByFromIndex,
} from './utils'

interface CustomRouteSearchState {
  query?: string
  sort?: string
  page?: number
  [filters: string]: any
}

interface GetSingleIndexRouterProps {
  indexName: string
  locale: string
  isSearchPage: boolean
  ignorePaging: boolean
  url: string
}

type GetSingleIndexRouter = (
  props: GetSingleIndexRouterProps
) => RouterProps<UiState, UiState>

export const getSingleIndexRouter: GetSingleIndexRouter = (props) => {
  return {
    router: createInstantSearchRouterNext({
      singletonRouter,
      serverUrl: props.url,
      routerOptions: {
        getLocation: () => {
          if (typeof window === 'undefined') {
            return new URL(props.url!) as unknown as Location
          }
          return window.location
        },
        createURL: (route) => {
          const params: string[] = []
          for (const x in route.routeState) {
            if (route.routeState[x]) {
              params.push(
                `${x}=${encodeURIComponent(route.routeState[x] as string)}`
              )
            }
          }

          return `${route.location.pathname}${
            params.length > 0 ? '?' + params.join('&') : ''
          }`
        },
      },
    }),
    stateMapping: {
      stateToRoute: (uiState) => stateToRoute(props, uiState) as UiState,
      routeToState: (routeState) => routeToState(props, routeState),
    },
  }
}

const stateToRoute = (
  { indexName, locale, isSearchPage, ignorePaging }: GetSingleIndexRouterProps,
  uiState: UiState
): CustomRouteSearchState => {
  const indexUiState = uiState[indexName]
  const sort = getSortByFromIndex(indexUiState.sortBy || indexName, locale)
  const refinementList = getRouteFilters(indexUiState.refinementList)
  const numericMenu = getRouteFilters(indexUiState.numericMenu)

  let params = {}

  // Add filters to url.
  if (indexUiState?.refinementList) {
    for (const filter in indexUiState?.refinementList) {
      if (filter !== ON_SALE_FILTER) {
        params = {
          ...params,
          [filter]: indexUiState?.refinementList[filter].join(','),
        }
      }
    }
  }

  // Add range filters to url.
  if (indexUiState?.range) {
    for (const rangeKey in indexUiState?.range) {
      // Special treatment to price.
      if (rangeKey === PRICE_FILTER) {
        params = {
          ...params,
          price: indexUiState?.range[rangeKey],
        }
      } else {
        params = {
          ...params,
          [rangeKey]: indexUiState?.range[rangeKey],
        }
      }
    }
  }

  // Add toggle filters to url.
  if (indexUiState?.toggle) {
    for (const toggleKey in indexUiState?.toggle) {
      if (toggleKey === ON_SALE_FILTER) {
        params = {
          ...params,
          [ON_SALE_FILTER]: indexUiState?.toggle[toggleKey],
        }
      }
    }
  }

  return {
    ...refinementList,
    ...numericMenu,
    query: isSearchPage ? indexUiState.configure?.query : undefined,
    sort: sort !== DEFAULT_SORTBY ? sort : undefined,
    page: !ignorePaging ? indexUiState.page : undefined,
    ...params,
  }
}

const routeToState = (
  { indexName, locale, ignorePaging }: GetSingleIndexRouterProps,
  routeState: CustomRouteSearchState
): UiState => {
  const { query, sort, page, ...rawFilters } = routeState
  const filters = getAlgoliaStateFilters(rawFilters)
  let urlFilters = {}
  let rangeFilters = {}
  let toggleFilters = {}
  for (const key in rawFilters) {
    if ((rawFilters[key] as string).includes(':')) {
      const rangeKey = key === 'price' ? PRICE_FILTER : key
      rangeFilters = {
        ...rangeFilters,
        [rangeKey]: rawFilters[key],
      }
    } else if (key === ON_SALE_FILTER) {
      toggleFilters = {
        ...toggleFilters,
        [ON_SALE_FILTER]: rawFilters[key],
      }
    } else {
      urlFilters = {
        ...urlFilters,
        [key]: (rawFilters[key] as string).split(','),
      }
    }
  }
  return {
    [indexName]: {
      ...filters,
      query: query,
      sortBy: getIndexName(locale, sort),
      page: !ignorePaging ? page : undefined,
      refinementList: urlFilters,
      range: rangeFilters,
      toggle: toggleFilters,
    },
  }
}
