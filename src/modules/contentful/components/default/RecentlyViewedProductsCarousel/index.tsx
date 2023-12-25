import { Box, Stack, Text } from '@chakra-ui/react'
import { ProductCard } from '@modules/app/components/ProductCard'
import { getProductsFromSession, getTextAlignment } from '@modules/app/utils'
import { Alignment } from '@modules/contentful/utils/types'
import { useProductsByAttribute } from '@modules/ep'
import {
  EpFilterAttribute,
  EpFilterOperator,
  EpProductInterface,
} from '@myplanetdigital/elasticpath'
import { CardEmptyState } from '@myplanetdigital/ui'
import React, { ReactElement, useEffect, useState } from 'react'
import { ChakraCarousel } from '../ChakraCarousel'
export interface RecentlyViewedProductsCarouselProps {
  title?: string
  titleAlignment: Alignment
  gap?: number
  isPdpPage?: boolean
}

export const RecentlyViewedProductsCarousel = ({
  title,
  titleAlignment,
  gap,
  isPdpPage,
}: RecentlyViewedProductsCarouselProps) => {
  const [productsSKU, setProductsSKU] = useState<string[]>([])

  useEffect(() => {
    setProductsSKU(getProductsFromSession())
  }, [])

  const { productMap, isLoading } = useProductsByAttribute({
    values: productsSKU,
    filterAttribute: EpFilterAttribute.SKU,
    filterOperator: EpFilterOperator.IN,
  })

  return (
    <>
      {productMap && Object.keys(productMap)?.length > 0 && (
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
            {title && (
              <Text
                as="h2"
                fontWeight="extrabold"
                textAlign={getTextAlignment(titleAlignment)}
                fontSize={{ base: 'xxl', md: 'desktop.lg' }}
              >
                {title}
              </Text>
            )}
          </Stack>
          <ChakraCarousel gap={gap ?? 32}>
            {isLoading
              ? new Array(4).fill(true).map((_, idx) => {
                  return <CardEmptyState key={idx} />
                })
              : productsSKU && productsSKU?.length > 0
              ? (React.Children.toArray(
                  (productsSKU || [])
                    ?.filter(
                      (productSKU: string) =>
                        productMap?.[productSKU] !== undefined
                    )
                    ?.map((productSKU: string, index: number) => (
                      // eslint-disable-next-line react/jsx-key
                      <ProductCard
                        index={index}
                        isPdpPage={isPdpPage}
                        product={productMap?.[productSKU] as EpProductInterface}
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
