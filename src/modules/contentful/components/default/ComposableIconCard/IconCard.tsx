import { Box, Flex, Text } from '@chakra-ui/react'
import { getFlexAlignment, handleTextAlign } from '@modules/app/utils'
import { CallToAction } from '@modules/contentful'
import { BackgroundColor } from '@modules/contentful/utils'
import { ThemeVariant } from '@modules/contentful/utils/types'
import Image from 'next/image'
import RichTextComponent from '../ContentfulRichText'
import { IconCardProps } from './types'

const BACKGROUND_COLOR = {
  [BackgroundColor.Default]: 'none',
  [BackgroundColor.Light]: 'shading.100',
  [BackgroundColor.Dark]: 'shading.900',
  [BackgroundColor.Accent]: 'accent.100',
}

const handleColor = (bgColor: BackgroundColor) => {
  return BackgroundColor.Dark === bgColor ? 'shading.100' : 'shading.900'
}

export const IconCard = ({ fields, cardBackgroundColor }: IconCardProps) => {
  const { title, text, image: imageProps, alignment, cta } = fields || {}
  const image = imageProps?.fields?.image.fields
  const url = image?.file?.url ? `https:${image?.file?.url}` : ''
  const color = handleColor(cardBackgroundColor)
  const textAlign = handleTextAlign(alignment)
  const alignItems = getFlexAlignment(alignment)
  const theme =
    cardBackgroundColor === BackgroundColor.Dark
      ? ThemeVariant.Dark
      : ThemeVariant.Light

  return (
    <Flex
      direction="column"
      p={{ base: '4', sm: '6' }}
      alignItems={alignItems}
      bg={BACKGROUND_COLOR[cardBackgroundColor]}
      w="100%"
      h="100%"
      title={title}
    >
      {!!url && image && (
        <Image
          src={url}
          alt={
            imageProps?.fields?.alt ??
            imageProps?.fields?.image?.fields?.description
          }
          width={image?.file?.details?.image?.width}
          height={image?.file?.details?.image?.height}
          title={
            imageProps?.fields?.alt ??
            imageProps?.fields?.image?.fields?.description
          }
        />
      )}
      {!!title && (
        <Text
          as="h3"
          textAlign={textAlign}
          lineHeight="6"
          mt="4"
          fontWeight="bold"
          fontSize={{ base: 'mobile.xs', md: 'desktop.xs' }}
          color={color}
        >
          {title}
        </Text>
      )}
      {!!text && (
        <Box
          mt="3"
          color={color}
          textAlign={textAlign}
          fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
        >
          <RichTextComponent text={text} theme={theme} />
        </Box>
      )}
      {cta && (
        <CallToAction
          {...cta?.fields}
          theme={theme}
          buttonChakraProps={{ mt: '4', fontSize: 'sm' }}
        />
      )}
    </Flex>
  )
}
