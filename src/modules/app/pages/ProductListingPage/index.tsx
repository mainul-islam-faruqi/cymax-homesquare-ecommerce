import { useGtmPageView } from '@modules/gtm'
import { useComposable } from '@myplanetdigital/base'
import algoliasearch from 'algoliasearch/lite'

import { NEXT_PUBLIC_BAZAARVOICE_URL } from '@modules/app/constants'
import { PreviewBanner } from '@modules/contentful/pages/PageBlocks/PreviewBanner'
import {
  ContentfulEntry,
  ContentfulPLPPage,
} from '@modules/contentful/pages/types'
import Script from 'next/script'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import {
  ALGOLIA_APP_ID,
  ALGOLIA_BASE_INDEX,
  ALGOLIA_SEARCH_API_KEY,
  getIndexName,
  getSingleIndexRouter,
} from '../../../algolia'
import { PageContainer } from '../../components/PageContainer'
import { Breadcrumb } from '../ProductDetailsPage'
import { InnerProductListingPage } from './Parts/InnerProductListingPage'

const algoliaConfig = {
  appId: ALGOLIA_APP_ID || '',
  searchApiKey: ALGOLIA_SEARCH_API_KEY || '',
  baseIndex: ALGOLIA_BASE_INDEX || '',
}

export const searchClient = algoliasearch(
  algoliaConfig.appId,
  algoliaConfig.searchApiKey
)

export interface ProductListingPageProps {
  isSearchPage: boolean
  query: { [key: string]: string | string[] }
  slug?: string
  routePattern?: any
  description?: string
  taxonomy?: Breadcrumb[]
  host?: string
  ctfEntry?: ContentfulEntry<ContentfulPLPPage>
  isPreview?: boolean
}

export const ProductListingPage = ({
  isSearchPage,
  query,
  slug,
  routePattern,
  description,
  taxonomy,
  host,
  ctfEntry,
  isPreview = false,
}: ProductListingPageProps) => {
  const { locale } = useComposable()
  const algoliaIndex = getIndexName(locale)
  const algoliaRouter = getSingleIndexRouter({
    indexName: algoliaIndex,
    locale,
    isSearchPage,
    ignorePaging: true,
    url: '',
  })

  useGtmPageView({
    ecomm_pagetype: isSearchPage ? 'search-results' : 'category',
    ecomm_pcat: isSearchPage ? `search-${query}` : 'category',
  })

  console.log('query', query)
  console.log('slug', slug)
  let filters = routePattern?.facetsToApply?.join(' AND ') ?? ''
  console.log("filters", filters)
  
  return (
    <>
      <Script
        defer
        strategy="lazyOnload"
        type="text/javascript"
        src={NEXT_PUBLIC_BAZAARVOICE_URL}
      />
      <PageContainer>
        <>
          {isPreview && <PreviewBanner />}
          <InstantSearch
            searchClient={searchClient}
            indexName={algoliaIndex}
            routing={algoliaRouter}
          >
            <InnerProductListingPage
              isSearchPage={isSearchPage}
              query={query}
              slug={slug}
              routePattern={routePattern}
              algoliaIndex={algoliaIndex}
              description={description}
              taxonomy={taxonomy}
              host={host}
              ctfEntry={ctfEntry?.fields}
            />
          </InstantSearch>
        </>
      </PageContainer>
    </>
  )
}
