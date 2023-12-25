import type { ComponentStyleConfig } from '@chakra-ui/theme'

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
export const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: 700,
    fontFamily: 'body',
    borderRadius: 0, // <-- border radius is same for all variants and sizes
    width: 'fit-content',
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      height: '24px',
      lineHeight: '18px',
      fontsize: '12px',
      px: 8, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      height: '40px',
      lineHeight: '20px',
      fontsize: '14px',
      px: '12px', // <-- these values are tokens from the design system
      py: '6px', // <-- these values are tokens from the design system
    },
    lg: {
      fontSize: 'lg',
      height: '40px',
      lineHeight: '24px',
      fontsize: '16px',
      px: '16px', // <-- these values are tokens from the design system
      py: '8px', // <-- these values are tokens from the design system
    },
    xl: {
      fontSize: 'xl',
      height: '48px',
      lineHeight: '28px',
      fontsize: '18px',
      px: '24px', // <-- these values are tokens from the design system
      py: '10px', // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '1px solid',
      borderColor: 'primary.500',
      color: 'primary.500',
      bgColor: 'transparent',
      _hover: {
        border: '1px solid',
        borderColor: 'primary.500',
        bgColor: 'primary.100',
      },
      _active: {
        border: '1px solid',
        borderColor: 'primary.500',
        bgColor: 'primary.200',
      },
      _disabled: {
        border: '1px solid',
        borderColor: 'shading.400',
        color: 'shading.400',
        bgColor: 'transparent',
      },
    },
    solid: {
      border: '1px solid',
      bg: 'primary.500',
      color: 'shading.100',
      _hover: {
        border: '1px solid',
        bg: 'primary.500',
        color: 'shading.100',
      },
      _active: {
        border: '1px solid',
        bg: 'primary.500',
        color: 'shading.100',
      },
      _disabled: {
        border: '1px solid',
        bg: 'shading.400',
        color: 'shading.100',
      },
    },
    ghost: {
      color: 'shading.900',
      bgColor: 'shading.200',
      _hover: {
        bgColor: 'primary.100',
      },
      _active: {
        border: '1px solid',
        bgColor: 'primary.200',
      },
      _disabled: {
        color: 'shading.400',
      },
    },
    link: {
      color: 'shading.900',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
      textDecorationThickness: '1px',
      overflow: 'visible',
      _hover: {
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
        textDecorationThickness: '1px',
      },
    },
  },
}
