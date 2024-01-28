import { Button, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react'
import { useSessionStorage } from '@modules/app/hooks/useSessionStorage'
import { useGetMultipleStocks } from '@modules/ep'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
}

export const InfiniteHits = (props: InfiniteHitsProps) => {
  const index = searchClient.initIndex(ALGOLIA_BASE_INDEX)
  const { getItem, setItem } = useSessionStorage()
  const router = useRouter()
  const [currPage, setCurrPage] = useState<number>(1)
  const [routeChanged, setRouteChanged] = useState<Boolean>(false)
  const [isShowMore, setIsShowMore] = useState<Boolean>(false)
  const [isPopstate, setIsPopstate] = useState<Boolean>(false)
  const [detailClicked, setDetailClicked] = useState<Boolean>(false)
  const { hits, currentPageHits, isLastPage, showMore, results } =
    useInfiniteHits()
  const { gridTemplateColumns } = useGridLayout()
  const { page, nbPages } = results || {}

  const [allProducts, setAllProducts] = useState<any[]>([])
  // console.log(detailClicked, 'detailClicked')
  useEffect(() => {
    window.addEventListener('popstate', (event) => {
      setIsShowMore(false)
      setIsPopstate(true)
      console.log('event.data', event)
      console.log('page', page)
      console.log('event.state.url', event.state.url)
      // router.push(event?.state?.url && event?.state?.url)
    })
    console.log('Number(router.query.page)', Number(router.query.page))
  }, [router])


  useEffect(() => {
    const detailClicked = getItem('detailClicked')
    setDetailClicked(detailClicked)
    console.log('detailClicked', detailClicked)
    return () => {
      setItem('detailClicked', false)
    }
  }, [getItem, setItem])

  useEffect(() => {
    async function getAllProductsUpToCurrentPage(currentPageNumber: number) {
      const allProducts = []
      console.log('currentPageNumber', currentPageNumber)
      for (let page = 0; page <= currentPageNumber; page++) {
        console.log('page inside for loop', page)
        const { hits } = await index.search('', {
          filters: props.filters,
          page: page,
          hitsPerPage: 24,
        })
        allProducts.push(...hits)
      }

      return allProducts
    }
    const fetchData = async () => {
      try {
        // window.addEventListener('popstate', (event) => {
        //   setIsShowMore(false)
        // })
        console.log('isShowmore routeChanged', isShowMore, routeChanged)
        console.log('isPopState', isPopstate, detailClicked)
        console.log('page', page)
        console.log('hits.length', hits.length)
        console.log('allproducts.length', allProducts.length)
        console.log('hits', hits)
        if (routeChanged && !isShowMore && !isPopstate && !detailClicked) {
          setAllProducts([...hits])
          setRouteChanged(false)
        } else if (!isShowMore && (isPopstate || detailClicked)) {
          console.log('allProducts allProducts', allProducts)
          const products = await getAllProductsUpToCurrentPage(page ?? 0)
          console.log('products', products)
          setAllProducts(products)
          setIsPopstate(false)
        } else if (
          isShowMore &&
          page &&
          page === allProducts.length / 24 &&
          (router.query.page ? Number(router.query.page) : 1) === page + 1
        ) {
          console.log(
            'inner, currentPageHits allProducts',
            page,
            currentPageHits.length,
            allProducts.length
          )
          setAllProducts((prevProducts) => [
            ...prevProducts,
            ...currentPageHits,
          ])
          setIsShowMore(false)
        } else if (!isShowMore && page && page + 1 === hits.length / 24) {
          console.log('Hits', hits)
          setAllProducts([...hits])
        } else {
          console.log('allProducts allProducts', allProducts)
          const products = await getAllProductsUpToCurrentPage(page ?? 0)
          console.log('products', products)
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

  // Use allProducts to render your UI or perform other actions
  // console.log(allProducts)

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

  const prevPathnameRef = useRef()

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      // Triggered when a route change starts
      console.log('Route change started:', url)
      const hasNoPageQueryParam = !Number(router.query.page)
      console.log('router.query.page', router.query.page)
      console.log('url', url)
      if (hasNoPageQueryParam) {
        console.log('No page query or page is not equal to 3')
        // You can perform additional actions or redirect if needed
        setRouteChanged(true)
      }

      console.log(window.history)
    }

    const handleRouteChangeComplete = (url) => {
      // Triggered when a route change is complete
      console.log(
        'Route change completed:',
        url,
        router.pathname,
        router.query.page,
        router.query,
        router,
        router.query.page
      )
      window.history.replaceState({}, '', url)
      // const newUrl = url.replace(/\?.*page=\d+/, '')
      // console.log(newUrl, 'newURL')
      if (url.includes('page')) {
        // const newUrl = router.asPath.replace(/\?.*page=\d+/, '')
        // console.log(newUrl, 'newURL')
        // router.push(newUrl, undefined, { shallow: true })
        // router.replace(
        //   { pathname: newUrl, query: { ...router.query } },
        //   undefined,
        //   { shallow: true }
        // )

        // window.history.replaceState({ path: url }, '', newUrl)
      }

      // Your other code specific to routeChangeComplete
      console.log('Running code after routeChangeComplete')
    }

    // const handleRouteChangeError = (error, url) => {
    //   // Triggered when a route change encounters an error
    //   console.error('Route change error:', error)
    //   console.error('Error occurred at URL:', url)
    // }

    // Subscribe to the router events
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    // router.events.on('routeChangeError', handleRouteChangeError)

    // Cleanup the subscriptions when the component is unmounted
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      // router.events.off('routeChangeError', handleRouteChangeError)
      setRouteChanged(false)
    }
  }, [router])

  useLayoutEffect(() => {
    const scrollPositionKey = router.asPath.split('?')[0]

    function updateScroll() {
      sessionStorage.setItem(scrollPositionKey, window.scrollY.toString())
    }

    // restoring scroll position if any from session storage
    if (allProducts.length > 4) {
      const scrollPosition = sessionStorage.getItem(scrollPositionKey)
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition))
      }
    }
    window.addEventListener('scroll', updateScroll)

    const removeEventListeners = () => {
      window.removeEventListener('scroll', updateScroll)
    }
    // router.events.on('routeChangeStart', removeEventListeners)

    return () => {
      // Remove the event listener when the component is unmounted.
      removeEventListeners()
      // router.events.off('routeChangeStart', removeEventListeners)
    }
  }, [hits, allProducts.length, router?.asPath, router?.events, window.scrollY])

  return (
    <>
      {/* add canonical link  */}
      {/* <Head>
        <link rel="canonical" href={window.location.href} />
      </Head> */}
      <VStack w="full">
        <Grid width="full" gridTemplateColumns={gridTemplateColumns}>
          {(routeChanged ? hits : allProducts).map((product, index) => {
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
                  pageNo: page + 1,
                  total: nbPages,
                }
              )}
            </Text>
            <Button
              mt={3.5}
              variant="outline"
              height={10}
              fontSize="desktop.bodySM"
              onClick={() => {
                setCurrPage((currentPage) => currentPage + 1)
                setIsShowMore(true)
                // router.push(
                //   `${
                //     router.asPath.includes('?')
                //       ? router.asPath.split('?')[0]
                //       : router.asPath
                //   }?page=${currPage + 1}`
                // )
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
