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

  // useEffect to handle popstate events for route changes
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
        console.log('Event:', event)
        router.push(targetUrl)
      }
    }
    window.addEventListener('popstate', handlePopstate)
    return () => {
      // Cleanup: Remove the event listener when the component is unmounted
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [router])

  // Effect to handle detailClicked state stored in session storage mounting from PDP to PLP
  useEffect(() => {
    const detailClicked = getItem('detailClicked')
    setDetailClicked(detailClicked)

    return () => {
      setItem('detailClicked', false)
    }
  }, [getItem, setItem])

  // Effect to fetch from Algolia and manage product data upto current page
  // based on different conditions (pages, routeChanged, isShowMore, etc.)
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
        console.log('router', router)
        if (
          routeChanged &&
          !isShowMore &&
          !isPopstate &&
          !detailClicked &&
          !router.query.page
        ) {
          setAllProducts([...hits])
          setRouteChanged(false)
          console.log(routeChanged, 'routeChanged')
          console.log(
            'routeChanged && !isShowMore && !isPopstate && !detailClicked',
            router
          )
        } else if (
          Object.keys(router.query).length > 1 &&
          !isShowMore &&
          !isPopstate &&
          !detailClicked &&
          !router.query.page
        ) {
          // This block for filters
          setAllProducts([...hits])
          console.log(
            '(Object.keys(router.query).length > 1 && !isShowMore && !isPopstate && !detailClicked',
            router,
            nbHits,
            hits
          )
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
          console.log(allProducts, currentPageHits, 'isShowMore nbHits')
          console.log(nbHits, 'isShowMore nbHits')
          setAllProducts((prevProducts) => [
            ...prevProducts,
            ...currentPageHits,
          ])
          setIsShowMore(false)
        } else if (!isShowMore && page && page + 1 === hits.length / 24) {
          console.log(hits.length, page + 1, 'hits page + 1')
          
          setAllProducts([...hits])
        } else if (router.query.page && Object.keys(router.query).length > 2) {
          setAllProducts([...hits])
          console.log(hits.length, hits, results, 'hits results')
        } else if (!isShowMore) {
          console.log(nbHits, 'else ')
          const products = await getAllProductsUpToCurrentPage(page ?? 0)
          console.log(products, ' else products')
          setAllProducts(products)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [routeChanged, page, isPopstate, detailClicked, isShowMore, router, hits])
  // console.log('166', allProducts)
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

  // Effect to handle route changes, skipping the pages route, setting routeChanged state
  useEffect(() => {
    if (!Boolean(Number(router.query.page))) {
      setRouteChanged(true)
    }
    const handleRouteChangeStart = (url: string) => {
      console.log(url)
      if (!url.includes('page')) {
        setRouteChanged(true)
      }

      if (url.includes('page')) {
        window.history.replaceState(null, '', url)
      }
    }

    // Subscribe to the router events
    router.events.on('routeChangeStart', handleRouteChangeStart)

    // Cleanup the subscriptions when the component is unmounted
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)

      setRouteChanged(false)
    }
  }, [router])

  // useLayoutEffect to manage and restore scroll position
  useLayoutEffect(() => {
    let scrollPositionKey = ''
    let savedScrollPosition = 0
    if (router.asPath.includes('query')) {
      scrollPositionKey = router.asPath.split('&')[0]
    } else if (router.asPath.includes('?page')) {
      scrollPositionKey = router.asPath.split('?')[0]
    } else if (router.query.slug) {
      scrollPositionKey = router.query.slug[0]
    } else {
      scrollPositionKey = router.asPath
    }

    function updateScroll() {
      savedScrollPosition = Math.ceil(
        window.scrollY ? window.scrollY : savedScrollPosition
      )

      sessionStorage.setItem(scrollPositionKey, savedScrollPosition.toString())
    }

    // restoring scroll position if any from session storage after loading all products
    // Also work for back and forward navigation
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
                  total: Math.ceil((nbHits ?? 1) / hitsPerPage),
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
