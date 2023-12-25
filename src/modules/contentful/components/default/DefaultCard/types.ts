import { Document } from "@contentful/rich-text-types"
import { Alignment } from "@modules/contentful/utils"
import { Sys } from "contentful"
import { ComposableImage } from "../ComposableImage/types"

export interface DefaultCardProps {
  name: string
  image:  {
    fields: ComposableImage
    sys: Sys
  }
  eyebrow?: string
  title?: string
  description?: Document
  horizontalAlignment?: Alignment
  verticalAlignment?: Alignment
}

