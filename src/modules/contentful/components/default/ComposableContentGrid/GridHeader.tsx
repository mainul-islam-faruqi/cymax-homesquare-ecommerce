import { Text } from '@chakra-ui/react'
import { handleTextAlign } from '@modules/app/utils'
import { GridHeaderProps } from './types'

export const GridHeader = ({ alignment, title }: GridHeaderProps) => {
  const textAlign = handleTextAlign(alignment)

  return (
    <Text
      as="h2"
      my={8}
      fontWeight="extrabold"
      textAlign={textAlign}
      fontSize={{ base: 'mobile.lg', md: 'desktop.lg' }}
    >
      {title}
    </Text>
  )
}
