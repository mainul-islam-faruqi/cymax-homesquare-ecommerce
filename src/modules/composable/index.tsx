import { ChakraProvider } from '@chakra-ui/react'
import {
  ComposableProvider,
  IntlConfig,
  IntlProvider,
  Main,
} from '@myplanetdigital/base'
import 'focus-visible/dist/focus-visible' // Disabling border for non-keyboard interactions
import { AppProps } from 'next/app'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'

export type ComposableProps = Pick<AppProps, 'pageProps'> & {
  children: React.ReactElement | React.ReactElement[]
  theme: any
  locale?: string
  intl: IntlConfig[]
  googleAnalyticsId?: string
  googleTagManagerId?: string
  appKey?: string
}

export const Composable = ({
  pageProps: composableProps,
  theme,
  intl,
  locale,
  children,
}: ComposableProps) => {
  const queryClientRef = React.useRef<QueryClient>()

  // Avoid type error
  const pageProps: any = composableProps

  if (queryClientRef.current == null) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 2.5 * 60 * 1000,
          cacheTime: 5 * 60 * 1000,
          refetchOnWindowFocus: false,
          // refetchOnMount: 'always',
        },
      },
    })
  }

  React.useEffect(() => {
    queryClientRef.current?.invalidateQueries()
  }, [])

  return (
    <ComposableProvider intl={intl} locale={locale}>
      <IntlProvider>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <ChakraProvider theme={theme}>
              <Main>{children}</Main>
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </IntlProvider>
    </ComposableProvider>
  )
}
