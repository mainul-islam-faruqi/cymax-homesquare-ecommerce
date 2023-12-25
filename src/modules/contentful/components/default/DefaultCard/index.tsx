import { Box, Text } from '@chakra-ui/react'
import { getTextAlignment } from '@modules/app/utils'
import { ThemeVariant } from '@modules/contentful/utils/types'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import { buildContentfulImageUrl } from '../ComposableImage'
import RichTextComponent from '../ContentfulRichText'
import { DefaultCardProps } from './types'

export const DefaultCard: FunctionComponent<DefaultCardProps> = ({
  name,
  image,
  eyebrow,
  title,
  description,
  horizontalAlignment,
}) => {
  const url = image?.fields?.image?.fields?.file?.url

  if (!url) {
    return null
  }

  return (
    <Box position="relative" w="full" h="full">
      <Box
        position="relative"
        width="100%"
        minH="35vh"
        id={name}
        title={image?.fields?.alt ?? image?.fields?.image?.fields?.description}
      >
        <Image
          src={buildContentfulImageUrl(url, image?.fields)}
          alt={image?.fields?.alt ?? image?.fields?.image?.fields?.description}
          layout="fill"
          objectFit={image?.fields?.objectFit ?? 'cover'}
          objectPosition={image?.fields?.focusArea ?? 'center'}
        />
      </Box>
      <Box
        marginBottom={3}
        marginTop={4}
        textAlign={getTextAlignment(horizontalAlignment)}
      >
        {eyebrow && (
          <Text mb={2} variant="eyebrow">
            {eyebrow}
          </Text>
        )}
        {title && (
          <Text
            as="h3"
            paddingBottom={3}
            fontWeight="bold"
            fontSize={{ base: 'mobile.sm', md: 'desktop.sm' }}
          >
            {title}
          </Text>
        )}
        {description && (
          <RichTextComponent
            enableTextCardPadding
            text={description}
            theme={ThemeVariant.Light}
          />
        )}
      </Box>
    </Box>
  )
}
