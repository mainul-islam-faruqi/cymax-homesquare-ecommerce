import { getFooter } from '@modules/contentful/entries/getFooter'
import { useQuery } from 'react-query'

export const useContentfulFooter = () => {
  const query = useQuery(['footerData'], getFooter)

  return {
    data: query.data,
    isNoMatch: query.data === null,
    isLoading: query.data === undefined,
    isLoaded: Boolean(query.data),
  }
}
