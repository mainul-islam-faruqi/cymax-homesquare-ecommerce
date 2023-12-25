import { Button, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react'
import { useGetMultipleStocks } from '@modules/ep'
import { useEffect, useRef, useState } from 'react'
import {
  UseInfiniteHitsProps,
  useInfiniteHits,
} from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'
import { FixedSizeGrid } from 'react-window'
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

  const containerRef = useRef(null)
  console.log('containerRef', containerRef)
  const [dynamicHeight, setDynamicHeight] = useState(0)
  const [dynamicWidth, setDynamicWidth] = useState(0)
  const productListDiv = document.getElementById('productListDiv')
  useEffect(() => {
    // console.log(' productListDiv?.offsetTop', productListDiv)
    console.log(' productListDiv?.offsetTop', productListDiv?.offsetTop)
    setDynamicWidth(productListDiv?.offsetWidth || 0)
  }, [productListDiv])

  console.log(productListDiv?.offsetHeight, 'productListDiv.offsetHeight')

  const columnCount = 4
  const columnWidth = Math.ceil(dynamicWidth / columnCount - 5) // Set the width of each column (adjust as needed)
  console.log(hits.length)
  const rowCount = Math.ceil(hits.length / columnCount)
  const rowHeight = 420

  console.log(`${window.innerHeight}px`, '`${ window.innerHeight}px`')
  console.log(`${window.innerWidth}px`, '`${ window.innerWidth}px`')
  console.log(dynamicHeight, 'dynamicHeight')
  console.log(dynamicWidth, 'dynamicWidth')

  return (
    // <VStack w="full">
    //   <Grid width="full" gridTemplateColumns={gridTemplateColumns}>
    //     {hits.map((product, index) => {
    //       return (
    //         <GridItem
    //           key={product.objectID}
    //           gap={{ base: 'mobile', md: 'desktop' }}
    //           sx={gridBorderStyle}
    //         >
    //           <CategoryProductCard
    //             index={index}
    //             product={product}
    //             priority={index < 3}
    //             stock={stocks?.find((stock) => stock.id === product.objectID)}
    //           />
    //         </GridItem>
    //       )
    //     })}
    //   </Grid>
    //   {!isLastPage && (
    //     <Flex flexDir="column" alignItems="center" p={25}>
    //       <Text fontSize={{ base: 'desktop.bodySM', md: 'desktop.body' }}>
    //         {intl.formatMessage(
    //           { id: 'productListingPage.pageNo' },
    //           {
    //             pageNo: page + 1,
    //             total: nbPages,
    //           }
    //         )}
    //       </Text>
    //       <Button
    //         mt={3.5}
    //         variant="outline"
    //         height={10}
    //         fontSize="desktop.bodySM"
    //         onClick={() => {
    //           setCurrPage((currentPage) => currentPage + 1)
    //           showMore()
    //         }}
    //       >
    //         {intl.formatMessage({ id: 'action.showMore' })}
    //       </Button>
    //     </Flex>
    //   )}
    // </VStack>
    // <VStack w="full" ref={containerRef}>
    //   <Grid width="full" gridTemplateColumns={gridTemplateColumns}>
    //     <FixedSizeList
    //       height={window.innerHeight}
    //       width={800}
    //       itemCount={hits.length}
    //       itemSize={700} // Set the height of each item (adjust as needed)
    //     >
    //       {({
    //         index,
    //         style,
    //       }: {
    //         index: number
    //         style: React.CSSProperties
    //       }) => {
    //         console.log(hits)
    //         const product = hits[index]
    //         console.log(product, 'products')
    //         return (
    //           <div key={product.objectID} style={{ style }}>
    //             <GridItem
    //               key={product.objectID}
    //               gap={{ base: 'mobile', md: 'desktop' }}
    //               sx={gridBorderStyle}
    //             >
    //               <div style={style} key={product.objectID}>
    //                 {/* Render your CategoryProductCard component with the necessary props */}
    //                 <CategoryProductCard
    //                   index={index}
    //                   product={product}
    //                   // priority={index < 3}
    //                   stock={stocks?.find(
    //                     (stock) => stock.id === product.objectID
    //                   )}
    //                 />
    //               </div>
    //             </GridItem>
    //           </div>
    //         )
    //       }}
    //     </FixedSizeList>
    //   </Grid>
    // </VStack>
    <VStack w="full" ref={containerRef}>
      <Grid width="full" gridTemplateColumns={gridTemplateColumns}>
        <FixedSizeGrid
          columnCount={columnCount}
          columnWidth={columnWidth}
          rowCount={rowCount}
          rowHeight={rowHeight}
          height={rowHeight + 50} // Set the overall height of the grid
          width={dynamicWidth} // Set the overall width of the grid
        >
          {({ columnIndex, rowIndex, style }) => {
            const index = rowIndex * columnCount + columnIndex
            console.log('index', index)
            console.log('rowIndex', rowIndex)
            console.log('columnIndex,', columnIndex)
            console.log('hits.length', hits.length)

            if (index < hits.length) {
              const product = hits[index]
              return (
                // <div style={style} key={product.objectID}>

                // </div>
                // <div style={style} key={product.objectID}>
                <GridItem
                  style={style}
                  key={product.objectID}
                  gap={{ base: 'mobile', md: 'desktop' }}
                  sx={gridBorderStyle}
                >
                  <CategoryProductCard
                    index={index}
                    product={product}
                    priority={index < 3}
                    stock={stocks?.find(
                      (stock) => stock.id === product.objectID
                    )}
                  />
                </GridItem>
                // </div>
              )
            } else {
              return null // Return null for empty cells
            }
          }}
        </FixedSizeGrid>
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
