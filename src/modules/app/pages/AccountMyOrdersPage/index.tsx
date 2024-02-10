import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { Pagination } from '@modules/app/components'
import { Order } from '@modules/checkout/components/OrderConfirmation/types'
import { getAllOrders } from '@modules/server/EP/getAllOrders'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AccountLayoutPageProps } from '../AccountLayoutPage/types'

const DynamicAccountLayoutPage = dynamic<AccountLayoutPageProps>(
  () => import('../AccountLayoutPage').then((mod) => mod.AccountLayoutPage),
  { ssr: false }
)

export const AccountMyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]) // Type the state with Order array
  const [ordersFormatted, setOrdersFormated] = useState(orders)
  const limit: number = 10
  const toast = useToast()
  const [error, setError] = useState<string | null>(null) // Add state for error
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const router = useRouter()

  const fetchOrders = async (offset: number, limit: number = 10) => {
    try {
      const response = await getAllOrders(offset, limit)
      setTotalPages(response?.data?.meta?.page?.total || 1) // Calculate the total number of pages
      // Set new orders if not appending
      setOrders(response?.data?.data ?? [])
    } catch (err) {
      setError('Failed to fetch orders.') // Set error state
    }
  }

  // const viewOrder = (orderId: string) => {
  //   console.log(`/account/my-orders/${orderId}`)
  //   router.push(`/account/my-orders/${orderId}`)
  // }
  // Initial load of orders
  useEffect(() => {
    const offset = (currentPage - 1) * limit
    fetchOrders(offset, limit)
  }, [currentPage, limit])

  // Toast for error messages
  useEffect(() => {
    if (orders?.length > 0) {
      const ordersWithItemQty = orders.map((order) => {
        return {
          ...order,
          quantity: order?.relationships?.items?.data?.length,
        }
      })
      setOrdersFormated(ordersWithItemQty)
    }

    if (error) {
      toast({
        title: 'An error occurred.',
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [error, toast, orders])

  return (
    <DynamicAccountLayoutPage>
      <VStack spacing={4} align="stretch" m={4}>
        <Heading as="h1" size="lg" my={6} fontWeight="normal">
          My Orders
        </Heading>
        {ordersFormatted.map((order) => (
          <Box
            key={order.id}
            p={{ base: 6, md: 5 }}
            shadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            bg="white"
            position="relative"
          >
            <Flex direction={{ base: 'column-reverse', lg: 'row' }}>
              <Box>
                <Heading as="h5" size="sm">
                  {!order?.cymax_order_id
                    ? 'Order Processing'
                    : 'Order ' + order?.cymax_order_id}
                </Heading>
              </Box>
            </Flex>
            <Box>
              <Grid
                templateColumns="repeat(12, 1fr)"
                gap={{ base: 0, md: 1 }}
                mt={5}
              >
                <GridItem colSpan={{ base: 12, md: 4, lg: 3 }}>
                  Order Date:
                </GridItem>
                <GridItem
                  colSpan={{ base: 12, md: 8, lg: 9 }}
                  mb={{ base: 2, md: 0 }}
                >
                  <Text fontWeight="bold">
                    {new Date(
                      order?.meta.timestamps.created_at
                    ).toLocaleDateString()}
                  </Text>
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 4, lg: 3 }}>
                  Ship to:
                </GridItem>
                <GridItem
                  colSpan={{ base: 12, md: 8, lg: 9 }}
                  mb={{ base: 2, md: 0 }}
                >
                  <VStack align="stretch" spacing={0}>
                    <Text fontWeight="bold">
                      {order.shipping_address.first_name}{' '}
                      {order.shipping_address.last_name},{' '}
                      {order.shipping_address.line_1}
                    </Text>
                    <Text fontWeight="bold">
                      {order.shipping_address.city},{' '}
                      {order.shipping_address.country}{' '}
                      {order.shipping_address.postcode}
                    </Text>
                  </VStack>
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 4, lg: 3 }}>
                  Number of items:
                </GridItem>
                <GridItem
                  mb={{ base: 2, md: 0 }}
                  colSpan={{ base: 12, md: 8, lg: 9 }}
                >
                  <Text fontWeight="bold">{order?.quantity}</Text>
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 4, lg: 3 }}>
                  Order total:
                </GridItem>
                <GridItem
                  mb={{ base: 2, md: 0 }}
                  colSpan={{ base: 12, md: 8, lg: 5 }}
                >
                  <Text as="b">
                    ${order?.meta?.display_price?.with_tax?.formatted}
                  </Text>
                </GridItem>
                <GridItem
                  colSpan={{ base: 12, md: 12, lg: 4 }}
                  textAlign="right"
                >
                  <Link href={`/account/my-orders/details/${1234}`} passHref>
                    <Button
                      as="a"
                      // onClick={() => viewOrder(order?.id)}
                      mt={{ base: 8, md: 8, lg: 0 }}
                      width={'100%'}
                      p={5}
                      bg="theme.background"
                      color="primary.500"
                      fontSize={14}
                      borderWidth={'2px'}
                    >
                      View Full Order
                    </Button>
                  </Link>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        ))}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages || 1}
            onPageChange={setCurrentPage}
          />
        )}
      </VStack>
    </DynamicAccountLayoutPage>
  )
}
