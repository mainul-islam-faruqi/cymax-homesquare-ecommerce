import {
  Box,
  Container,
  Flex,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { getImageOptions } from '@modules/app/utils'
import { ThemeVariant } from '@modules/contentful/utils/types'
import { Property } from 'csstype'
import Image from 'next/image'
import { buildContentfulImageUrl } from '../ComposableImage'
import RichTextComponent from '../ContentfulRichText'
import { BannerProps, BannerSpacing, BannerStyle } from './types'
import ObjectFit = Property.ObjectFit

export const ComposableBanner = ({
  name,
  eyebrow,
  content,
  bgImage,
  style,
  theme,
  spacing,
  fullWidth,
  width,
  margin,
}: BannerProps) => {
  const direction = {
    [BannerStyle.Left]: 'start',
    [BannerStyle.Center]: 'center',
    [BannerStyle.Right]: 'end',
  }
  const padding = {
    [BannerSpacing.sm]: [14, 32],
    [BannerSpacing.md]: [20, 40],
    [BannerSpacing.lg]: [32, 52],
    [BannerSpacing.xl]: [40, 64],
  }
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Box
      bg="gray.800"
      as="section"
      minH="140px"
      position="relative"
      id={name}
      maxW={fullWidth ? '100%' : 'container.max'}
      w={width}
      m={margin || 'auto'}
    >
      <Box
        py={padding[spacing ?? BannerSpacing.sm]}
        position="relative"
        zIndex={1}
        title={
          bgImage?.fields?.alt ?? bgImage?.fields?.image?.fields?.description
        }
      >
        <Container
          color={theme === ThemeVariant.Dark ? 'shading.100' : 'shading.900'}
          maxW="container.max"
          mx="auto"
        >
          <Flex
            justify={
              isMobile && style === BannerStyle.Right
                ? 'center'
                : direction[style]
            }
          >
            <Box
              maxW={{
                base: '100%',
                md: style === BannerStyle.Center ? '100%' : '75%',
                lg: style === BannerStyle.Center ? '100%' : '50%',
              }}
              px={{ base: '6', md: '8' }}
              sx={{
                '& > *': {
                  marginBottom: '6',
                },
              }}
              textAlign={
                style === BannerStyle.Center ||
                (isMobile && style !== BannerStyle.Left)
                  ? 'center'
                  : 'left'
              }
            >
              {eyebrow && (
                <Text mb={2} variant="eyebrow">
                  {eyebrow}
                </Text>
              )}
              {content && <RichTextComponent text={content} theme={theme} />}
            </Box>
          </Flex>
        </Container>
      </Box>
      <Flex
        position="absolute"
        insetX="0"
        insetY="0"
        w="full"
        h="full"
        overflow="hidden"
        align="center"
      >
        <Box position="relative" w="full" h="full">
          {bgImage && (
            <Box
              w="full"
              h="full"
              objectPosition="top bottom"
              position="absolute"
            >
              <Image
                alt={
                  bgImage?.fields?.alt ??
                  bgImage?.fields?.image?.fields?.description
                }
                src={buildContentfulImageUrl(
                  bgImage?.fields?.image?.fields?.file?.url,
                  getImageOptions(bgImage?.fields)
                )}
                layout="fill"
                objectFit={(bgImage?.fields?.fit as ObjectFit) ?? 'cover'}
                objectPosition={bgImage?.fields?.focusArea ?? 'center'}
                fetchpriority="high"
              />
            </Box>
          )}
          <Box
            position="absolute"
            w="full"
            h="full"
            bg={
              theme === ThemeVariant.Dark ? 'blackAlpha.600' : 'whiteAlpha.600'
            }
          />
        </Box>
      </Flex>
    </Box>
  )
}
