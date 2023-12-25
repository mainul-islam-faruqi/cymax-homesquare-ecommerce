import { EpServiceDeps } from '@myplanetdigital/elasticpath'

export type tokenFromOidcData = EpServiceDeps & {
  authorizationCode: string
  redirectUri: string
  codeVerifier: string
}

export type oidcCallbackData = EpServiceDeps & { urlQuery: any }
