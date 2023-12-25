import { Document } from '@contentful/rich-text-types'
import { EpCartItemInterface } from '@myplanetdigital/elasticpath'

export interface HeaderMenu {
  sys: Sys
  name: string
  link: Link
  variant: string
  description: null
  imagesCollection: ImagesCollection
  __typename: string
}

export interface ImagesCollection {
  items: any[]
  __typename: string
}

export interface Link {
  sys: Sys
  name: string
  label: string
  linkToEntry: null
  url: null
  params: null
  variant: string
  __typename: string
}

export interface Sys {
  id: string
  __typename: string
}

export interface HeaderData {
  searchText: string
  promotionalText: Document | null
  site: string
}

export interface HeaderObjectProps {
  headerData?: {
    fields: HeaderData | null
  } | null
  headerMenu: HeaderMenu[]
}

export interface HeaderProps {
  cartQuantity?: number
  headerData?: {
    fields: HeaderData | null
  } | null
  headerMenu: HeaderMenu[]
  cartData : EpCartItemInterface[] | undefined
}
