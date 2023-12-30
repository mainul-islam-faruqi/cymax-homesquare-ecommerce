import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Spacer,
} from '@chakra-ui/react'
import {
  Breadcrumb,
  GridLayoutProvider,
  NEXT_PUBLIC_SITE_IDENTIFIER,
} from '@modules/app'
import { formattedValueToFloat } from '@modules/app/utils'
import { BreadcrumbsHierarchy } from '@modules/components/BreadcrumbsHierarchy'
import { ContentfulPLPPage } from '@modules/contentful/pages/types'
import { hitsViewed, viewItemList } from '@modules/gtm/search'
import { Items } from '@modules/gtm/search/types'
import _find from 'lodash/find'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useInfiniteHits,
  useInstantSearch,
} from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'
import { ALGOLIA_INDEX_LIST } from '../../../../algolia'
import { EmptyResultsHandler, EmptyResultsText } from '../EmptyResultsHandler'
import { CurrentRefinements, InfiniteHits, SortBy } from '../Filtering'
import { AlgoliaConfiguration } from '../Filtering/AlgoliaConfiguration'
import { Filters } from '../Parts/Filters'
import { FiltersModal } from '../Parts/FiltersModal'
import { GridLayoutControls } from '../Parts/GridLayoutControls'
import { ItemCount } from '../Parts/ItemCount'
import { SaleToogleFilter } from './SaleToogleFilter'
import { SkeletonProductCard } from './SkeletonProductCard'

export interface ProductListingPageProps {
  isSearchPage: boolean
  query: { [key: string]: string | string[] }
  slug?: string
  routePattern?: any
  algoliaIndex: string
  description?: string
  taxonomy?: Breadcrumb[]
  host?: string
  ctfEntry?: ContentfulPLPPage
}

