import { useOidcProvider } from '@modules/sso'
import { useRouter } from 'next/router'
import { OIDC_PROVIDER_CLIENT_ID } from '../constants'
import { useCsa } from '../pages/CsaLoginPage/hooks'
import { paths } from '../paths'

export const useLogout = () => {
  const router = useRouter()
  const { token: csaToken, logout: csaLogout } = useCsa()
  const { issuerUrl, refetch } = useOidcProvider()

  const logout = () => {
    localStorage.clear()
    refetch()
    if (!!csaToken) {
      csaLogout()
      router.push(paths.HOME)
    } else {
      // Avoid looping back to login page.
      localStorage.setItem('loginInit', 'true')

      const baseURL = window != null ? window.location.origin : ''
      const logoutUrl = `${issuerUrl}v2/logout?client_id=${OIDC_PROVIDER_CLIENT_ID}&returnTo=${baseURL}`
      router.push(logoutUrl)
    }
  }

  return {
    logout,
  }
}
