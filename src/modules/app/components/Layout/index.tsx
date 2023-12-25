import { Box, Flex } from '@chakra-ui/react'
import { Footer, FooterData, Header } from '@modules/app'
import { CheckoutFooter } from '@modules/app/components/CheckoutFooter'
import { useHandleCustomerToken } from '@modules/app/hooks/useHandleCustomerToken'
import { paths } from '@modules/app/paths'
import {
  useContentfulFooter,
  useContentfulHeader,
  useContentfulMegaMenu,
} from '@modules/contentful'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { HeaderMenu } from '../Header/types'

interface LayoutProps {
  children: ReactElement | ReactElement[]
}

const noFooter = [
  '/checkout/paypalReturn',
  '/checkout/amazonOrder',
  '/checkout/amazonReturn',
]

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter()
  useHandleCustomerToken()

  let headerMenu = null
  let footerMenu = null

  const { data: headerData } = useContentfulHeader()
  const site = headerData?.fields?.linkMenus?.fields?.site
  const { data: footerData } = useContentfulFooter()
  const headerMenuName = headerData?.fields?.linkMenus?.fields?.name
  const footerMenuName = footerData?.fields?.linkMenus?.fields?.name
  const { data } = useContentfulMegaMenu(site)

  const items = data?.items
  const numItems = items?.length || 0

  for (let i = 0; i < numItems; i++) {
    if (headerMenu && footerMenu) {
      break
    }
    if (items?.[i]?.name == headerMenuName) {
      headerMenu = items?.[i]?.itemsCollection?.items
    }
    if (items?.[i]?.name == footerMenuName) {
      footerMenu = items?.[i]?.itemsCollection?.items
    }
  }

  if (pathname?.startsWith('/checkout') && pathname !== paths.CHECKOUT_LOGIN) {
    return (
      <Flex flexDirection="column" backgroundColor="shading.100">
        {children}
        {!noFooter?.includes(pathname) && <CheckoutFooter data={footerData} />}
      </Flex>
    )
  }

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Header headerData={headerData} headerMenu={headerMenu as HeaderMenu[]} />

      <Box flexGrow={1}>{children}</Box>

      <Footer
        footerMenu={footerMenu}
        footerData={footerData as { fields: FooterData }}
      />
    </Flex>
  )
}
