import { useIntl } from 'react-intl'
import { Box, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useComposable } from '@myplanetdigital/base'

export const CartEmptyState = () => {
  const intl = useIntl()
  const router = useRouter()
  const { path } = useComposable()

  return (
    <Box
      width="300px"
      borderWidth="1px"
      my="80px"
      mx="auto"
      p={6}
      borderRadius="base"
      textAlign="center"
    >
      <Text>{intl.formatMessage({ id: 'cart.emptyState' })}</Text>
      <Button
        mt={6}
        colorScheme="blue"
        rounded="full"
        variant="solid"
        onClick={() => router.push(path.getHome())}
      >
        {intl.formatMessage({ id: 'action.continueShopping' })}
      </Button>
    </Box>
  )
}
