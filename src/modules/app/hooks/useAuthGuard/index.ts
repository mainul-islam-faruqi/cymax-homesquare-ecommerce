import { paths } from '@modules/app/paths'
import { useUser } from '@myplanetdigital/elasticpath'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useAuthGuard = () => {
  const router = useRouter()
  const currentRoute = router.pathname
  const { customer, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading) {
      if (customer) {
        router.push(currentRoute)
      }

      if (!customer) {
        router.push(paths.LOGIN)
      }
    }
  }, [customer, isLoading])

  return {
    isAuth: Boolean(customer),
  }
}
