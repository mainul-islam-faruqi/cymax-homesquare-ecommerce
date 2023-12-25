import { Container, Spinner, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export const Loader = () => {
  const intl = useIntl()
  return (
    <Container
      w="100%"
      h="100vh"
      py={{ base: '4', md: '8' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Text mb={3}>{intl.formatMessage({ id: 'payment.loadingMessage' })}</Text>
      <Spinner />
    </Container>
  )
}
