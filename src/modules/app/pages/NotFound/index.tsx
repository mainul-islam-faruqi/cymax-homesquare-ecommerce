import { Box } from '@chakra-ui/react'

type ComponentResolverType = {
  children: React.ReactNode
}

export const NOT_FOUND_PAGE = '404'

export const NotFound = ({ children }: ComponentResolverType) => {
  return (
    <Box
      as="main"
      m="0 auto"
      maxW={{ base: 'container.max', lg: '100%' }}
      py={{ base: 3, md: 16 }}
      px={{ base: 0, lg: 24 }}
    >
      {children}
    </Box>
  )
}
