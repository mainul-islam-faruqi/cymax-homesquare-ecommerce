import { CheckoutViewCartGTM } from '..'
import { GoogleTagManagerEvents, gtmTrack } from '../GoogleTagManager'

export const viewCart = (payload: CheckoutViewCartGTM) => {
  gtmTrack(GoogleTagManagerEvents.cartViewed, payload)
}
