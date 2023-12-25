import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import {
  ContentfulImageOptions,
  ImageProps,
  ImgFitMode,
  ImgFormat,
} from './types'

export const buildContentfulImageUrl = (
  url = '',
  {
    width,
    height,
    fit,
    focusArea,
    format,
    quality,
    radius,
    progressive = false,
    png8 = false,
  }: ContentfulImageOptions = {}
) => {
  const params = []

  if (width) {
    params.push(`w=${width}`)
  }
  if (height) {
    params.push(`h=${height}`)
  }
  if (fit && fit !== ImgFitMode.Default) {
    params.push(`fit=${fit}`)
  }
  if (format) {
    params.push(`fm=${format}`)
  }
  if (focusArea) {
    params.push(`f=${focusArea}`)
  }
  if (quality) {
    params.push(`q=${quality}`)
  }
  if (radius) {
    params.push(`r=${radius}`)
  }
  // progressive can only be used if format of the image is JPG
  if (progressive && format === ImgFormat.JPG) {
    params.push(`fl=progressive`)
  }
  if (png8 && format === ImgFormat.PNG) {
    // SDK currently doesn't implement this endpoint.
    params.push(`fl=png8`)
  }
  return `https:${params.length > 0 ? [url, params.join('&')].join('?') : url}`
}

export const ComposableImage = ({
  image,
  name,
  alt,
  options,
  objectFit,
}: ImageProps) => {
  const url = image?.file?.url

  if (!url) {
    return null
  }

  return (
    <Box
      position="relative"
      width={options?.width || '100%'}
      height={options?.height || '70vh'}
      id={name}
    >
      <Image
        src={buildContentfulImageUrl(url, options)}
        alt={alt}
        width={options?.width}
        height={options?.height}
        layout="fill"
        objectFit={objectFit ?? 'cover'}
        objectPosition={options?.focusArea ?? 'center'}
      />
    </Box>
  )
}
