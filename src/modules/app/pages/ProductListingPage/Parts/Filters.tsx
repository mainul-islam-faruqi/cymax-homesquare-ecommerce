import {
  Accordion,
  AccordionProps,
  Box,
  Button,
  ExpandedIndex,
  Flex,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  ALGOLIA_EXCLUDE_FILTER,
  AMOUNT_FILTER,
  DEFAULT_FACETS_LIMIT,
  EP_CATEGORY_FILTER,
  ON_SALE_FILTER,
  PRICE_FILTER,
  TAX_FILTER,
} from '@modules/algolia'
import { useEffect, useMemo, useState } from 'react'
import { useCurrentRefinements } from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'
import { RefinementList } from '../Filtering'
import { PriceRangeSlider } from './PriceRangeSlider'

interface FiltersProps {
  urlFilter?: string
  algoliaIndex: string
  uiState: any
  algoliaResults: any
  routePattern?: any
}

const getAlgoliaFacetsToDisplay = (
  preApply: string[],
  { results: transformResults }: any,
  facetsSelectedToDisplay?: boolean
): string[] => {
  const getAlgoliaFacetsToDisplayRawResult: Record<any, any> =
    transformResults?._rawResults?.[0]?.facets || []
  const getAlgoliaFacetsToDisplayRawState = transformResults?._state
  const getFacetsTypeRefinements = (type: string) => {
    return Object.keys(getAlgoliaFacetsToDisplayRawState?.[type] ?? {}).reduce(
      (accumulator: string[], current) => {
        const isFacetRefined: boolean =
          getAlgoliaFacetsToDisplayRawState[type]?.[current]?.length > 0
        return isFacetRefined ? [...accumulator, current] : accumulator
      },
      []
    )
  }

  const facetsRefinements = getFacetsTypeRefinements('facetsRefinements')
  const disjunctiveFacetsRefinements = getFacetsTypeRefinements(
    'disjunctiveFacetsRefinements'
  )
  const hierarchicalFacetsRefinements = getFacetsTypeRefinements(
    'hierarchicalFacetsRefinements'
  )

  const hasRefinements = [
    ...facetsRefinements,
    ...disjunctiveFacetsRefinements,
    ...hierarchicalFacetsRefinements,
  ]

  if (facetsSelectedToDisplay) return hasRefinements

  let facetsToDisplay = Object.keys(getAlgoliaFacetsToDisplayRawResult)
    .filter((facetName) => {
      return (
        ALGOLIA_EXCLUDE_FILTER.reduce(
          (acc, curr) => acc && !facetName.includes(curr),
          true
        ) || facetName == PRICE_FILTER
      )
    })
    .map((facetName) => ({
      attribute: facetName,
      numberOfOptions: Object.keys(
        getAlgoliaFacetsToDisplayRawResult[facetName]
      ).length,
    }))
    .sort((a, b) => b.numberOfOptions - a.numberOfOptions)

  const facetsToDisplayArray = facetsToDisplay.map((item) => {
    return item.attribute
  })

  const combinedFacetsArray = [...hasRefinements, ...facetsToDisplayArray]

  const finalResult = combinedFacetsArray.filter(
    (item, index) => combinedFacetsArray.indexOf(item) === index
  )

  return finalResult
}

