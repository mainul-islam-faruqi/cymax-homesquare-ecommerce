import { Flex, Select, Text } from '@chakra-ui/react'
import { useSortBy, UseSortByProps } from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'
import { ALGOLIA_BASE_INDEX } from '../../../../algolia'

interface SortByProps extends UseSortByProps {}

export const SortBy = (props: SortByProps) => {
  const { items } = props
  const { currentRefinement, refine } = useSortBy(props)

  const intl = useIntl()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.value
    refine(selectValue)
  }

  return (
    <Flex direction="column">
      <Text as="label" htmlFor="indexSortSelect" fontSize="sm" mb={{ base: 2 }}>
        {intl.formatMessage({ id: 'category.filters.sortBy' })}
      </Text>
      <Select
        width={{ base: '100%', lg: '320px' }}
        height={{ base: '32px', md: '40px' }}
        id="indexSortSelect"
        fontSize="base"
        value={currentRefinement}
        onChange={(e) => handleChange(e)}
      >
        {items.map((item) => (
          <option
            style={{
              fontWeight: item.value === currentRefinement ? 'bold' : 'normal',
            }}
            key={item.value}
            value={`${ALGOLIA_BASE_INDEX}${item.value}`}
          >
            {intl.formatMessage({ id: item.label })}
          </option>
        ))}
      </Select>
    </Flex>
  )
}
