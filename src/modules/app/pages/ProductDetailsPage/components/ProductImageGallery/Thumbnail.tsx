import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import { FileType, ThumbnailType } from './types'

export const Thumbnail = ({
  idx,
  thumbnail: { url, type, name },
  selectedImageId,
  handleImage,
}: ThumbnailType) => {
  const borderColor = idx === selectedImageId ? 'primary.500' : 'transparent'

  return (
    <Box
      key={url}
      w="100%"
      pt="100%"
      position="relative"
      boxSizing="content-box"
      cursor="pointer"
      border="2px solid"
      borderColor={borderColor}
      onClick={() => handleImage(idx)}
      onMouseEnter={() => handleImage(idx)}
      _hover={{
        border: '2px solid',
        borderColor: `${borderColor}`,
      }}
      filter="brightness(0.92)"
      mixBlendMode="multiply"
    >
      <Image
        priority
        layout="fill"
        src={type === FileType.image ? url : '/img/video-thumbnail.svg'}
        alt={name}
        objectFit="contain"
      />
    </Box>
  )
}
