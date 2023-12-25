import { EpAccessTokenInterface } from '@myplanetdigital/elasticpath'

const TIME_THRESHOLD_SECONDS = 300 // 5 minutes

export const updateToken = async (
  refetch: any,
  currentToken?: EpAccessTokenInterface
) => {
  let token
  const currentTime = Math.round(Date.now() / 1000)
  if (
    !currentToken ||
    (currentToken &&
      currentToken.expires - currentTime < TIME_THRESHOLD_SECONDS)
  ) {
    const data = await refetch()
    token = data?.data?.access_token
  } else {
    token = currentToken?.access_token
  }
  return token
}
