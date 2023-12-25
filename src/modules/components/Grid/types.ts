import { FlexProps } from '@chakra-ui/react'
import {
  ComposableContentGridProps,
  RenderGridComponentProps,
} from '@modules/contentful/components/default/ComposableContentGrid/types'

interface Props extends ComposableContentGridProps {
  gap?: string
  render: (props: RenderGridComponentProps) => JSX.Element | undefined
}

export type GridProps = Props & FlexProps
