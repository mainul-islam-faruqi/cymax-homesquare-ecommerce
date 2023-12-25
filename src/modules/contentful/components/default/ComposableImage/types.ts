import { Sys } from '@modules/contentful/utils'

declare type ImgElementStyle = NonNullable<
  JSX.IntrinsicElements['img']['style']
>

export interface ImageProps {
  image: ImageAsset
  name?: string
  alt?: string
  options?: ContentfulImageOptions
  objectFit?: ImgElementStyle['objectFit']
}

export interface ImageAsset {
  title: string
  description: string
  file: {
    url: string
    details: {
      size: number
      image?: {
        width: number
        height: number
      }
    }
    fileName: string
    contentType: string
  }
}

export interface ComposableImage {
  name?: string
  image: {
    fields: ImageAsset
    sys: Sys
  }
  alt?: string
  fit?: ImgFitMode
  focusArea?: ImgFocusArea
  format?: ImgFormat
  quality?: number
  width?: number
  height?: number
  radius?: number
  progressive?: boolean
  png8?: boolean
  pixelRatio?: number
  objectFit?: ImgElementStyle['objectFit']
}
export interface ContentfulImageOptions {
  fit?: ImgFitMode
  focusArea?: ImgFocusArea
  format?: ImgFormat
  quality?: number
  width?: number
  height?: number
  radius?: number
  progressive?: boolean
  png8?: boolean
  pixelRatio?: number
}

export enum ImgFitMode {
  Default = 'default',
  Pad = 'pad',
  Fill = 'fill',
  Scale = 'scale',
  Crop = 'crop',
  Thumb = 'thumb',
}

export enum ImgFocusArea {
  Center = 'center',
  Top = 'top',
  Right = 'right',
  Left = 'left',
  Bottom = 'bottom',
  TopRight = 'top_right',
  TopLeft = 'top_left',
  BottomRight = 'bottom_right',
  BottomLeft = 'bottom_left',
  Face = 'face',
  Faces = 'faces',
}

export enum ImgFormat {
  JPG = 'jpg',
  PNG = 'png',
  WEBP = 'webp',
  GIF = 'gif',
  AVIF = 'avif',
}
