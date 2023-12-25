import { Container, ContainerProps, useMediaQuery } from '@chakra-ui/react'

interface PageContainerProps {
  children: React.ReactElement
  containerProps?: ContainerProps
}

export const PageContainer = ({
  containerProps,
  children,
}: PageContainerProps) => {
  const [isHigherThan1440] = useMediaQuery(`(min-width: 1440px) `)
  return (
    <Container
      aria-live="polite"
      aria-busy={true}
      maxW="container.xl"
      margin="0 auto"
      py={{ base: 5, md: 10 }}
      px={isHigherThan1440 ? 0 : { base: 5, md: 10 }}
      {...containerProps}
    >
      {children}
    </Container>
  )
}
