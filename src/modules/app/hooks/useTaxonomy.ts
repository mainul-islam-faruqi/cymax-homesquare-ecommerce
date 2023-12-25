import {
  EpNodeAttributes,
  EpNodeWithRelationships,
} from '@modules/ep/taxonomy/types'
import { useQuery } from 'react-query'
import { getTaxonomyData } from '../utils'

export interface TaxonomyInterface {
  children: EpNodeWithRelationships
  description?: string
  isLoading?: boolean
  isFetching?: boolean
  name?: string
  slug?: string
  type?: string
  attributes?: EpNodeAttributes
}

export const useTaxonomy = (slug: string = '', routePattern: any) => {
  const query = useQuery(
    ['useTaxonomy', slug],
    async () => await getTaxonomyData(slug),
    {
      keepPreviousData: true,
      enabled:
        slug !== undefined &&
        slug.length > 0 &&
        routePattern?.type == 'category',
    }
  )

  return {
    ...(query.data as TaxonomyInterface),
    isLoading: query.isLoading,
    isFetching: query?.isFetching,
  }
}
