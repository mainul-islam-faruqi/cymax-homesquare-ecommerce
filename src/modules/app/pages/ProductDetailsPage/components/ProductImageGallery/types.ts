export enum FileType {
  'video' = 'video',
  'image' = 'image',
}

export interface GalleryProduct {
  url: string
  type: FileType
  name: string
}

export interface Gallery {
  items: GalleryProduct[]
  variantUrl: string | null | undefined
}

export interface ThumbnailType {
  thumbnail: GalleryProduct
  idx: number
  selectedImageId: number
  handleImage: (imageIndex: number) => void
}
