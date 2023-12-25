import { SmallCloseIcon } from '@chakra-ui/icons'
import { Button, Flex, Text } from '@chakra-ui/react'
import { ON_SALE_FILTER, PRICE_FILTER } from '@modules/algolia'
import {
  useClearRefinements,
  useCurrentRefinements,
  useRange,
} from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'

interface RefinementChipProps {
  label: string
  clearRefinement: () => void
}

const RefinementChip = ({ label, clearRefinement }: RefinementChipProps) => {
  return (
    <Button
      fontSize={16}
      fontWeight="normal"
      color="shading.900"
      backgroundColor="accent.100"
      borderColor="accent.100"
      borderRadius={25}
      px={'12px'}
      py={'8px'}
      rightIcon={<SmallCloseIcon />}
      onClick={clearRefinement}
      height={'auto'}
    >
      <Text
        lineHeight={'22px'}
        width="full"
        textOverflow="ellipsis"
        noOfLines={1}
        isTruncated
        display={'block'}
      >
        {label}
      </Text>
    </Button>
  )
}

export const CurrentRefinements = () => {
  const { items: refinementAttributes, refine: clearSingleRefinement } =
    useCurrentRefinements()
  const { canRefine: isRefined, refine: clearAllRefinements } =
    useClearRefinements()
  const { refine: clearRange, range } = useRange({ attribute: PRICE_FILTER })

  const intl = useIntl()

  if (!isRefined) {
    return null
  }

  const handleClearRefinements = () => {
    clearAllRefinements()
    clearRange([undefined, undefined])
  }

  return (
    <Flex
      gap="xxs"
      wrap="wrap"
      mt={{ base: 4, lg: 6 }}
      mb={{ base: 0, lg: 6 }}
      alignItems="center"
    >
      {refinementAttributes?.map((attribute) => {
        return attribute?.refinements?.map((refinement, index) => {
          let label = refinement.value.toString()

          if (attribute.attribute === PRICE_FILTER) {
            if (refinement.operator == '>=') {
              label = `Minimum Price: $${refinement.value.toString()}`
            } else {
              label = `Maximum Price: $${refinement.value.toString()}`
            }

            return (
              <RefinementChip
                key={index}
                label={label}
                clearRefinement={() => clearSingleRefinement(refinement)}
              />
            )
          }

          if (attribute.attribute === ON_SALE_FILTER) {
            label = `On Sale`

            return (
              <RefinementChip
                key={index}
                label={label}
                clearRefinement={() => clearSingleRefinement(refinement)}
              />
            )
          }
        })
      })}
      {refinementAttributes?.map((attribute) => {
        return attribute?.refinements?.map((refinement, index) => {
          let label = refinement.value.toString()

          if (
            attribute.attribute !== PRICE_FILTER &&
            attribute.attribute !== ON_SALE_FILTER
          ) {
            if (attribute.attribute === 'attributes.normalized.rating') {
              label = `${refinement.value} (${intl.formatMessage({
                id: 'category.refinements.rating',
              })})`
            }

            return (
              <RefinementChip
                key={index}
                label={label}
                clearRefinement={() => clearSingleRefinement(refinement)}
              />
            )
          }
        })
      })}
      <Button
        variant="ghost"
        size="xs"
        color="shading"
        backgroundColor={'whiteAlpha.50'}
        fontWeight="extrabold"
        fontSize="sm"
        ml="xxs"
        textDecoration="underline"
        onClick={handleClearRefinements}
        background="none"
        _hover={{
          background: 'none',
        }}
      >
        {intl.formatMessage({ id: 'category.filters.action.clear' })}
      </Button>
    </Flex>
  )
}
