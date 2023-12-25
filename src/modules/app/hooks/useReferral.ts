import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useReferral = () => {
  const { isReady, query } = useRouter()
  useEffect(() => {
    if (isReady) {
      // Just in case it's coming back from amazonPay it won't overwrite
      let referral = localStorage.getItem('referral') ?? 'direct'
      if (query.src && query.srcid) {
        referral = `${query.src}-${query.srcid}`
      } else if (query.src || query.srcid) {
        referral = (query.src as string) ?? (query.srcid as string)
      } else if (query.utm) {
        referral = query.utm as string
      }

      localStorage.setItem('referral', referral)
    }
  }, [isReady])
}
