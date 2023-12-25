import { getImageOptions } from '@modules/app/utils'
import {
  BannerImageCarousel,
  Carousel,
  ComposableBanner,
  ComposableContentGrid,
  ComposableImage,
  TextComponent,
} from '@modules/contentful/components/default'
import React from 'react'
import { SplitBanner } from '../../default/SplitBanner'

type ComponentResolverType = {
  items: any
  withSideMenu?: boolean
}

export const ComponentResolver = ({
  items,
  withSideMenu,
}: ComponentResolverType) => {
  return (
    <>
      {React.Children.toArray(
        items?.map((item: any) => {
          switch (item?.sys?.contentType?.sys?.id) {
            case 'banner': {
              return <ComposableBanner key={item.sys.id} {...item?.fields} />
            }
            case 'bannerImageCarousel': {
              return <BannerImageCarousel key={item.sys.id} {...item?.fields} />
            }
            case 'grid': {
              return (
                <ComposableContentGrid key={item.sys.id} {...item?.fields} />
              )
            }
            case 'image': {
              return (
                <ComposableImage
                  key={item.sys.id}
                  objectFit={item?.fields?.objectFit ?? undefined}
                  image={item?.fields?.image?.fields}
                  alt={item?.fields?.alt}
                  options={getImageOptions(item.fields)}
                />
              )
            }
            case 'textComponent': {
              return (
                <TextComponent
                  withSideMenu={withSideMenu}
                  key={item.sys.id}
                  {...item?.fields}
                />
              )
            }
            case 'splitBanner': {
              return <SplitBanner key={item.sys.id} {...item?.fields} />
            }
            case 'carousel': {
              return <Carousel key={item.sys.id} {...item?.fields} />
            }
            default:
              // eslint-disable-next-line no-console
              console.warn(
                `Component of type ${item?.sys?.contentType?.sys?.id} don't have a render function`
              )
              return null
          }
        })
      )}
    </>
  )
}