export const Filters = ({
  urlFilter,
  algoliaIndex,
  uiState,
  algoliaResults: results,
  routePattern,
  ...props
}: FiltersProps & AccordionProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const intl = useIntl()
  const [expandedIndex, setExpandedIndex] = useState<ExpandedIndex>([])
  const [filterLimit, setFilterLimit] = useState<number>(DEFAULT_FACETS_LIMIT)
  const [moreFiltersToShow, setMoreFiltersToShow] = useState<boolean>(false)
  const [lessFiltersToShow, setLessFiltersToShow] = useState<boolean>(false)
  const [filterLength, setFilterLength] = useState<number>(0)

  const onLoadMoreFilter = () => {
    setFilterLimit(filterLimit + DEFAULT_FACETS_LIMIT)

    if (filterLimit + DEFAULT_FACETS_LIMIT >= filterLength) {
      setMoreFiltersToShow(false)
      if (filterLimit + DEFAULT_FACETS_LIMIT !== filterLength) {
        setLessFiltersToShow(true)
      }
    }
  }

  const onLoadLessFilter = () => {
    setFilterLimit(DEFAULT_FACETS_LIMIT)

    setLessFiltersToShow(false)

    if (DEFAULT_FACETS_LIMIT < filterLength) {
      setMoreFiltersToShow(true)
    }
  }

  const rawResultLength = useMemo(() => {
    const result = Object.keys(results?._rawResults?.[0]?.facets ?? {}).length

    return result
  }, [results])

  const refinedFacetsLength = useMemo(() => {
    const result = uiState?.[algoliaIndex]?.refinementList?.length ?? 0

    return result
  }, [uiState?.[algoliaIndex].refinementList])

  const algoliaFacetsAll = useMemo(() => {
    const result = getAlgoliaFacetsToDisplay([], { results })

    return result
  }, [rawResultLength, refinedFacetsLength])

  const algoliaFacetsAllClean = useMemo(() => {
    const result = algoliaFacetsAll?.filter(
      (facet) =>
        ![
          PRICE_FILTER,
          ON_SALE_FILTER,
          AMOUNT_FILTER,
          TAX_FILTER,
          urlFilter,
        ].includes(facet) && facet.indexOf(EP_CATEGORY_FILTER) === -1
    )

    setFilterLength(result?.length)
    setFilterLimit(DEFAULT_FACETS_LIMIT)
    setLessFiltersToShow(false)

    if (result.length > DEFAULT_FACETS_LIMIT) {
      setMoreFiltersToShow(true)
    } else {
      setMoreFiltersToShow(false)
    }

    return result
  }, [algoliaFacetsAll, filterLength])

  const algoliaFacets = useMemo(() => {
    const currentFilters = algoliaFacetsAllClean.slice(0, filterLimit)

    return currentFilters
  }, [algoliaFacetsAllClean, filterLimit])

  const algoliaFacetsSelected = useMemo(() => {
    const result = getAlgoliaFacetsToDisplay([], { results }, true)

    return result
  }, [rawResultLength, refinedFacetsLength])

  const { items } = useCurrentRefinements()

  const facetSelected: any = useMemo(() => {
    const facetAttrSelectdd = items
      .filter((item) => {
        if (item.attribute !== ON_SALE_FILTER) return item
      })
      .map((item) => {
        return item.attribute
      })

    return facetAttrSelectdd
  }, [items])

  const filtersIndexes = algoliaFacets.map((_, i) => i)
  const allFilterAreExpanded =
    expandedIndex instanceof Array &&
    expandedIndex.length === filtersIndexes.length + 1

  let filtersIndexesSelected: any = []
  let index = 1
  for (let i = 0; i < algoliaFacets.length; i++) {
    if (
      algoliaFacets[i] !== PRICE_FILTER &&
      algoliaFacets[i] !== ON_SALE_FILTER
    ) {
      const found = facetSelected.includes(algoliaFacets[i])
      if (found) {
        filtersIndexesSelected.push(index)
      }
      index++
    }
  }

  const handleExpandButton = () => {
    if (allFilterAreExpanded) {
      return setExpandedIndex([])
    }
    return setExpandedIndex([...filtersIndexes, filtersIndexes.length])
  }

  useEffect(() => {
    setExpandedIndex([])
  }, [])

  useEffect(() => {
    setExpandedIndex([...filtersIndexesSelected, 0])
  }, [items])

  return (
    <>
      {!isMobile && (
        <Box>
          <Button
            variant="link"
            size="sm"
            color="shading"
            textDecoration="underline"
            fontWeight="extrabold"
            onClick={handleExpandButton}
          >
            {allFilterAreExpanded
              ? intl.formatMessage({
                  id: 'category.filters.action.collapseAll',
                })
              : intl.formatMessage({ id: 'category.filters.action.expandAll' })}
          </Button>
        </Box>
      )}
      {results?.nbHits ? (
        <>
          <Accordion
            mt={6}
            pb="10"
            allowMultiple={true}
            allowToggle={true}
            index={expandedIndex}
            onChange={(expandedIndex) => setExpandedIndex(expandedIndex)}
            {...props}
          >
            <PriceRangeSlider />
            {algoliaFacets?.map((facet) => {
              return (
                <RefinementList
                  key={`visualFacet-${facet}`}
                  attribute={facet}
                  translationKey={`category.refinements.${facet}`}
                />
              )
            })}
          </Accordion>

          <Flex align="center" alignItems="end">
            <Button
              variant="link"
              size="sm"
              onClick={onLoadMoreFilter}
              display={{
                base: moreFiltersToShow ? 'block' : 'none',
              }}
            >
              Show More Filters
            </Button>
            <Spacer />
            <Button
              variant="link"
              size="sm"
              onClick={onLoadLessFilter}
              display={{
                base: lessFiltersToShow ? 'block' : 'none',
              }}
            >
              Show Fewer Filters
            </Button>
          </Flex>
        </>
      ) : null}
    </>
  )
}
