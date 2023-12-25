import { PartsStyleObject } from '@chakra-ui/theme-tools'

export const variantsDark: PartsStyleObject = {
  outline: {
    border: '1px solid',
    borderColor: 'shading.100',
    color: 'shading.100',
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
      bgColor: 'shading.100',
    },
  },
  solid: {
    border: '1px solid',
    bg: 'shading.100',
    color: 'shading.900',
    _hover: {
      border: '1px solid',
      bg: 'shading.100',
      color: 'shading.900',
    },
    _active: {
      border: '1px solid',
      bg: 'shading.100',
      color: 'shading.900',
    },
    _disabled: {
      border: '1px solid',
      bg: 'shading.400',
      color: 'shading.900',
    },
  },
  ghost: {
    color: 'shading.100',
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
    color: 'shading.100',
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
}
