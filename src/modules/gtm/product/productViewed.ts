import { GoogleTagManagerEvents, gtmTrack, ProductViewedGTM } from '..'

export const productViewed = (payload: ProductViewedGTM) => {
  gtmTrack(GoogleTagManagerEvents.productViewed, payload)
}
