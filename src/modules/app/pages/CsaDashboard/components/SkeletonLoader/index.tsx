import {
  Box,
  Container,
  Flex,
  Skeleton,
  useBreakpointValue,
  useMediaQuery,
} from '@chakra-ui/react'

export const SkeletonLoader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [isHigherThan1440] = useMediaQuery(`(min-width: 1440px) `)

  return (
    <Box
      maxWidth="container.xl"
      margin="0 auto"
      w="100%"
      px={isHigherThan1440 ? 0 : { base: 0, md: 10 }}
    >
      {!isMobile && <Skeleton ml={3} mt={10} mb={6} />}
      <Flex gap={{ base: 0, md: 10 }} direction={{ base: 'column', md: 'row' }}>
        <Container p={0} maxWidth={{ base: '100%', md: '20rem' }} width="100%">
          {!isMobile && <Skeleton height="10rem" />}
        </Container>
        {isMobile && <Skeleton mt={6} mb={1} ml={5} />}
        <Container p={{ base: 5, md: 0 }} maxWidth="100%">
          <Skeleton height="10rem" />
        </Container>
      </Flex>
    </Box>
  )
}
