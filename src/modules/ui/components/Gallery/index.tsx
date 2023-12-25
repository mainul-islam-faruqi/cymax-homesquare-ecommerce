import {
  AspectRatio,
  Box,
  Circle,
  HStack,
  IconButton,
  IconButtonProps,
  Link,
  Skeleton,
  Stack,
  StackProps,
} from '@chakra-ui/react'
import { Carousel, CarouselSlide, useCarousel } from '@myplanetdigital/ui'
import Image from 'next/image'
import NextLink from 'next/link'
import React, { useState } from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
interface GalleryProps {
  images?: Array<{ src: string; alt: string }>
  href?: string
  aspectRatio?: number
  rootProps?: StackProps
}

export const Gallery = (props: GalleryProps) => {
  const { images, aspectRatio = 4 / 3, rootProps } = props
  const [currentSlide, setCurrentSlide] = useState(0)

  const [ref, slider] = useCarousel({
    slideChanged: (slider) => setCurrentSlide(slider.track.details.rel),
  })

  if (!images) {
    return (
      <Stack spacing="4" {...rootProps}>
        <ElementLinkHandler href={props.href}>
          <AspectRatio ratio={aspectRatio} width="100%" bg="gray.200">
            <Skeleton width="100%" />
          </AspectRatio>
        </ElementLinkHandler>
      </Stack>
    )
  }

  const hasPrevious = currentSlide !== 0
  const hasNext = currentSlide < images.length - 1

  return (
    <Stack spacing="4" {...rootProps}>
      <Box
        position="relative"
        sx={{
          _hover: {
            '> button': {
              display: 'inline-flex',
            },
          },
        }}
      >
        <Carousel ref={ref}>
          {React.Children.toArray(
            images?.map((image, i) => (
              // eslint-disable-next-line react/jsx-key
              <CarouselSlide>
                <ElementLinkHandler href={props.href}>
                  <AspectRatio
                    ratio={aspectRatio}
                    transition="all 200ms"
                    opacity={currentSlide === i ? 1 : 0.4}
                    bg="gray.200"
                    _hover={{ opacity: 1 }}
                  >
                    <Image
                      alt=""
                      src={image.src}
                      layout="fill"
                      objectFit="cover"
                    />
                  </AspectRatio>
                </ElementLinkHandler>
              </CarouselSlide>
            ))
          )}
        </Carousel>
        {hasPrevious && (
          <CarouselIconButton
            pos="absolute"
            left="3"
            top="50%"
            transform="translateY(-50%)"
            onClick={() => slider.current?.prev()}
            icon={<IoChevronBackOutline />}
            aria-label="Previous Slide"
          />
        )}

        {hasNext && (
          <CarouselIconButton
            pos="absolute"
            right="3"
            top="50%"
            transform="translateY(-50%)"
            onClick={() => slider.current?.next()}
            icon={<IoChevronForwardOutline />}
            aria-label="Next Slide"
          />
        )}
        {images.length > 1 && (
          <HStack
            position="absolute"
            width="full"
            justify="center"
            bottom="0"
            py="4"
          >
            {React.Children.toArray(
              images?.map((_, index) => (
                // eslint-disable-next-line react/jsx-key
                <Circle
                  key={index}
                  size="2"
                  bg={currentSlide === index ? 'white' : 'whiteAlpha.400'}
                />
              ))
            )}
          </HStack>
        )}
      </Box>
    </Stack>
  )
}

const CarouselIconButton = (props: IconButtonProps) => (
  <IconButton
    display="none"
    fontSize="lg"
    isRound
    boxShadow="base"
    bg={'white'}
    _hover={{
      bg: 'gray.100',
    }}
    _active={{
      bg: 'gray.200',
    }}
    _focus={{ boxShadow: 'inerhit' }}
    _focusVisible={{ boxShadow: 'outline' }}
    {...props}
  />
)

const ElementLinkHandler = (props: {
  children: JSX.Element
  href?: string
}) => {
  return props.href ? (
    <NextLink href={props.href} passHref>
      <Link>{props.children}</Link>
    </NextLink>
  ) : (
    props.children
  )
}
