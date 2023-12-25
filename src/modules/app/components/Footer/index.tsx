import { useBreakpointValue } from '@chakra-ui/react'
import { FooterMobile } from '@modules/app/components/FooterMobile'
import { FooterDesktop } from '../FooterDesktop'
import { Legal } from '../Legals'

export interface FooterData {
  copyright: string
  legals: Legal[]
  site: string
  socialIcons: string[]
}

export interface FooterObjectProps {
  footerData?: {
    fields: FooterData
  }
  footerMenu: any
}

export const Footer = ({ footerData, footerMenu }: FooterObjectProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return isMobile ? (
    <FooterMobile menu={footerMenu} footerData={footerData} />
  ) : (
    <FooterDesktop footerData={footerData} menu={footerMenu} />
  )
}
