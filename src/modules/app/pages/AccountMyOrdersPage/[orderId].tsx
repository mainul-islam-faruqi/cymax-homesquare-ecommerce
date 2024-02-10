import { ChevronLeftIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  Item,
  Order,
} from '@modules/checkout/components/OrderConfirmation/types'
import { getOrderById } from '@modules/server/EP/getOrder'
import { getOrderItemsById } from '@modules/server/EP/getOrderItems'
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
  const [orderItems, setOrderItems] = useState<Item[]>()

  const [error, setError] = useState<string | null>(null)
  const [shippingPrice, setShippingPrice] = useState<string | null>(null)
  const router = useRouter()

  const fetchOrder = async (orderId: string) => {
    try {
      const response = await getOrderById(orderId)
      setOrders(response?.data)
      const shippingFormatted = order?.meta.display_price.shipping.formatted
      setShippingPrice(
        shippingFormatted && +shippingFormatted != 0
          ? shippingFormatted
          : 'Free'
      )
    } catch (err) {
      setError('Failed to fetch orders.') // Set error state
    }
  }

  const fetchOrderItems = async (orderId: string) => {
    try {
      const response = await getOrderItemsById(orderId)
      if (response?.data) {
        const filteredArray = response?.data.filter((item) => {
          return 'catalog_id' in item
        })
        setOrderItems(filteredArray)
      }
    } catch (err) {
      setError('Failed to fetch order items.') // Set error state
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const { orderId } = router.query
      if (orderId != undefined) {
        fetchOrder(orderId as string)
        fetchOrderItems(orderId as string)
      }
      // Fetch order details using orderId
    }
  }, [router.isReady, router.query])

  const handleBack = () => {
    router.back()
  }

  return (
    <DynamicAccountLayoutPage>
      <VStack spacing={4} align="stretch" m={4}>
        {/* order id */}
        <Text
          fontWeight="bold"
          onClick={handleBack}
          style={{ cursor: 'pointer', marginBottom: '16px' }}
        >
          <ChevronLeftIcon />
          {` Back To My Orders`}
        </Text>
        <Heading
          as="h1"
          size="lg"
          my={6}
          fontWeight="bold"
          display="flex"
          gap={3}
        >
          <Text>Order</Text>
          <Text>#{order?.cymax_order_id ?? order?.id}</Text>
        </Heading>

        {/* order date */}
        <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 0, md: 1 }} mt={5}>
          <GridItem colSpan={{ base: 12, md: 3, lg: 2 }}>Order Date:</GridItem>
          <GridItem
            colSpan={{ base: 12, md: 8, lg: 9 }}
            mb={{ base: 2, md: 0 }}
          >
            <Text fontWeight="normal">
              {order?.meta?.timestamps?.created_at
                ? new Date(order?.meta?.timestamps?.created_at).toLocaleString(
                    'en-US',
                    {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    }
                  )
                : ''}
            </Text>
          </GridItem>
        </Grid>

        {/* order item with image */}
        {orderItems?.map((item) => (
          <Box key={item.id} display="flex" alignItems="center">
            {/* Column 2 */}
            <Box flex="2" p={4} bg="lightgray.600" marginRight={10}>
              <img
                src={item?.custom_inputs?.main_image?.url}
                alt="Product Image"
                style={{ maxWidth: '100%' }}
              />
            </Box>

            {/* Column 10 */}
            <Box flex="10" p={4}>
              <Text fontSize="xs" fontWeight="" color="gray.500">
                ITEM #{item?.sku}
              </Text>
              <Text fontSize=""> {item?.name} </Text>
              <Text fontSize="" color="gray.500">
                Unit Price:{' '}
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(
                  parseFloat((item?.unit_price?.amount ?? 0 / 100).toFixed(2))
                )}
              </Text>
              <Text fontSize="" color="gray.500">
                Quantity: {item?.quantity}
              </Text>
            </Box>
          </Box>
        ))}

        {/* border bottom */}
        <Box borderBottom="1px solid #e2e8f0" pb={4}></Box>

        {/* 2nd section     */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(12, 1fr)' }} gap={4}>
          {/* Column 1 (col-4) */}
          <Box gridColumn={{ base: 'auto', md: 'span 4' }}>
            <Heading
              as="h2"
              size="md"
              my={6}
              fontWeight="bold"
              display="flex"
              gap={3}
            >
              Total
            </Heading>
          </Box>

          {/* Column 2 (col-8) */}
          <Box
            gridColumn={{ base: 'auto', md: 'span 8' }}
            marginTop={{ base: 4, md: 4 }}
          >
            {/* Your content for the second column goes here */}
            <VStack align="start">
              <Flex justifyContent="space-between" width="35%">
                <Text>Subtotal: </Text>
                <Text>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(
                    parseFloat(
                      (
                        order?.meta?.display_price?.without_discount?.amount ??
                        0 / 100
                      ).toFixed(2)
                    )
                  )}
                </Text>
              </Flex>

              <Flex justifyContent="space-between" width="35%">
                <Text>Shipping: </Text>
                <Text>{shippingPrice}</Text>
              </Flex>

              <Flex justifyContent="space-between" width="35%">
                <Text>Tax: </Text>
                <Text>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(
                    parseFloat(
                      (
                        order?.meta?.display_price.tax?.amount ?? 0 / 100
                      ).toFixed(2)
                    )
                  )}
                </Text>
              </Flex>

              <Flex justifyContent="space-between" width="35%">
                <Text>Discount: </Text>
                <Text>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(
                    parseFloat(
                      (
                        order?.meta.display_price.discount?.amount ?? 0 / 100
                      ).toFixed(2)
                    )
                  )}
                </Text>
              </Flex>

              <Flex
                fontWeight="bold"
                justifyContent="space-between"
                width="35%"
              >
                <Text>Total: </Text>
                <Text>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(
                    parseFloat(
                      (
                        order?.meta?.display_price.with_tax?.amount ?? 0 / 100
                      ).toFixed(2)
                    )
                  )}
                </Text>
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
              as="h2"
              size="md"
              my={6}
              fontWeight="bold"
              display="flex"
              gap={3}
            >
              Delivery
            </Heading>
          </Box>

          {/* Column 2 (col-4) */}
          <Box
            gridColumn={{ base: 'span 4', md: 'span 4' }}
            marginTop={{ base: 4, md: 4 }}
            marginBottom={{ base: 4, md: 5 }}
          >
            {/* Content for the second column goes here */}
            <VStack align="start">
              <Heading as="h4" size="" fontWeight="bold" display="flex">
                <Text> Shipping Address </Text>
              </Heading>

              <Flex justifyContent="space-between">
                <Text>
                  {order?.shipping_address?.first_name}{' '}
                  {order?.shipping_address?.last_name}
                </Text>
              </Flex>

              <Flex justifyContent="space-between">
                <Text>
                  {' '}
                  {`${order?.shipping_address.line_1} ${order?.shipping_address.line_2}`}{' '}
                </Text>
              </Flex>

              <Flex justifyContent="space-between">
                <Text>
                  {' '}
                  {`${order?.shipping_address.city}, ${order?.shipping_address.country} ${order?.shipping_address.postcode}`}{' '}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>
                  {' '}
                  Phone: {`${order?.shipping_address.phone_number}`}{' '}
                </Text>
              </Flex>
            </VStack>
          </Box>

          {/* Column 3 (col-4) */}
          <Box
            gridColumn={{ base: 'span 4', md: 'span 4' }}
            marginTop={{ base: 4, md: 4 }}
          >
            <VStack align="start">
              <Heading as="h4" size="" fontWeight="bold" display="flex">
                <Text>Billing Address</Text>
              </Heading>

              <Flex justifyContent="space-between">
                <Text>
                  {order?.billing_address?.first_name}{' '}
                  {order?.billing_address?.last_name}
                </Text>
              </Flex>

              <Flex justifyContent="space-between">
                {order?.billing_address?.line_1}
              </Flex>

              <Flex justifyContent="space-between">
                {order?.billing_address?.city},{' '}
                {order?.billing_address?.postcode}
              </Flex>
              <Flex justifyContent="space-between">
                Phone: {order?.billing_address?.phone_number}
              </Flex>
            </VStack>
          </Box>
        </Grid>
      </VStack>
    </DynamicAccountLayoutPage>
  )
}

export default OrderDetailsPage
