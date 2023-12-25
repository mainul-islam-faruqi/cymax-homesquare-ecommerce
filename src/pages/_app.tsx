import {
  ELASTIC_PATH_CLIENT_ID,
  ELASTIC_PATH_HEADERS_DEFAULT,
  ELASTIC_PATH_HEADERS_LOGGED_IN,
  ELASTIC_PATH_HOST,
  GOOGLE_TAG_MANAGER_ID,
  intlConfig,
  Layout,
} from '@modules/app'
import { useReferral } from '@modules/app/hooks/useReferral'
import { theme } from '@modules/chakra'
import { AffirmScript } from '@modules/components/AffirmScript'
import { Composable } from '@modules/composable'
import { initializeRUM } from '@modules/datadog/RUM'
import { ForterScript } from '@modules/forter/script'
import { GoogleTagManagerBase } from '@modules/gtm'
import { clearLoginInit } from '@modules/sso/Utilities/OidcUtilities'
import { ElasticPathProvider } from '@myplanetdigital/elasticpath'
import { NextSeo } from 'next-seo'
import { AppProps } from 'next/app'
import { useEffect } from 'react'

const App = ({ Component, pageProps: appProps }: AppProps) => {
  useReferral()
  // avoid type error on pageProps
  const pageProps: any = appProps
  const shouldClearRefinement = !Boolean(
    pageProps?.isPlp || pageProps?.isSearchPage
  )
  clearLoginInit(shouldClearRefinement)

  useEffect(() => {
    initializeRUM()
  }, [])

  return (
    <Composable pageProps={pageProps} intl={intlConfig} theme={theme}>
      <GoogleTagManagerBase googleTagManagerId={GOOGLE_TAG_MANAGER_ID} />
      <ElasticPathProvider
        clientId={ELASTIC_PATH_CLIENT_ID}
        host={ELASTIC_PATH_HOST}
        headers={ELASTIC_PATH_HEADERS_DEFAULT}
        headersLoggedIn={ELASTIC_PATH_HEADERS_LOGGED_IN}
      >
        <Layout>
          <NextSeo defaultTitle="Cymax" titleTemplate="%s" />
          <Component {...pageProps} />
          <ForterScript />
          <AffirmScript />
        </Layout>
      </ElasticPathProvider>
    </Composable>
  )
}

export default App
