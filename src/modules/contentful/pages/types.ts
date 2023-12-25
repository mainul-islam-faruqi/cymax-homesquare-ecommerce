import { ButtonProps } from '@chakra-ui/react'
import { SideMenu } from '@modules/components/Accordion/types'
import { Sys } from 'contentful'
import { ThemeVariant } from '../utils/types'

export interface ContentfulEntry<T> {
  sys: {
    id: string
    [name: string]: any
  }
  fields: T
}

export interface ContentfulPLPPage {
  name: string
  site: string
  slug: string
  title: string
  hiddenfilters: ContentfulEntry<MetaTag>[]
  breadcrumbs?: ContentfulEntry<ContentfulCTA>[]
  seo?: ContentfulEntry<ContentfulSEO>
  urlfilters?: ContentfulEntry<MetaTag>[]
}

export interface ContentfulSEO {
  name: string
  title?: string
  description?: string
  keywords?: string[]
  no_index?: boolean
  no_follow?: boolean
  metaTags?: ContentfulEntry<MetaTag>[]
}

export interface ContentfulCTA {
  name: string
  label: string
  variant: 'Link' | 'Button - Solid' | 'Button - Outline' | 'Button - Ghost'
  linkToEntry?: {
    fields: ComposePage
    sys: Sys
    slug?: string //temporary for GQL
    __typename?: string //temporary for GQL
  }
  url?: string
  params?: string
  buttonChakraProps?: ButtonProps
  textOverflowEllipsis?: boolean
  theme?: ThemeVariant
}

export interface ContentfulGenericPageDataProps {
  fields: ComposePage
  sys: Sys
}

export interface ContentfulGenericPageProps {
  data: ContentfulGenericPageDataProps
  isPreview?: boolean
  isNoMatch?: boolean
}

export interface GenericPage {
  title: string
  slug: string
  site: string
  name: string
  seo: {
    fields: PageSEO
    sys: Sys
  }
  items: {
    fields: any
    sys: Sys
  }
}

export interface GenericPageWithMenu {
  title: string
  slug: string
  site: string
  name: string
  seo: {
    fields: PageSEO
    sys: Sys
  }
  sideMenu: {
    fields: SideMenu
    sys: Sys
  }
  items: {
    fields: any
    sys: Sys
  }
}

export type ComposePage = GenericPage & GenericPageWithMenu

export interface PageSEO {
  title: string
  name: string
  description: string
  keywords?: string[]
  no_index: boolean
  no_follow: boolean
  metaTags: ContentfulEntry<MetaTag>[]
}

export const PAGES_TYPES = {
  GENERIC: 'genericPage',
  GENERIC_WITH_MENU: 'genericPageWithMenu',
  LONGTAIL_PLP: 'plp',
}

export interface MetaTag {
  name: string
  content: string
}
