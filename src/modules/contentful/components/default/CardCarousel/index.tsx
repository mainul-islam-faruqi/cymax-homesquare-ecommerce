import { Box, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import { getTextAlignment } from '@modules/app/utils'
import { Alignment } from '@modules/contentful/utils'
import React, { ReactElement } from 'react'
import { CarouselChild } from '../Carousel/types'
import { ChakraCarousel } from '../ChakraCarousel'
import { ComposableCard } from '../ComposableCard'

export interface CardCarouselProps {
  title?: string
  titleAlignment?: Alignment
  children?: CarouselChild[]
}

export const CardCarousel = (props: CardCarouselProps) => {
  const { title, titleAlignment, children } = props
  const isMobile = useBreakpointValue({ base: true, md: false })
  const gap = isMobile ? 0 : 40
  return (
    <Box
      as="section"
      margin="0 auto"
      maxW="container.max"
      px={{ base: 'mobile', md: 'desktop' }}
    >
      <Stack spacing={{ base: '4', md: '5' }} px={{ base: '4', md: '0' }}>
        {title && children && (
          <Text
            paddingBlock={{ base: 5, md: 10 }}
            as="h2"
            fontWeight="extrabold"
            textAlign={getTextAlignment(titleAlignment)}
            fontSize={{ base: 'xxl', md: 'desktop.lg' }}
          >
            {title}
          </Text>
        )}
      </Stack>
      <ChakraCarousel gap={gap}>
        {children && children?.length > 0
          ? (React.Children.toArray(
              (children || [])?.map((child) => (
                // eslint-disable-next-line react/jsx-key
                <ComposableCard mainTitle={title || ''} {...child?.fields} />
              ))
            ) as ReactElement[])
          : []}
      </ChakraCarousel>
    </Box>
  )
}
