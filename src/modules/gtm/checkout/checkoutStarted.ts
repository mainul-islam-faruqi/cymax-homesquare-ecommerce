import { CheckoutStartedGTM, GoogleTagManagerEvents, gtmTrack } from '..'

export const checkoutStarted = (payload: CheckoutStartedGTM) => {
  gtmTrack(GoogleTagManagerEvents.begin_checkout, payload)
}
