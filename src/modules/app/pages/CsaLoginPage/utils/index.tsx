import { PublicProfileAccessToken } from '../hooks/types'
const TIME_THRESHOLD_SECONDS = 300000 // 5 minutes

export const isValidToken = (token: PublicProfileAccessToken) => {
  const currentTime = Date.now()
  const expiryTime = new Date(token.expires)
  return expiryTime.getTime() - currentTime > TIME_THRESHOLD_SECONDS
}
