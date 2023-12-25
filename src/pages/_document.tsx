import { ColorModeScript } from '@chakra-ui/react'
import {
  GOOGLE_TAG_MANAGER_ID,
  NEXT_PUBLIC_FAVICON,
  NEXT_PUBLIC_SITE_IDENTIFIER,
} from '@modules/app'
import fonts from '@modules/chakra/util/fonts.json'
import { GoogleTagManagerNoScript } from '@modules/gtm'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    const isCymax = NEXT_PUBLIC_SITE_IDENTIFIER === 'cymax'
    const faviconURL = NEXT_PUBLIC_FAVICON
      ? NEXT_PUBLIC_FAVICON
      : isCymax
      ? '/img/cymaxFavicon.ico'
      : '/img/homeSquareFavicon.ico'
    return (
      <Html>
        <Head>
          <link rel="icon" href={faviconURL} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            crossOrigin="true"
            href="https://fonts.gstatic.com"
          />
          <link
            rel="stylesheet"
            href={
              fonts.url ||
              'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
            }
          />
        </Head>
        <body>
          {/* GTM NoScript should be the first tag in <body> */}
          <GoogleTagManagerNoScript
            googleTagManagerId={GOOGLE_TAG_MANAGER_ID}
          />
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
