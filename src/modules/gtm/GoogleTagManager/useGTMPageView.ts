import { useEffect } from 'react'
import { GoogleTagManagerEvents } from './types'
import { gtmTrack } from './utils'

export const useGtmPageView = <T>(payload?: T) => {
  useEffect(() => {
    gtmTrack(GoogleTagManagerEvents.pageView, payload)
  }, [])

  return null
}
