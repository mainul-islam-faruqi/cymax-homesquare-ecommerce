import { GoogleTagManagerEvents, gtmTrack } from '..'
import { ViewItemListGTM } from './types'

export const viewItemList = (payload: ViewItemListGTM) => {
  gtmTrack(GoogleTagManagerEvents.itemListViewed, payload)
}
