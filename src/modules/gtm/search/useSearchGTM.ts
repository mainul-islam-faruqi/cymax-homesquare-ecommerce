import { GoogleTagManagerEvents, gtmTrack } from '..'
import { SearchGTM } from './types'

export const searchCreated = (payload: SearchGTM) => {
  gtmTrack(GoogleTagManagerEvents.searchCreated, payload)
}
