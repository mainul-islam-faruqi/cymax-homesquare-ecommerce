import { Document } from '@contentful/rich-text-types'
import { ThemeVariant } from '@modules/contentful/utils/types'
import { Sys } from 'contentful'
import { ComposableImage } from '../ComposableImage/types'

export interface BannerProps {
  name: string
  eyebrow?: string
  content?: Document
  bgImage: {
    fields: ComposableImage
    sys: Sys
  }
  style: BannerStyle
  theme: ThemeVariant
  spacing?: BannerSpacing
  fullWidth: boolean
  width?: string
  margin?: string
}

export enum BannerStyle {
  Left = 'Left Aligned',
  Center = 'Center Aligned',
  Right = 'Right Aligned',
}

export enum BannerSpacing {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}
