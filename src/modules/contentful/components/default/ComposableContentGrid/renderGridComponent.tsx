import { getImageOptions } from '@modules/app/utils'
import { ComposableIconCard, ComposableImage } from '../'
import { ComposableCard } from '../ComposableCard'

import { RenderGridComponentProps } from './types'

export const renderGridComponent = (props: RenderGridComponentProps) => {
  const key = props?.sys?.contentType?.sys?.id

  switch (key) {
    case 'image':
      return (
        <ComposableImage
          image={props?.fields?.image?.fields}
          key={props.sys.id}
          alt={props?.fields?.alt}
          objectFit={props?.fields?.objectFit ?? undefined}
          options={getImageOptions(props.fields)}
        />
      )
    case 'card':
      return <ComposableCard key={props.sys.id} {...props?.fields} />
    case 'iconCard':
      return <ComposableIconCard key={props.sys.id} {...props} />

    default:
      // eslint-disable-next-line no-console
      console.warn(`Component don't have a render function`)
  }
}
