import {
  AccordionButtonProps,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionProps,
  TextProps,
} from '@chakra-ui/react'
import { ContentfulCTA } from '@modules/contentful/pages/types'
import { Sys } from '@modules/contentful/utils'

interface AccordionStyleProps {
  containerProps?: any
  accordionProps?: AccordionProps
  accordionPanelProps?: AccordionPanelProps
  accordionListTextProps?: TextProps
  accordionItemProps?: AccordionItemProps
  accordionButtonTextProps?: TextProps
  accordionButtonProps?: AccordionButtonProps
}

type LinkContent = {
  content: string
  id?: string | number
}

export interface LinksProps extends AccordionStyleProps, LinkContent {
  id?: string
  sys?: Sys
  fields?: ContentfulCTA
}

export interface ItemType extends AccordionStyleProps {
  id?: string
  title: string
  titleLink?: LinksProps
  onClick?: () => void
  links?: LinksProps[]
}

export type ButtonType = Omit<ItemType, 'links'> & {
  isExpanded: boolean
}

export interface AccordionType extends AccordionStyleProps {
  fields: {
    name?: string
    title?: string
    items: ItemType[]
  }
}

export type IconProps = Pick<ButtonType, 'isExpanded'>

export interface SideMenu {
  name: string
  title: string
  items: ItemType[]
}

export type HeaderType = {
  title: string
  indexes: number[]
  onClick: () => void
}
