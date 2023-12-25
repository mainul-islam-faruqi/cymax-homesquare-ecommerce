import { Box, Container, Stack, Text } from '@chakra-ui/react'
import { getImageOptions } from '@modules/app/utils'
import { ThemeVariant } from '@modules/contentful/utils/types'
import Image from 'next/image'
import { buildContentfulImageUrl } from '../ComposableImage'
import RichTextComponent from '../ContentfulRichText'
import { SplitBannerOrientation, SplitBannerProps } from './types'

export const SplitBanner = ({
  name,
  eyebrow,
  mainContent,
  mainContentAlignment,
  additionalContent,
  orientation,
  theme,
  fullWidth,
}: SplitBannerProps) => {
  return (
    <Container
      id={name}
      maxW={fullWidth ? '100%' : 'container.max'}
      color={theme === ThemeVariant.Light ? 'shading.900' : 'shading.100'}
      bg={theme === ThemeVariant.Light ? 'shading.100' : 'shading.900'}
      p={0}
    >
      <Stack
        direction={{
          base:
            orientation === SplitBannerOrientation.TextLeft
              ? 'column'
              : 'column-reverse',
          md:
            orientation === SplitBannerOrientation.TextLeft
              ? 'row'
              : 'row-reverse',
        }}
      >
        <Box
          width={['100%', '100%', '100%', '50%', '50%']}
          m="auto"
          p={{ base: 'mobile', md: 'desktop' }}
          textAlign={
            mainContentAlignment as string as 'center' | 'left' | 'right'
          }
          sx={{
            '& > *': {
              marginBottom: '6',
            },
          }}
        >
          {eyebrow && (
            <Text mb={3} variant="eyebrow">
              {eyebrow}
            </Text>
          )}
          {mainContent && (
            <RichTextComponent text={mainContent} theme={theme} />
          )}
        </Box>
        <Box
          position="relative"
          width={['100%', '100%', '100%', '50%', '50%']}
          minH="300px"
          px={{ base: '6', md: '8' }}
          p={[4, 5]}
          title={
            additionalContent?.fields?.alt ??
            additionalContent?.fields?.image?.fields?.description
          }
        >
          {additionalContent &&
            additionalContent?.sys?.contentType?.sys?.id === 'image' &&
            additionalContent?.fields?.image?.fields?.file?.url && (
              <Image
                src={buildContentfulImageUrl(
                  additionalContent?.fields?.image?.fields?.file?.url,
                  getImageOptions(additionalContent?.fields)
                )}
                alt={
                  additionalContent?.fields?.alt ??
                  additionalContent?.fields?.image?.fields?.description
                }
                layout="fill"
                objectFit={additionalContent?.fields?.objectFit ?? 'cover'}
                objectPosition={
                  additionalContent?.fields?.focusArea ?? 'center'
                }
              />
            )}
        </Box>
      </Stack>
    </Container>
  )
}
