import { Document } from '@contentful/rich-text-types'
import { Alignment } from '@modules/contentful/utils'

export interface TextComponentProps {
  name: string
  title: string
  titleAlignment: Alignment
  text: Document
  textAlignment: Alignment
  withSideMenu?: boolean
}
