import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useComposable } from '@myplanetdigital/base'
import { FunctionComponent } from 'react'
import { useRefinementList } from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'

import {
  DEFAULT_INITIAL_REFINEMENTS_LIMIT,
  DEFAULT_SHOW_MORE_REFINEMENTS_LIMIT,
  getIndexName,
  RefinementListProps,
} from '../../../../algolia'

export const RefinementList: FunctionComponent<RefinementListProps> = (
  props
) => {
  const { locale } = useComposable()
  const algoliaIndex = getIndexName(locale)
  //
  const {
    translationKey,
    limit = DEFAULT_INITIAL_REFINEMENTS_LIMIT,
    showMoreLimit = DEFAULT_SHOW_MORE_REFINEMENTS_LIMIT,
  } = props
  const obj = useRefinementList({
    ...props,
    limit,
    showMoreLimit,
    showMore: true,
  })
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } =
    obj

  const { formatMessage } = useIntl()

  return (
    <AccordionItem w="full" border="none">
      {({ isExpanded }) => (
        <>
          <Heading>
            <AccordionButton
              py={2}
              px={4}
              height={'42px'}
              borderBottom="1px solid"
              borderColor="shading.300"
            >
              <Box
                flex="1"
                textAlign="left"
                fontWeight={'extrabold'}
                fontSize={'mobile.body'}
              >
                {formatMessage({ id: translationKey })}
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize="xs" />
              ) : (
                <AddIcon fontSize="xs" />
              )}
            </AccordionButton>
          </Heading>
          <AccordionPanel
            px={4}
            py={isExpanded ? '19.5px' : 4}
            borderBottom={'1px solid'}
            borderColor={'shading.300'}
            marginBottom={isExpanded ? 8 : 0}
          >
            <UnorderedList listStyleType="none" mx={0}>
              {items.map((item, index) => (
                <ListItem
                  key={item?.label}
                  mb={index == items.length - 1 ? 0 : 2}
                >
                  <HStack>
                    <Checkbox
                      colorScheme="primary"
                      borderColor={'shading.200'}
                      id={item.label}
                      isChecked={item.isRefined}
                      onChange={() => refine(item.value)}
                      data-insights-filter={translationKey + ':' + item.value}
                      data-insights-index={algoliaIndex}
                    />
                    <HStack
                      flexGrow={1}
                      justify="space-between"
                      fontSize="xs"
                      fontWeight="normal"
                    >
                      <Text
                        aria-label={item.label}
                        fontSize={'mobile.body'}
                        isTruncated
                        noOfLines={1}
                        display="block"
                        maxWidth={60}
                      >
                        {item.label}
                      </Text>
                      <Text color="shading.400" fontSize={'desktop.bodySM'}>
                        {item.count}
                      </Text>
                    </HStack>
                  </HStack>
                </ListItem>
              ))}
            </UnorderedList>
            {canToggleShowMore && (
              <Button
                variant="link"
                size="sm"
                mt={{ base: 5, lg: 'sm' }}
                color="shading"
                textDecoration="underline"
                fontWeight="extrabold"
                onClick={toggleShowMore}
              >
                {isShowingMore
                  ? formatMessage({ id: 'category.filters.action.viewLess' })
                  : formatMessage({ id: 'category.filters.action.viewMore' })}
              </Button>
            )}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
