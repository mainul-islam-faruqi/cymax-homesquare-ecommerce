import { chakra } from '@chakra-ui/react'
import Image from 'next/image'

export const ChakraNextImage = chakra(Image, {
  shouldForwardProp: (prop) =>
    [
      'layout',
      'objectFit',
      'width',
      'height',
      'src',
      'alt',
      'id',
      'cursor',
    ].includes(prop),
})
