import {
  Box,
  ListItem,
  SimpleGrid,
  UnorderedList,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Video } from '@modules/app/components/Video'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { Thumbnail } from './Thumbnail'
import { FileType, Gallery } from './types'

export const ProductImageGallery: React.FC<Gallery> = ({
  items,
  variantUrl,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [selectedImageId, setSelectedImageId] = useState(0)
  const [isCtrlPressed, setIsControlPressed] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleImage = useCallback((imageIndex: number) => {
    setSelectedImageId(imageIndex)
  }, [])

  const height = useMemo(() => (isMobile ? '335px' : '500px'), [isMobile])
  const position = useMemo(() => (isMobile ? 'inherit' : 'sticky'), [isMobile])
  const [scale, setScale] = useState(1)

  useEffect(() => {
    handleImage(0)
  }, [handleImage, items])

  const handleKeyDown = (event: any) => {
    if (event.ctrlKey) setIsControlPressed(true)
  }
  const handleKeyUp = () => {
    setIsControlPressed(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <Box top="200px" position={position}>
      <UnorderedList p="0" m={0} mb={4} listStyleType="none">
        {items.map((item, idx) => (
          <ListItem
            top={0}
            left={0}
            justifyContent="center"
            key={`${item.url}-parentImage`}
            display={idx === selectedImageId ? 'flex' : 'none'}
            cursor={isCtrlPressed ? 'zoom-out' : 'zoom-in'}
            position="relative"
          >
            {item.type === FileType.image && (
              <TransformWrapper
                onZoom={(ref) => setScale(ref.state.scale)}
                initialScale={scale}
                panning={{ disabled: scale === 1 && isMobile }}
              >
                {({ resetTransform, zoomIn }) => (
                  <TransformComponent
                    contentStyle={{
                      width: '100%',
                      height,
                    }}
                    wrapperStyle={{
                      width: '100%',
                      height,
                    }}
                  >
                    <Box
                      w="100%"
                      h="100%"
                      bg="#00000008"
                      position="absolute"
                      zIndex={1}
                      mixBlendMode="multiply"
                      onMouseDown={() => setIsDragging(false)}
                      onMouseMove={() => setIsDragging(true)}
                      onClick={() => {
                        if (isCtrlPressed && !isDragging) {
                          resetTransform()
                        } else if (!isDragging) {
                          zoomIn()
                        }
                      }}
                      onContextMenu={(event) => {
                        event.preventDefault()
                        resetTransform()
                      }}
                    />
                    <Image
                      priority
                      src={
                        !isMobile
                          ? variantUrl
                            ? variantUrl
                            : item.url
                          : item.url
                      }
                      alt={item.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </TransformComponent>
                )}
              </TransformWrapper>
            )}
            {item.type === FileType.video && (
              <Video
                src={item.url}
                active={idx === selectedImageId}
                width="100%"
                height={height}
              />
            )}
          </ListItem>
        ))}
      </UnorderedList>
      {items.length > 0 && (
        <SimpleGrid columns={{ base: 5, md: 8 }} gap={3}>
          {items.map((item, idx) => (
            <Thumbnail
              key={`${item.url}-thumbnail`}
              idx={idx}
              thumbnail={item}
              selectedImageId={selectedImageId}
              handleImage={handleImage}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}
