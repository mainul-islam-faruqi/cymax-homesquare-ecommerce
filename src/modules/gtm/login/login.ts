
import { GoogleTagManagerEvents, gtmTrack } from '..'
import { loginDetails } from './types'
export const login = (payload: loginDetails) => {
  gtmTrack(GoogleTagManagerEvents.login, payload)
}
