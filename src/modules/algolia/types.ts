import { AlgoliaProduct } from '@myplanetdigital/algolia'
import {
  UseNumericMenuProps,
  UseRefinementListProps,
} from 'react-instantsearch-hooks-web'

export type GridLayoutOption =
  | 'standard'
  | 'comfortable'
  | 'condensed'
  | 'single'

/**
 * This type MUST correspond to the postfix name of an index in Algolia, ex [BASE_INDEX_NAME]_[SortByOption]
 */
export type SortByOption =
  | 'bestMatch'
  | 'newest'
  | 'nameAlphabetical'
  | 'priceAsc'
  | 'priceDesc'
  | 'mostPopular'

export type AlgoliaFilterItem = (
  | (NumericMenuProps & Numeric)
  | (RefinementListProps & List)
) &
  UrlAlias

export interface NumericMenuProps
  extends UseNumericMenuProps,
    RefinementBaseProps {}
export interface RefinementListProps
  extends UseRefinementListProps,
    RefinementBaseProps {}

export interface RefinementBaseProps {
  /** Translation key for react-intl. Used to label the Refinement */
  translationKey: string
}

//buliding block types for the AlgoliaFilterItem interface
type Numeric = { type: 'numeric' }
type List = { type: 'list' }

/** This alias will be used to map the filter to the url. Must be unique. */
type UrlAlias = {
  urlAlias: string
}

export type StarterKitAlgoliaProduct = AlgoliaProduct & {
  //custom typings go here
  attributes: {
    normalized: {
      brand: string
      rating: number
    }
    raw: {
      brand: string
      rating: number
    }
  }
}

export type CymaxAlgoliaProduct = AlgoliaProduct & {
  ep_slug_categories: {
    [key: string]: string | string[]
  }
  ep_categories: {
    [key: string]: string | string[]
  }
}
