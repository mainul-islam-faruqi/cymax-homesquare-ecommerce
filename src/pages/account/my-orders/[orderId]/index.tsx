import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Order } from '@modules/checkout/components/OrderConfirmation/types'
import { getOrderById } from '@modules/server/EP/getOrder'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AccountLayoutPageProps } from '../AccountLayoutPage/types'
const DynamicAccountLayoutPage = dynamic<AccountLayoutPageProps>(
  () => import('../AccountLayoutPage').then((mod) => mod.AccountLayoutPage),
  { ssr: false }
)

const OrderDetailsPage = () => {
  const [order, setOrders] = useState<Order>()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const fetchOrder = async (orderId: string) => {
    try {
      const response = await getOrderById(orderId)

      setOrders(response?.data)
    } catch (err) {
      setError('Failed to fetch orders.') // Set error state
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const { orderId } = router.query
      if (orderId != undefined) fetchOrder(orderId as string)
      // Fetch order details using orderId
    }
  }, [router.isReady, router.query])

  console.log(order, 'order')

  return (
    <DynamicAccountLayoutPage>
      <VStack spacing={4} align="stretch" m={4}>
        {/* order id */}
        <Heading
          as="h1"
          size="lg"
          my={6}
          fontWeight="normal"
          display="flex"
          gap={3}
        >
          <Text fontWeight="bold">Order</Text>
          <Text fontWeight="bold"> #{order?.id}</Text>{' '}
        </Heading>

        {/* order date */}
        <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 0, md: 1 }} mt={5}>
          <GridItem colSpan={{ base: 12, md: 4, lg: 3 }}>Order Date:</GridItem>
          <GridItem
            colSpan={{ base: 12, md: 8, lg: 9 }}
            mb={{ base: 2, md: 0 }}
          >
            <Text fontWeight="bold">
              {new Date(order?.meta.timestamps.created_at).toLocaleDateString()}
            </Text>
          </GridItem>
        </Grid>

        {/* order item with image */}
        <Box display="flex" alignItems="center">
          {/* Column 2 */}
          <Box flex="2" p={4} bg="lightgray" marginRight={10}>
            <img
              src="https://static-01.daraz.com.bd/p/4d2055761b288c7d2b57149f3eda091f.jpg"
              alt="Product Image"
              style={{ maxWidth: '100%' }}
            />
          </Box>

          {/* Column 10 */}
          <Box flex="10" p={4}>
            <Text fontSize="xl" fontWeight="bold">
              Product id
            </Text>
            <Text fontSize="lg">Product Name</Text>
            <Text fontSize="lg">Product Price</Text>
            <Text fontSize="md">Quantity</Text>
          </Box>
        </Box>

        {/* border bottom */}
        <Box borderBottom="1px solid #e2e8f0" pb={4}></Box>

        {/* 2nd section     */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }} gap={4}>
          {/* Column 1 (col-4) */}
          <Box gridColumn={{ base: 'auto', md: 'span 4' }}>
            <Heading
              as="h1"
              size="lg"
              my={6}
              fontWeight="normal"
              display="flex"
              gap={3}
            >
              <Text fontWeight="bold">Total</Text>
            </Heading>
          </Box>

          {/* Column 2 (col-8) */}
          <Box
            gridColumn={{ base: 'auto', md: 'span 8' }}
            marginTop={{ base: 4, md: 4 }}
          >
            {/* Your content for the second column goes here */}
            <VStack align="start">
              <Flex justifyContent="space-between" width="30%">
                <Text>Subtotal: </Text>
                <Text>$00</Text>
              </Flex>

              <Flex justifyContent="space-between" width="30%">
                <Text>Shipping: </Text>
                <Text>USA</Text>
              </Flex>

              <Flex justifyContent="space-between" width="30%">
                <Text>Discount: </Text>
                <Text>$00</Text>
              </Flex>

              <Flex justifyContent="space-between" width="30%">
                <Text>Tax: </Text>
                <Text>$00</Text>
              </Flex>

              <Flex justifyContent="space-between" width="30%">
                <Text>Total: </Text>
                <Text>$00</Text>
              </Flex>
            </VStack>
          </Box>
        </Grid>

        {/* border bottom */}
        <Box borderBottom="1px solid #e2e8f0" pb={4}></Box>
        {/* 3rd section */}
        <Grid
          templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(12, 1fr)' }}
          gap={4}
        >
          {/* Column 1 (col-4) */}
          <Box gridColumn={{ base: 'span 4', md: 'span 4' }}>
            <Heading
              as="h1"
              size="lg"
              my={6}
              fontWeight="normal"
              display="flex"
              gap={3}
            >
              <Text fontWeight="bold">Delivery</Text>
            </Heading>
          </Box>

          {/* Column 2 (col-4) */}
          <Box
            gridColumn={{ base: 'span 4', md: 'span 4' }}
            marginTop={{ base: 4, md: 4 }}
          >
            {/* Content for the second column goes here */}
            <VStack align="start">
              <Flex justifyContent="space-between" width="30%">
                <Text>Subtotal </Text>
              </Flex>

              <Flex justifyContent="space-between" width="30%">
                <Text>Shipping </Text>
              </Flex>

              <Flex justifyContent="space-between" width="30%">
                <Text>Discount: </Text>
                <Text>$00</Text>
              </Flex>
            </VStack>
          </Box>

          {/* Column 3 (col-4) */}
          <Box
            gridColumn={{ base: 'span 4', md: 'span 4' }}
            marginTop={{ base: 4, md: 4 }}
          >
            <VStack align="start">
              <Flex justifyContent="space-between" width="30%">
                <Text>Subtotal </Text>
              </Flex>

              <Flex justifyContent="space-between" width="30%">
                <Text>Shipping </Text>
              </Flex>

              <Flex justifyContent="space-between" width="30%">
                <Text>Discount: </Text>
                <Text>$00</Text>
              </Flex>
            </VStack>
          </Box>
        </Grid>
      </VStack>
    </DynamicAccountLayoutPage>
  )
}

export default OrderDetailsPage
