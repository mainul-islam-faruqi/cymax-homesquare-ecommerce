import { Box, Button, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { HeaderType } from './types'

export const Header = ({ title, indexes, onClick }: HeaderType) => {
  const intl = useIntl()
  const label = indexes.length === 0 ? 'accordion.expand' : 'accordion.close'

  return (
    <Box mb={{ base: '5', md: '7' }} pl={{ base: 0, md: '4' }} >
      <Text
        as="h2"
        fontSize={{ base: 'mobile.sm', md: 'lg' }}
        lineHeight="6"
        fontWeight="600"
        aria-label={title}
        color="shading.800"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {title}
      </Text>
      <Button
        p="0"
        as="span"
        border="none"
        cursor="pointer"
        fontSize={{ base: 'mobile.bodySM', md: 'sm' }}
        fontWeight="400"
        background="none"
        color="accent.500"
        onClick={onClick}
        _hover={{ bg: 'none' }}
        _active={{ bg: 'none' }}
        textDecoration="underline"
        aria-label={intl.formatMessage({ id: label })}
      >
        {intl.formatMessage({ id: label })}
      </Button>
    </Box>
  )
}
