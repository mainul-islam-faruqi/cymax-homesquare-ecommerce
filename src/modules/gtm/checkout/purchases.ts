import { GoogleTagManagerEvents, gtmTrack, PurchasesGTM } from '..'

export const purchases = (payload: PurchasesGTM) => {
  gtmTrack(GoogleTagManagerEvents.purchases, payload)
}
