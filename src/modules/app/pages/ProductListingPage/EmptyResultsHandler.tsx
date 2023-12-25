import { Box, Text } from '@chakra-ui/react'
import type { BaseHit } from 'instantsearch.js'
import { useIntl } from 'react-intl'

export type EmptyResultsHandlerProps = {
  query: { [key: string]: string | string[] }
  isSearchPage: boolean
  hits: BaseHit[]
  title: string
  rawTitle?: boolean
}

export const EmptyResultsHandler = ({
  query = {},
  isSearchPage = false,
  hits = [],
  title,
  rawTitle = false,
}: EmptyResultsHandlerProps) => {
  const intl = useIntl()
  const searchQuery: string = (query?.query as string) ?? ''

  if (!hits?.length) {
    return (
      <Box pt={3}>
        {intl.formatMessage(
          { id: 'category.search.noresultsFor' },
          { query: searchQuery }
        )}
      </Box>
    )
  }
  if (isSearchPage) {
    return (
      <>
        {intl.formatMessage(
          { id: 'category.search.resultsFor' },
          { query: searchQuery }
        )}
      </>
    )
  }
  if (rawTitle) {
    return <>{title}</>
  }
  return (
    <>{intl.formatMessage({ id: 'category.search.shop' }, { query: title })}</>
  )
}

export const EmptyResultsText = ({
  hits = [],
  routePattern,
}: {
  hits: BaseHit[]
  routePattern: any
}) => {
  const intl = useIntl()
  return (
    <>
      {!hits?.length && !routePattern?.isValid ? (
        <Text fontSize={16} mt={3} mb={10} lineHeight="24px" fontWeight="400">
          {intl.formatMessage({ id: 'category.search.noresultstext' })}
        </Text>
      ) : (
        <></>
      )}
    </>
  )
}
