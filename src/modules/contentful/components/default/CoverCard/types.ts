import { Document } from '@contentful/rich-text-types'
import {
  Alignment,
  ThemeVariant,
  VerticalAlignment,
} from '@modules/contentful/utils/types'
import { Sys } from 'contentful'
import { ComposableImage } from '../ComposableImage/types'

export interface CoverCardProps {
  name: string
  image: {
    fields: ComposableImage
    sys: Sys
  }
  eyebrow?: string
  title?: string
  description?: Document
  horizontalAlignment?: Alignment
  verticalAlignment?: VerticalAlignment
  theme: ThemeVariant
}
