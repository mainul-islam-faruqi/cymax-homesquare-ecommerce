import { getHeader } from '@modules/contentful/entries/getHeader'
import { useQuery } from 'react-query'

export const useContentfulHeader = () => {
  const query = useQuery(['headerData'], getHeader)

  return {
    data: query.data,
    isNoMatch: query.data === null,
    isLoading: query.data === undefined,
    isLoaded: Boolean(query.data),
  }
}
