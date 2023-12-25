import { Box, Container, Stack, Text } from '@chakra-ui/react'
import { getFlexAlignment, handleTextAlign } from '@modules/app/utils'
import { ThemeVariant } from '@modules/contentful/utils/types'
import { FunctionComponent } from 'react'
import RichTextComponent from '../ContentfulRichText'
import { TextComponentProps } from './types'

export const TextComponent: FunctionComponent<TextComponentProps> = ({
  name,
  title,
  titleAlignment,
  text,
  textAlignment,
  withSideMenu,
}) => {
  return (
    <Box as="section" bg="bg-surface" id={name || ''}>
      <Container
        maxW="container.max"
        w={{
          base: '100%',
          lg: !withSideMenu ? '70%' : '100%',
          xl: !withSideMenu ? '75%' : '100%',
        }}
        my={{ base: 'mobile', md: 'desktop' }}
        px={{ base: 'mobile', md: 'desktop' }}
      >
        <Stack spacing={{ base: '8', md: '10' }}>
          <Stack spacing={{ base: '4', md: '5' }} align="center">
            {title && (
              <Text
                as="h2"
                fontWeight="extrabold"
                alignSelf={getFlexAlignment(titleAlignment)}
                textAlign={handleTextAlign(titleAlignment)}
                fontSize={{ base: 'mobile.lg', md: 'desktop.md' }}
              >
                {title}
              </Text>
            )}
          </Stack>
          <Stack
            p={0}
            display="flex"
            alignItems={getFlexAlignment(textAlignment)}
            textAlign={handleTextAlign(textAlignment)}
          >
            {text && (
              <RichTextComponent text={text} theme={ThemeVariant.Light} />
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
