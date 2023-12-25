import { GoogleTagManagerEvents, gtmPush } from '..'
import { ClickEventGTM } from './types'

export const clickEvent = (payload: ClickEventGTM) => {
  gtmPush(GoogleTagManagerEvents.clickEvent, payload)
}
