import { Alignment } from '@modules/contentful/utils'
import { Sys } from 'contentful'
import { Card } from '../ComposableCard/types'

export interface CarouselProps {
  name: string
  title?: string
  titleAlignment?: Alignment
  variant: CarouselVariant
  children?: CarouselChild[]
  products?: string[]
  isPdpPage?: boolean
  brand?: string
  category?: string
  pdpProductSKU?: string
}

export enum CarouselVariant {
  Products = 'Products Carousel',
  RecentlyViewedProducts = 'Recently Viewed Products',
  Cards = 'Category Cards Carousel',
  RelatedProducts = 'Related Products Carousel',
}

export interface CarouselChild {
  fields: Card
  sys: Sys
}
