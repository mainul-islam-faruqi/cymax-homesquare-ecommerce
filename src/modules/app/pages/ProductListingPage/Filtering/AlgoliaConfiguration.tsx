import {
  ContentfulEntry,
  ContentfulPLPPage,
  MetaTag,
} from '@modules/contentful/pages/types'
import { Configure } from 'react-instantsearch-hooks-web'
import { useGridLayout } from '../../../components'

interface AlgoliaConfigurationProps {
  query: string
  isSearchPage?: boolean
  routePattern?: any
  ctfEntry?: ContentfulPLPPage
}
declare global {
  interface Window {
    dataLayer: any[]
  }
}

function getBrowserCookie(cookieName: string) {
  if (typeof document !== 'object' || typeof document.cookie !== 'string') {
    return undefined
  }
  const name = cookieName + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return undefined
}
function getGoogleAnalyticsUserIdFromBrowserCookie(cookieName: string) {
  const browserCookie = getBrowserCookie(cookieName)

  if (!browserCookie) {
    return undefined
  }

  return browserCookie
}

function convertGATokenToAlgoliaToken(gaToken: string | undefined) {
  // Extract the Client ID part from the GA token (assuming the GA token is in the format GA1.2.123456789.987654321)
  if (gaToken == undefined) {
    return null
  }
  const clientIdRegex = /^GA\d\.\d\.(.+)$/
  const match = clientIdRegex.exec(gaToken)

  // If the token doesn't match the expected format, return null or some fallback
  if (!match) return null

  // Replace any non-alphanumeric characters (like '.') with an underscore
  const algoliaToken = match[1].replace(/[^a-zA-Z0-9]/g, '_')

  // Truncate to the maximum length of 64 characters if necessary
  return algoliaToken.length > 64 ? algoliaToken.substring(0, 64) : algoliaToken
}

function getAnonymousToken() {
  let token = localStorage.getItem('algoliaUserToken')
  if (!token) {
    let baseToken = 'token_' + Date.now()
    let remainingLength = 64 - baseToken.length
    let randomPart = Math.random().toString(36).substr(2, remainingLength)
    token = baseToken + '_' + randomPart
  }
  return token
}

export const AlgoliaConfiguration = ({
  query,
  isSearchPage = false,
  routePattern,
  ctfEntry,
}: AlgoliaConfigurationProps) => {
  const { hitsPerPage } = useGridLayout()
  const gaToken = convertGATokenToAlgoliaToken(
    getGoogleAnalyticsUserIdFromBrowserCookie('_ga')
  )
  const userToken = gaToken ? gaToken : getAnonymousToken()
  localStorage.setItem('algoliaUserToken', userToken)
  let facetFilters: string[] | undefined = ['*']
  if (Array.isArray(ctfEntry?.urlfilters)) {
    facetFilters = ctfEntry?.urlfilters.map(
      (meta: ContentfulEntry<MetaTag>) => {
        return `${meta.fields.name}:${meta.fields.content}`
      }
    )
  }
  let filters = routePattern?.facetsToApply?.join(' AND ') ?? ''
  if (Array.isArray(ctfEntry?.hiddenfilters)) {
    filters = ''
    ctfEntry?.hiddenfilters.forEach((meta: ContentfulEntry<MetaTag>) => {
      filters += ` AND ${meta.fields.name}:"${meta.fields.content}"`
    })
    filters = filters.substring(5)
  }

  return (
    <Configure
      hitsPerPage={hitsPerPage}
      facets={['*']}
      query={query}
      filters={filters}
      facetFilters={[facetFilters ?? '']}
      clickAnalytics={true}
      userToken={userToken}
    />
  )
}
