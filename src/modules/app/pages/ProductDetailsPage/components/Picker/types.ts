import {
  FormControlProps,
  UseRadioGroupProps,
  UseRadioProps
} from '@chakra-ui/react'
import { EpFlowFieldValue } from '@myplanetdigital/elasticpath'

export interface ColorPickerProps extends UseRadioGroupProps {
  options: Option[]
  rootProps?: FormControlProps
  hideLabel?: boolean
  label?: EpFlowFieldValue | string
  variantSelector?: (url: string | null | undefined) => void
}

export interface Option {
  id: string
  stock_available: number
  slug: string
  label: string
  image_url: string
}

export interface ColorPickerOptionProps extends UseRadioProps {
  id: string
  stock_available: number
  slug: string
  image_url: string
  isImage?: boolean
  onMouseEnter?: () => void;
  onMouseLeave?: () => void; 
}
