import { Document } from '@contentful/rich-text-types'
import { Alignment, ThemeVariant } from '@modules/contentful/utils/types'
import { Sys } from 'contentful'
import { ComposableImage } from '../ComposableImage/types'

export interface SplitBannerProps {
  name: string
  eyebrow?: string
  mainContent?: Document
  mainContentAlignment?: Alignment
  additionalContent: {
    fields: ComposableImage
    sys: Sys
  }
  orientation: SplitBannerOrientation
  theme: ThemeVariant
  fullWidth: boolean
}

export enum SplitBannerOrientation {
  TextLeft = 'Main Content - Additional Content',
  TextRight = 'Additional Content - Main Content',
}