export const InnerProductListingPage = ({
  isSearchPage,
  query,
  slug,
  routePattern,
  algoliaIndex,
  description,
  taxonomy,
  host,
  ctfEntry,
}: ProductListingPageProps & { algoliaIndex: string }) => {
  const router = useRouter()
  const searchQuery = query.query ?? ''
  const intl = useIntl()
  const categoryName = _find(
    taxonomy,
    ({ slug: taxonomySlug }) =>
      slug?.toLowerCase() === taxonomySlug.toLowerCase()
  )?.name
  const store = host?.replace(/^https?:\/\//, '')
  const storeLiteral = NEXT_PUBLIC_SITE_IDENTIFIER
  const seoTitle: string =
    ctfEntry?.seo?.fields?.title ||
    (isSearchPage
      ? (searchQuery as string)
      : intl.formatMessage(
          { id: 'productListingPage.seo.title' },
          { categoryName, host: store }
        )) ||
    ''
  const seoDescription: string =
    ctfEntry?.seo?.fields?.description ||
    (isSearchPage
      ? (searchQuery as string)
      : storeLiteral === 'cymax'
      ? intl.formatMessage(
          {
            id: 'productListingPage.seo.cymaxDescription',
          },
          { categoryName }
        )
      : intl.formatMessage(
          {
            id: 'productListingPage.seo.homesquareDescription',
          },
          { categoryName }
        )) ||
    ''

  const { hits } = useInfiniteHits({})
  const { status, uiState, results }: any = useInstantSearch()
  const [areResultsReady, setAreResultsReady] = useState(false)
  useEffect(() => {
    setAreResultsReady(
      status !== 'loading' && (results?.params !== '' || results?.query !== '')
    )
  }, [status, results?.query, results?.params])
  const additionalMetaTags = useMemo(() => {
    return (ctfEntry?.seo?.fields?.metaTags || []).map((tag) => {
      return { ...tag.fields }
    })
  }, [ctfEntry])

  const handleViewItemList = useCallback((hits: any[]) => {
    const payload = hits?.map((hit) => {
      const salePrice = formattedValueToFloat(
        hit?.listPrice?.USD?.sale_prices?.float_price
      ) as number
      const listPrice = formattedValueToFloat(
        hit?.listPrice?.USD?.sale_prices?.original_price?.float_price ||
          hit?.listPrice?.USD?.float_price
      ) as number
      return {
        item_id: hit.sku,
        item_name: hit.name,
        discount: listPrice - salePrice,
        index: 0,
        item_brand: hit.brand,
        item_variant: hit.SolidColor,
        price: salePrice || listPrice,
        quantity: 1,
      }
    }) as Items[]
    hitsViewed()
    viewItemList({
      ecommerce: {
        items: payload,
      },
    })
  }, [])

  useEffect(() => {
    if (!hits?.length) return
    handleViewItemList(hits)
  }, [hits?.length])

  
  useCallback(() => {
    const scrollPositionKey = router.asPath
    function updateScroll() {
      sessionStorage.setItem(scrollPositionKey, window.scrollY.toString())
    }

    // restoring scroll position if any from session storage
    const scrollPosition = sessionStorage.getItem(scrollPositionKey)

    if (hits.length > 0 && scrollPosition) {
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(scrollPosition))
      })

      console.log('window.scrollY', window.scrollY)
    }
    window.addEventListener('scroll', updateScroll)
    const removeEventListeners = () => {
      window.removeEventListener('scroll', updateScroll)
    }
    router.events.on('routeChangeStart', removeEventListeners)
    return () => {
      // Remove the event listener when the component is unmounted.
      window.removeEventListener('scroll', updateScroll)
      router.events.off('routeChangeStart', removeEventListeners)
    }
  }, [hits, router.asPath, router.events])

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={isSearchPage ? '' : host + '/' + slug}
        additionalMetaTags={additionalMetaTags}
      />
      <GridLayoutProvider>
        <AlgoliaConfiguration
          query={searchQuery as string}
          isSearchPage={isSearchPage}
          routePattern={routePattern}
          ctfEntry={ctfEntry}
        />
        <Box mb={{ base: 3 }}>
          {!areResultsReady ? (
            <Skeleton height="24px" width="200px" />
          ) : (
            query && (
              <BreadcrumbsHierarchy
                taxonomy={taxonomy}
                ctfBreadcrumbs={ctfEntry?.breadcrumbs}
              />
            )
          )}
        </Box>

        <Heading
          as={routePattern?.code == '--C' ? 'h1' : 'h2'}
          fontSize={{ base: 'xxl', lg: 'desktop.lg' }}
          fontWeight="extrabold"
          textTransform={isSearchPage ? 'none' : 'capitalize'}
          marginBottom={{ base: 1, lg: 10 }}
          lineHeight="1.2"
        >
          {!areResultsReady ? (
            <Skeleton height="38px" width="260px" />
          ) : (
            <>
              <EmptyResultsHandler
                hits={hits}
                query={query}
                title={ctfEntry?.title || routePattern?.title || ''}
                isSearchPage={isSearchPage}
                rawTitle={ctfEntry?.title != null}
              />
              <EmptyResultsText hits={hits} routePattern={routePattern} />
            </>
          )}
        </Heading>
        <Flex direction={{ base: 'column', lg: 'row' }} alignItems="stretch">
          <Box
            flexBasis={72}
            flexShrink={0}
            display={{ base: 'none', lg: 'initial' }}
          >
            <Heading as="h2" fontSize="xl" fontWeight="extrabold" mb={2}>
              {!areResultsReady ? (
                <Skeleton height="28.8px" width="70px" />
              ) : (
                intl.formatMessage({ id: 'category.filters.filter' })
              )}
            </Heading>
            {!areResultsReady && <SkeletonText noOfLines={40} spacing={3} />}
            <Box opacity={!areResultsReady ? 0 : 1}>
              <Filters
                uiState={uiState}
                algoliaResults={results}
                algoliaIndex={algoliaIndex}
                routePattern={routePattern}
              />
            </Box>
          </Box>

          <Flex
            direction="column"
            w="full"
            ml={{ base: 0, lg: 10 }}
            mt={{ base: 4, lg: 0 }}
            data-insights-index={algoliaIndex}
          >
            <Flex align="center" alignItems="end">
              <ItemCount />
              <Spacer />
              <SaleToogleFilter />
              <GridLayoutControls />
              <Box ml={8} display={{ base: 'none', lg: 'initial' }}>
                <SortBy items={ALGOLIA_INDEX_LIST} />
              </Box>
            </Flex>

            <SimpleGrid
              id="mobileView"
              mt={5}
              columns={2}
              display={{ base: 'flex', lg: 'none' }}
              spacing={{ base: 'mobile', md: 'desktop' }}
            >
              <Flex w="100%" direction="column">
                <FiltersModal
                  uiState={uiState}
                  algoliaResults={results}
                  algoliaIndex={algoliaIndex}
                  routePattern={routePattern}
                />
              </Flex>
              <Box w="100%">
                <SortBy items={ALGOLIA_INDEX_LIST} />
              </Box>
            </SimpleGrid>

            <CurrentRefinements />
            {!areResultsReady && (
              <SimpleGrid
                width="full"
                columns={{ base: 2, sm: 3, lg: 4 }}
                gap={{ base: 'mobile', md: 'desktop' }}
                mt={{ base: 8, lg: 10 }}
              >
                {Array.from({ length: 12 }).map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))}
              </SimpleGrid>
            )}
            {hits.length > 0 && (
              <Box
                id="productListDiv"
                opacity={!areResultsReady ? 0 : 1}
                mt={{ base: 8, lg: 10 }}
                w="full"
              >
                <InfiniteHits />
              </Box>
            )}
          </Flex>
        </Flex>
      </GridLayoutProvider>
    </>
  )
}
