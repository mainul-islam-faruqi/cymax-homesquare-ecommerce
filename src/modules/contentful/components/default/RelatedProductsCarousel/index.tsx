import { Box, Stack, Text } from '@chakra-ui/react'
import { ALGOLIA_BASE_INDEX } from '@modules/algolia'
import {
  NEXT_PUBLIC_RELATED_PRODUCTS_CAROUSEL,
  searchClient,
} from '@modules/app'
import { ProductCard } from '@modules/app/components/ProductCard'
import { getTextAlignment } from '@modules/app/utils'
import { Alignment } from '@modules/contentful/utils'
import {
  EpFilterAttribute,
  EpFilterOperator,
  EpProductInterface,
  useProductsByAttribute,
} from '@myplanetdigital/elasticpath'
import { CardEmptyState } from '@myplanetdigital/ui'
import React, { ReactElement, useEffect, useState } from 'react'
import { ChakraCarousel } from '../ChakraCarousel'

export interface RelatedProductsCarouselProps {
  currentProductBrand: string
  currentProductCategory: string
  titleAlignment: Alignment
  gap?: number
  pdpProductSKU?: string
}
export const RelatedProductsCarousel = ({
  currentProductBrand,
  currentProductCategory,
  titleAlignment,
  gap,
  pdpProductSKU,
}: RelatedProductsCarouselProps) => {
  const [productsSKUs, setProductsSKUs] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSKUs = async () => {
      setIsLoading(true)
      const skus = await fetchRelatedProducts(
        currentProductBrand,
        currentProductCategory,
        pdpProductSKU
      )
      setProductsSKUs(skus)
      setIsLoading(false)
    }

    fetchSKUs()
  }, [currentProductBrand, currentProductCategory, pdpProductSKU])
  const categoryLevel2 =
    currentProductCategory?.split(' > ').pop()?.trim() ?? ''
  const { productMap } = useProductsByAttribute({
    values: productsSKUs,
    filterAttribute: EpFilterAttribute.SKU,
    filterOperator: EpFilterOperator.IN,
  })

  return (
    <>
      {NEXT_PUBLIC_RELATED_PRODUCTS_CAROUSEL &&
        productMap &&
        Object.keys(productMap)?.length >= 4 && (
          <Box
            maxW="container.max"
            margin="0 auto"
            my={{ base: 'mobile', md: 'desktop' }}
            px={{ base: 'mobile', md: 'desktop' }}
            as="section"
          >
            <Stack
              spacing={{ base: '4', md: '5' }}
              px={{ base: '4', md: '0' }}
              py={{ base: 5, md: 10 }}
            >
              <Text
                as="h2"
                fontWeight="extrabold"
                textAlign={getTextAlignment(titleAlignment)}
                fontSize={{ base: 'xxl', md: 'desktop.lg' }}
              >
                More {categoryLevel2} from {currentProductBrand}
              </Text>
            </Stack>
            <ChakraCarousel gap={gap ?? 32}>
              {isLoading
                ? new Array(4).fill(true).map((_, idx) => {
                    return <CardEmptyState key={idx} />
                  })
                : productsSKUs && productsSKUs?.length > 0
                ? (React.Children.toArray(
                    (productsSKUs || [])
                      ?.filter(
                        (productSKU: string) =>
                          productMap?.[productSKU] !== undefined
                      )
                      ?.map((productSKU: string, index: number) => (
                        // eslint-disable-next-line react/jsx-key
                        <ProductCard
                          index={index}
                          isPdpPage={true}
                          product={
                            productMap?.[productSKU] as EpProductInterface
                          }
                          rootProps={{ w: 'full' }}
                        />
                      ))
                  ) as ReactElement[])
                : []}
            </ChakraCarousel>
          </Box>
        )}
    </>
  )
}

async function fetchRelatedProducts(
  brand: string,
  category: string,
  pdpProductSKU?: string
) {
  try {
    const filters = `ep_categories.lvl2:"${category}" AND brand:"${brand}"`
    const index = searchClient.initIndex(ALGOLIA_BASE_INDEX)
    const algoliaResult = await index.search('', {
      filters: filters,
      hitsPerPage: 21,
      attributesToRetrieve: ['sku'],
    })
    let skuArray: string[] = algoliaResult.hits.map((hit) => (hit as any).sku)
    if (pdpProductSKU) {
      skuArray = skuArray.filter((sku) => sku !== pdpProductSKU)
    }

    return skuArray // This will be an array of SKUs
  } catch (e) {
    console.error('ERROR: when fetching related products', e)
    return []
  }
}
