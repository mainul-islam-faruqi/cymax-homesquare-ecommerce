import {
  Alignment,
  BackgroundColor,
  GridColumns,
} from '@modules/contentful/utils'
import { Sys } from 'contentful'
import { Card } from '../ComposableCard/types'
import { IconCardProps } from '../ComposableIconCard/types'
import { ComposableImage } from '../ComposableImage/types'

export type ComposableContentGridProps = {
  name: string
  style: GridColumns
  columns: any[]
  alignment: Alignment
  cardBackgroundColor: BackgroundColor
  title?: string
}

export interface RenderGridComponentProps {
  fields: (ComposableImage & Card & IconCardProps)
  sys: Sys
  cardBackgroundColor?: BackgroundColor
}

export type GridHeaderProps = Pick<ComposableContentGridProps, 'title' | 'alignment'>
