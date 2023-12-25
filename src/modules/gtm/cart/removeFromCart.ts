import { GoogleTagManagerEvents, gtmTrack, RemoveFromCartGTM } from '..'

export const removeFromCart = (payload: RemoveFromCartGTM) => {
  gtmTrack(GoogleTagManagerEvents.removeFromCart, payload)
}
