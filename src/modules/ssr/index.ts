import { GetServerSidePropsContext } from 'next'
import { serverSideCoreApp } from '@myplanetdigital/base'
import { AxiosInstance } from 'axios'
import { ELASTIC_PATH_CLIENT_ID, ELASTIC_PATH_HOST } from '@modules/app'
import { getServerSideElasticPath } from '@myplanetdigital/elasticpath'
import {
  getContentfulMegaMenuKey,
  contentfulMegaMenuFetchService,
} from '@modules/contentful'

export interface ServerSideAppParams {
  context: GetServerSidePropsContext
}

export interface ServerSideAppParams {
  withElasticPathClient?: boolean
  context: GetServerSidePropsContext
}

export const createServerSideApp = async ({
  context,
  withElasticPathClient,
}: ServerSideAppParams) => {
  let elasticPathClient: AxiosInstance | null = null
  let elasticPathAccessToken: string = ''
  const serverSideApp = await serverSideCoreApp({ context })
  const locale = serverSideApp.locale

  if (withElasticPathClient) {
    const elasticPath = await getServerSideElasticPath({
      clientId: ELASTIC_PATH_CLIENT_ID,
      host: ELASTIC_PATH_HOST,
    })

    elasticPathClient = elasticPath.httpClient
    elasticPathAccessToken = elasticPath.accessToken.access_token
  }

  await serverSideApp.queryClient.prefetchQuery(
    getContentfulMegaMenuKey(locale),
    async () => await contentfulMegaMenuFetchService({ locale })
  )

  return {
    serverSideApp,
    elasticPathClient,
    elasticPathAccessToken,
  }
}
