import { Box, Flex, Text } from '@chakra-ui/react'
import { getAlignItems, getTextAlignment } from '@modules/app/utils'
import { ThemeVariant } from '@modules/contentful/utils/types'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import { buildContentfulImageUrl } from '../ComposableImage'
import RichTextComponent from '../ContentfulRichText'
import { CoverCardProps } from './types'

export const CoverCard: FunctionComponent<CoverCardProps> = ({
  name,
  image,
  eyebrow,
  title,
  description,
  horizontalAlignment,
  verticalAlignment,
  theme,
}) => {
  const url = image?.fields?.image?.fields?.file?.url

  if (!url) {
    return null
  }

  return (
    <Flex
      position="relative"
      w="full"
      h="full"
      id={name}
      minH="35vh"
      alignItems={getAlignItems(verticalAlignment)}
    >
      <Box
        position="absolute"
        insetX="0"
        insetY="0"
        w="full"
        h="full"
        overflow="hidden"
      >
        <Image
          src={buildContentfulImageUrl(url, image?.fields)}
          alt={image?.fields?.alt ?? image?.fields?.image?.fields?.description}
          layout="fill"
          objectFit="cover"
          objectPosition={image?.fields?.focusArea ?? 'center'}
          title={
            image?.fields?.alt ?? image?.fields?.image?.fields?.description
          }
        />
      </Box>
      <Box
        position="absolute"
        w="full"
        h="full"
        bg={theme === ThemeVariant.Dark ? 'blackAlpha.600' : 'whiteAlpha.600'}
        title={image?.fields?.alt ?? image?.fields?.image?.fields?.description}
      />
      <Box
        m={3}
        title={image?.fields?.alt ?? image?.fields?.image?.fields?.description}
        color={theme === ThemeVariant.Dark ? 'shading.100' : 'shading.900'}
        textAlign={getTextAlignment(horizontalAlignment)}
        w="full"
        zIndex={1}
        position="relative"
        sx={{
          '& > *': {
            marginBottom: '6',
          },
          blockquote: {
            borderColor:
              theme === ThemeVariant.Light ? 'shading.900' : 'shading.100',
            color: theme === ThemeVariant.Light ? 'shading.900' : 'shading.100',
          },
        }}
      >
        {eyebrow && (
          <Text variant="eyebrow" style={{ marginBottom: 2 }}>
            {eyebrow}
          </Text>
        )}
        {title && (
          <Text
            as="h3"
            fontWeight="bold"
            fontSize={{ base: 'mobile.sm', md: 'desktop.xs' }}
          >
            {title}
          </Text>
        )}
        {description && <RichTextComponent text={description} theme={theme} />}
      </Box>
    </Flex>
  )
}
