import { Flex, Text } from '@chakra-ui/react'

import { ReactNode } from 'react'

interface OrderSummaryItemProps {
  label: string
  value?: string
  children?: ReactNode
}

export const OrderSummaryItem = ({
  label,
  value,
  children,
}: OrderSummaryItemProps) => {
  return (
    <Flex
      justify="space-between"
      fontSize="sm"
      color="shading.900"
      fontWeight="bold"
    >
      <Text>{label}</Text>
      {value ? <Text>{value}</Text> : children}
    </Flex>
  )
}
