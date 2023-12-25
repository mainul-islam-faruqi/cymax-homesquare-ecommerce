import { AccordionProps } from '@chakra-ui/react'
import { EpFlowFieldValue } from '@modules/ep'

export type Bundle = {
  id: string
  name: string
  slug: string
  url: string
  brand?: EpFlowFieldValue
  category?: EpFlowFieldValue
  variant?: EpFlowFieldValue
  price: number
  quantity: number
}

export type BundleDetailsAccordionType = {
  items: Bundle[]
  title?: string
  borderBottom?: boolean
  accordionProps?: AccordionProps
}

export interface Option {
  id: string
  quantity: number
  type: string
}

export interface IncludedItems {
  name: string
  options: Option[]
}

export interface BundleComponents {
  IncludedItems: IncludedItems
}
