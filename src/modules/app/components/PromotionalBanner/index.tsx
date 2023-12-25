import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { ThemeVariant } from '@modules/contentful/utils/types'
import RichTextComponent from '../../../contentful/components/default/ContentfulRichText'
import { PromotionalBannerProps } from './types'

export const PromotionalBanner = ({ text }: PromotionalBannerProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  if (text == null) {
    return null
  }
  return (
    <Flex
      w="100%"
      minH="40px"
      maxH="auto"
      textAlign="center"
      fontWeight="normal"
      alignItems="center"
      color="shading.100"
      justifyContent="center"
      px={{ base: 6, md: 2 }}
      backgroundColor="primary.500"
      h={'auto'}
      fontSize={isMobile ? 'sm' : 'base'}
      flexDir={isMobile ? 'column' : 'row'}
      wrap="wrap"
      py={1}
      sx={{
        a: {
          fontWeight: 'normal',
          ml: isMobile ? '0' : '2',
          height: 'fit-content',
          my: isMobile ? '1' : '0',
          py: !isMobile ? '1' : 'auto',
          fontSize: isMobile ? 'sm' : 'base',
        },
        p: {
          wrap: 'wrap',
          display: 'flex',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          my: isMobile ? '1' : '0',
          py: !isMobile ? '1' : 'auto',
        },
        b: {
          my: isMobile ? '1' : '0',
          py: !isMobile ? '1' : 'auto',
        },
      }}
    >
      {text && <RichTextComponent text={text} theme={ThemeVariant.Dark} />}
    </Flex>
  )
}
