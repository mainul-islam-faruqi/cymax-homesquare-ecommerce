import { MegaMenuItemFragment, Maybe } from '@modules/contentful/utils'

export type MegaDrawerType = {
  data: MegaDrawerItemType[]
}

export interface MegaDrawerItemType {
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

export interface MegaDrawerItemProps {
  item: MegaDrawerItemType | Maybe<MegaMenuItemFragment>
  closeAll: () => void
}
