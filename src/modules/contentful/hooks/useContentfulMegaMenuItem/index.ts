import { useQuery } from 'react-query'
import { useComposable } from '@myplanetdigital/base'
import {
  getMegaMenuItemQuery,
  GetMegaMenuItemQuery,
  GetMegaMenuItemQueryVariables,
  contentfulGraphqlClient,
} from '@modules/contentful/utils'

export const getContentfulMegaMenuItemKey = (id: string, locale: string) => [
  'useContentfulMegaMenuItem',
  locale ?? '',
  id ?? '',
]

export const useContentfulMegaMenuItem = (id: string) => {
  const { locale } = useComposable()

  const query = useQuery(
    getContentfulMegaMenuItemKey(id, locale),
    () => {
      return contentfulMegaMenuItemFetchService({ id, locale })
    },
    {
      keepPreviousData: true,
    }
  )

  return {
    data: query.data,
    children: query.data?.childrenCollection?.items,
    hasChildren: Boolean(query.data?.childrenCollection?.items?.length),
    isNoMatch: query.data === null,
    isLoading: query.data === undefined,
    isLoaded: Boolean(query.data),
  }
}

export const contentfulMegaMenuItemFetchService = async (
  variables: GetMegaMenuItemQueryVariables
) => {
  const res = await contentfulGraphqlClient
    .query<GetMegaMenuItemQuery, GetMegaMenuItemQueryVariables>(
      getMegaMenuItemQuery,
      variables
    )
    .toPromise()

  return res.data?.megaMenuItem ?? null
}
