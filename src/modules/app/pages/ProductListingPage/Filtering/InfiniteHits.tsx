import { Button, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react'
import { useGetMultipleStocks } from '@modules/ep'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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

  // Function to load products up to a specified page

  const router = useRouter()
  const [currPage, setCurrPage] = useState<number>(1)
  const { hits, isLastPage, showMore, results } = useInfiniteHits()
  const { gridTemplateColumns } = useGridLayout()
  const { page, nbPages } = results || {}

  console.log('page', page)
  // console.log('currentPageHits', currentPageHits)
  const [allProducts, setAllProducts] = useState<any[]>([])

  useEffect(() => {
    async function getAllProductsUpToCurrentPage(currentPageNumber: number) {
      const allProducts = []
      console.log('currentPageNumber', currentPageNumber)
      for (let page = 0; page <= currentPageNumber; page++) {
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
        const products = await getAllProductsUpToCurrentPage(page ?? 0)
        console.log('products', products)
        setAllProducts(products)
        // setAllProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [page])

  // Use allProducts to render your UI or perform other actions
  console.log('allProducts', allProducts)
  console.log('Hits', hits)

  const loadProductsUpToPage = async (page: number) => {
    let currentPage = 0

    // Keep fetching until the current page reaches the target page
    while (currentPage < page ?? 1) {
      // showMore()
      currentPage += 1
    }
  }

  // Load all products up to page 3 on initial render
  useEffect(() => {
    // Use a regular expression to match the page parameter and extract the number
    const match = router.asPath.match(/(?:\?|&)page=(\d+)/)

    // Check if there's a match and extract the page number
    const pageNumber = match ? parseInt(match[1], 10) : 0

    console.log(pageNumber) // Output: 5

    loadProductsUpToPage(pageNumber)
  }, [page])
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
  const handleShowMore = () => {
    // Increment the page count
    const nextPage = currPage + 1

    // Update the URL with the new page parameter
    router.push(`/${router.asPath.split('?')[0]}?page=${nextPage}`, undefined, {
      shallow: true,
    })

    // Update the local state
    setCurrPage(nextPage)

    // Trigger the showMore method
    showMore()
  }

  return (
    <>
      {/* add canonical link  */}
      {/* <Head>
        <link rel="canonical" href={window.location.href} />
      </Head> */}
      <VStack w="full">
        <Grid width="full" gridTemplateColumns={gridTemplateColumns}>
          {hits.map((product, index) => {
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
