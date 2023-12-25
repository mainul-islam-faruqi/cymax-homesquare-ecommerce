import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const Text: ComponentStyleConfig = {
  variants: {
    caption: {
      //add some styles here
    },
    eyebrow: {
      fontSize: '14px',
      fontWeight: 600,
      textTransform: 'uppercase',
      marginBottom: 2,
      lineHeights: { base: '4', md: '5' },
    },
    blockquote: {
      borderLeft: '4px solid',
      borderColor: 'shading.900',
      color: 'shading.900',
      fontSize: '20px',
      lineHeight: '30px',
      paddingLeft: '24px',
      fontStyle: 'italic',
    },
  },
}
