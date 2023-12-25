import { GoogleTagManagerEvents, gtmTrack, ProductDetailsPageViewGTM } from '..'

export const productDetailsPageView = (payload: ProductDetailsPageViewGTM) => {
  gtmTrack(GoogleTagManagerEvents.pageView, payload)
}
