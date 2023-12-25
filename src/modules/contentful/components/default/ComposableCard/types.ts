import { Document } from '@contentful/rich-text-types'
import { ContentfulCTA } from '@modules/contentful/pages/types'
import { Alignment } from '@modules/contentful/utils'
import {
  ThemeVariant,
  VerticalAlignment,
} from '@modules/contentful/utils/types'
import { Sys } from 'contentful'
import { ComposableImage } from '../ComposableImage/types'

export interface Card {
  name: string
  image: {
    fields: ComposableImage
    sys: Sys
  }
  cardLink?: {
    fields: ContentfulCTA
    sys: Sys
  }
  eyebrow?: string
  title?: string
  description?: Document
  variant: CardVariant
  horizontalAlignment?: Alignment
  verticalAlignment?: VerticalAlignment
  theme?: ThemeVariant
}

export enum CardVariant {
  Default = 'Default card',
  Cover = 'Cover card',
}
