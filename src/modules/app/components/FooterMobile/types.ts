import { ContentfulCTA } from '@modules/contentful/pages/types'
import { MegaMenuItem } from '@modules/contentful/utils'
import { FooterData } from '../Footer'

export type LinkItem = {
  link?: ContentfulCTA
  sys?: {
    id: string
  }
}

export interface LinkStackProps {
  item?: LinkItem
  level: number
}

export interface AccordionStackProps {
  item: MegaMenuItem
}

export interface FooterMobileProps {
  menu: any
  footerData?: {
    fields?: FooterData
  }
}
