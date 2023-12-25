import { useBreakpointValue } from '@chakra-ui/react'
import { Alignment } from '@modules/contentful/utils'
import React, { ReactElement } from 'react'
import { CarouselChild } from '../Carousel/types'
import { ChakraCarousel } from '../ChakraCarousel'
import { ComposableBanner } from '../ComposableBanner'

export interface BannerImageCarouselProps {
  titleAlignment?: Alignment
  children?: CarouselChild[]
}

export const BannerImageCarousel = (props: BannerImageCarouselProps) => {
  const { children } = props
  const isMobile = useBreakpointValue({ base: true, md: false })
  const gap = isMobile ? 0 : 0
  return (
    <ChakraCarousel gap={gap} renderAsBanner>
      {children && children?.length > 0
        ? (React.Children.toArray(
            (children || [])?.map((child) => (
              // eslint-disable-next-line react/jsx-key
              <ComposableBanner
                {...(child?.fields as any)}
                fullWidth
                width={'100%'}
                margin={'0px'}
              />
            ))
          ) as ReactElement[])
        : []}
    </ChakraCarousel>
  )
}
