import { useBreakpointValue } from '@chakra-ui/react'
import { Alignment } from '@modules/contentful/utils'
import { useIntl } from 'react-intl'
import { CardCarousel } from '../CardCarousel'
import { ProductCarousel } from '../ProductCarousel'
import { RecentlyViewedProductsCarousel } from '../RecentlyViewedProductsCarousel'
import { RelatedProductsCarousel } from '../RelatedProductsCarousel'
import { CarouselProps, CarouselVariant } from './types'

export const Carousel = ({
  title,
  titleAlignment,
  children,
  variant,
  products,
  isPdpPage,
  brand,
  category,
  pdpProductSKU,
}: CarouselProps) => {
  const intl = useIntl()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const gap = isMobile ? 0 : 40
  return (
    <>
      {variant === CarouselVariant.Cards && children?.length && (
        <CardCarousel title={title} titleAlignment={titleAlignment}>
          {children}
        </CardCarousel>
      )}
      {products && variant === CarouselVariant.Products && products?.length && (
        <ProductCarousel
          productSKUs={products}
          title={title}
          titleAlignment={titleAlignment ?? Alignment.Center}
          gap={gap}
          isPdpPage={isPdpPage}
        />
      )}

      {variant === CarouselVariant.RecentlyViewedProducts && (
        <RecentlyViewedProductsCarousel
          title={
            title ??
            intl.formatMessage({
              id: 'productDetailsPage.recentlyViewedProductsTitle',
            })
          }
          titleAlignment={titleAlignment ?? Alignment.Center}
          gap={gap}
          isPdpPage={isPdpPage}
        />
      )}
      {variant === CarouselVariant.RelatedProducts && brand && category && (
        <RelatedProductsCarousel
          currentProductBrand={brand}
          currentProductCategory={category}
          titleAlignment={titleAlignment ?? Alignment.Center}
          gap={gap}
          pdpProductSKU={pdpProductSKU}
        />
      )}
    </>
  )
}
