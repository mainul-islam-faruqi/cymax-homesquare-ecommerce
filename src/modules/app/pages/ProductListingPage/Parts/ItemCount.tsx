import { Flex, FlexProps, Text } from '@chakra-ui/react'

import { useInfiniteHits } from 'react-instantsearch-hooks-web'

import { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'

export const ItemCount: FunctionComponent<FlexProps> = (props) => {
  const intl = useIntl()
  const { results } = useInfiniteHits()

  return (
    <Flex direction="column" {...props}>
      <Text
        fontSize={{ base: 'mobile.bodyXS', lg: 'base' }}
        fontWeight="normal"
        mb={1}
      >
        {intl.formatMessage({
          id: 'category.results.displaying',
        })}
      </Text>

      <Text
        fontSize={{ base: 'mobile.body', lg: 'desktop.body' }}
        fontWeight="normal"
        color="gray.400"
      >
        {`${intl.formatMessage(
          {
            id: 'category.results.itemCount',
          },
          { itemCount: results?.nbHits ?? 0 }
        )}`}
      </Text>
    </Flex>
  )
}
