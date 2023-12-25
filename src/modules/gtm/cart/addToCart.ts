import { AddCartGTM, GoogleTagManagerEvents, gtmTrack } from '..'

export const addToCart = (payload: AddCartGTM) => {
  gtmTrack(GoogleTagManagerEvents.addToCart, payload)
}
