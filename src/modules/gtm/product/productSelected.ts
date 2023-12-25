import { GoogleTagManagerEvents, gtmTrack, ProductSelectedGTM } from '..'

export const productSelected = (payload: ProductSelectedGTM) => {
  gtmTrack(GoogleTagManagerEvents.productSelected, payload)
}
