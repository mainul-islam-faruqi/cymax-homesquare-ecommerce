import { useQuery } from 'react-query'
import { useComposable } from '@myplanetdigital/base'
import {
  getMegaMenuQuery,
  GetMegaMenuQuery,
  GetMegaMenuQueryVariables,
  contentfulGraphqlClient,
} from '@modules/contentful/utils'

export const getContentfulMegaMenuKey = (locale: string) => [
  'useContentfulMegaMenu',
  locale ?? '',
]

export const useContentfulMegaMenu = (site: string) => {
  const { locale } = useComposable()

  const query = useQuery(
    getContentfulMegaMenuKey(locale),
    () => {
      return contentfulMegaMenuFetchService({ locale, site })
    },
    {
      keepPreviousData: true,
    }
  )

  return {
    data: query.data,
    isNoMatch: query.data === null,
    isLoading: query.data === undefined,
    isLoaded: Boolean(query.data),
  }
}

export const contentfulMegaMenuFetchService = async (
  variables: GetMegaMenuQueryVariables
) => {
  const res = await contentfulGraphqlClient
    .query<GetMegaMenuQuery, GetMegaMenuQueryVariables>(
      getMegaMenuQuery,
      variables
    )
    .toPromise()
  return res.data?.megaMenuCollection ?? null
}
