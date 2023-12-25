import {
  GoogleTagManagerEvents,
  gtmTrack,
  OrderConfirmationPageViewGTM,
} from '..'

export const orderConfirmationPageView = (
  payload: OrderConfirmationPageViewGTM
) => {
  gtmTrack(GoogleTagManagerEvents.pageView, payload)
}
