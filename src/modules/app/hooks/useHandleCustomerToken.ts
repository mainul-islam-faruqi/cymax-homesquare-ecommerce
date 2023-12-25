import { useElasticPath } from '@myplanetdigital/elasticpath'

const TIME_THRESHOLD_SECONDS = 600 // 10 minutes

export const useHandleCustomerToken = () => {
  const { customerToken, setCustomerToken } = useElasticPath()
  const currentTime = Math.round(Date.now() / 1000)
  if (
    customerToken &&
    customerToken.expires - currentTime < TIME_THRESHOLD_SECONDS
  ) {
    setCustomerToken(null)
  }
}
