import { Button, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react'
import { useSessionStorage } from '@modules/app/hooks/useSessionStorage'
import { useGetMultipleStocks } from '@modules/ep'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useInfiniteHits } from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'
import { ALGOLIA_BASE_INDEX } from '../../../../algolia'
import { useGridLayout } from '../../../components'
import { CategoryProductCard } from '../Parts/CategoryProductCard'

import { searchClient } from '../'

/**
 * The number of items rendered per page in this component is configured by the nearest (in the tree) <Configure> component
 * @param props
 * @returns
 */
export interface InfiniteHitsProps {
  filters: string
  searchQuery: string
}

export const InfiniteHits = (props: InfiniteHitsProps) => {
  const index = searchClient.initIndex(ALGOLIA_BASE_INDEX)
  const { getItem, setItem } = useSessionStorage()
  const router = useRouter()
  const [routeChanged, setRouteChanged] = useState<Boolean>(false)
  const [isShowMore, setIsShowMore] = useState<Boolean>(false)
  const [isPopstate, setIsPopstate] = useState<Boolean>(false)
  const [detailClicked, setDetailClicked] = useState<Boolean>(false)
  const { hits, currentPageHits, isLastPage, showMore, results } =
    useInfiniteHits()
  const { gridTemplateColumns, hitsPerPage } = useGridLayout()
  const { page, nbPages, nbHits } = results || {}

  const [allProducts, setAllProducts] = useState<any[]>([])

  useEffect(() => {
    const handlePopstate = (event: any) => {
      setIsShowMore(false)
      setIsPopstate(true)

      const targetUrl = event.state
        ? (event.state as { url: string }).url === '/?'
          ? '/'
          : (event.state as { url: string }).url
        : event.currentTarget instanceof Window &&
          event.currentTarget.history?.state?.as

      if (router) {
        router.push(targetUrl)
      }
    }
    window.addEventListener('popstate', handlePopstate)
  }, [router])

  useEffect(() => {
    const detailClicked = getItem('detailClicked')
    setDetailClicked(detailClicked)

    return () => {
      setItem('detailClicked', false)
    }
  }, [getItem, setItem])

  useEffect(() => {
    async function getAllProductsUpToCurrentPage(currentPageNumber: number) {
      const allProducts = []

      for (let page = 0; page <= currentPageNumber; page++) {
        const { hits: indexSearchResult } = await index.search(
          props.searchQuery ? props.searchQuery : '',
          {
            filters: props.filters,
            page: page,
            hitsPerPage: 24,
          }
        )

        allProducts.push(...indexSearchResult)
      }

      return allProducts
    }
    const fetchData = async () => {
      try {
        if (routeChanged && !isShowMore && !isPopstate && !detailClicked) {
          setAllProducts([...hits])
          setRouteChanged(false)
        } else if (!isShowMore && (isPopstate || detailClicked)) {
          const products = await getAllProductsUpToCurrentPage(page ?? 0)

          setAllProducts(products)
          setIsPopstate(false)
        } else if (
          isShowMore &&
          page &&
          page === allProducts.length / 24 &&
          (router.query.page ? Number(router.query.page) : 1) === page + 1
        ) {
          setAllProducts((prevProducts) => [
            ...prevProducts,
            ...currentPageHits,
          ])
          setIsShowMore(false)
        } else if (!isShowMore && page && page + 1 === hits.length / 24) {
          setAllProducts([...hits])
        } else {
          const products = await getAllProductsUpToCurrentPage(page ?? 0)

          setAllProducts(products)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [
    routeChanged,
    page,
    isPopstate,
    detailClicked,
    isShowMore,
    router.events,
    hits,
  ])

  const intl = useIntl()
  const objectIds = hits.map((product, index) => {
    return { id: product.objectID }
  })
  const { stocks } = useGetMultipleStocks(objectIds)

  const gridBorderStyle = {
    borderRight: '1px solid',
    borderBottom: '1px solid',
    borderColor: 'gray.200',
    '@media (max-width:639px)': {
      ':nth-of-type(2n)': {
        borderRight: 'none',
      },
      ':nth-last-child(-n+2)': {
        borderBottom: 'none',
      },
    },
    '@media (min-width:640px) and (max-width:1023px)': {
      ':nth-of-type(3n)': {
        borderRight: 'none',
      },
      ':nth-last-child(-n+3)': {
        borderBottom: 'none',
      },
    },
    '@media (min-width:1024px)': {
      ':nth-of-type(4n)': {
        borderRight: 'none',
      },
      ':nth-last-child(-n+4)': {
        borderBottom: 'none',
      },
    },
  }

  useEffect(() => {
    if (!!Number(router.query.page)) {
    }

    if (!Boolean(Number(router.query.page))) {
      setRouteChanged(true)
    }
    const handleRouteChangeStart = (url: string) => {
      const hasNoPageQueryParam = !Number(router.query.page)

      if (!url.includes('page')) {
        setRouteChanged(true)
      } else if (url.includes('page')) {
        window.history.replaceState(null, '', url)
      }
    }

    const handleRouteChangeComplete = (url: String) => {
      if (url.includes('page')) {
      }
    }

    // Subscribe to the router events
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    // Cleanup the subscriptions when the component is unmounted
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)

      setRouteChanged(false)
    }
  }, [router])

  useLayoutEffect(() => {
    let scrollPositionKey = ''
    let savedScrollPosition = 0
    if (router.asPath.includes('query')) {
      scrollPositionKey = router.asPath.split('&page')[0]
    } else if (router.asPath.includes('?page')) {
      scrollPositionKey = router.asPath.split('?')[0]
    } else {
      scrollPositionKey = router.asPath
    }

    function updateScroll() {
      savedScrollPosition = Math.ceil(
        window.scrollY ? window.scrollY : savedScrollPosition
      )

      sessionStorage.setItem(scrollPositionKey, savedScrollPosition.toString())
    }

    // restoring scroll position if any from session storage
    if (allProducts.length > 4) {
      const scrollPosition = sessionStorage.getItem(scrollPositionKey)
      if (scrollPosition) {
        savedScrollPosition = parseInt(scrollPosition)
        window.scrollTo(0, savedScrollPosition)
      }
      window.addEventListener('scroll', updateScroll)
    }

    const removeEventListeners = () => {
      window.removeEventListener('scroll', updateScroll)
    }

    return () => {
      removeEventListeners()
    }
  }, [hits, allProducts.length, router])

  return (
    <>
      <VStack w="full">
        <Grid width="full" gridTemplateColumns={gridTemplateColumns}>
          {allProducts.map((product, index) => {
            return (
              <GridItem
                key={product.objectID}
                gap={{ base: 'mobile', md: 'desktop' }}
                sx={gridBorderStyle}
              >
                <CategoryProductCard
                  index={index}
                  product={product}
                  priority={index < 3}
                  stock={stocks?.find((stock) => stock.id === product.objectID)}
                />
              </GridItem>
            )
          })}
        </Grid>
        {!isLastPage && (
          <Flex flexDir="column" alignItems="center" p={25}>
            <Text fontSize={{ base: 'desktop.bodySM', md: 'desktop.body' }}>
              {intl.formatMessage(
                { id: 'productListingPage.pageNo' },
                {
                  pageNo: page ? page + 1 : hits.length / hitsPerPage,
                  total: Math.ceil(nbHits ?? 1 / hitsPerPage),
                }
              )}
            </Text>
            <Button
              mt={3.5}
              variant="outline"
              height={10}
              fontSize="desktop.bodySM"
              onClick={() => {
                setIsShowMore(true)
                showMore()
              }}
            >
              {intl.formatMessage({ id: 'action.showMore' })}
            </Button>
          </Flex>
        )}
      </VStack>
    </>
  )
}
