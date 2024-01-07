import { Button, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react'
import { useGetMultipleStocks } from '@modules/ep'
import { useState } from 'react'
import {
  UseInfiniteHitsProps,
  useInfiniteHits,
} from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'
import { useGridLayout } from '../../../components'
import {
  CategoryProductCard,
  MyAlgoliaProduct,
} from '../Parts/CategoryProductCard'

/**
 * The number of items rendered per page in this component is configured by the nearest (in the tree) <Configure> component
 * @param props
 * @returns
 */
export const InfiniteHits = (props: UseInfiniteHitsProps<MyAlgoliaProduct>) => {
  const [currPage, setCurrPage] = useState<number>(1)
  const { hits, isLastPage, showMore, results } = useInfiniteHits(props)
  const { gridTemplateColumns } = useGridLayout()
  const { page = 0, nbPages } = results || {}
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

  return (
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
  )
}
