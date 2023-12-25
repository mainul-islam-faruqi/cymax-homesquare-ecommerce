import { GoogleTagManagerEvents, gtmPush } from '..'

export const hitsViewed = () => {
  gtmPush(GoogleTagManagerEvents.hitsViewed)
}
