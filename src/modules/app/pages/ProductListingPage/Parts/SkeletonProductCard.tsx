import { AspectRatio, Box, Skeleton, VStack } from '@chakra-ui/react'

export const SkeletonProductCard = () => {
  return (
    <VStack as="article" w="100%" spacing="12px" alignItems="initial">
      <Box as="a" cursor="pointer" position={'relative'}>
        <AspectRatio ratio={400 / 500} w="100%">
          <Skeleton w="100%" h="100%" />
        </AspectRatio>
      </Box>
      <VStack spacing="xxxxs" alignItems="initial">
        <Skeleton height={'14px'} width="60px" />
        <Skeleton height={'16px'} width="90px" />
        <Skeleton height={'14px'} width="40px" />
      </VStack>
    </VStack>
  )
}
