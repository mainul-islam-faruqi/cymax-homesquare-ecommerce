import { Document } from '@contentful/rich-text-types'
import { ContentfulCTA } from '@modules/contentful/pages/types'
import { Alignment, BackgroundColor, Sys } from '@modules/contentful/utils'
import { ComposableImage } from '../ComposableImage/types'

type ImageProps = {
  sys: Sys
  fields: ComposableImage
}

export type IconCardProps = {
  fields: {
    name: string
    alignment: Alignment
    image?: ImageProps
    title?: string
    text?: Document
    cta?: {
      fields: ContentfulCTA
      sys: Sys
    }
  }
  cardBackgroundColor: BackgroundColor
}
