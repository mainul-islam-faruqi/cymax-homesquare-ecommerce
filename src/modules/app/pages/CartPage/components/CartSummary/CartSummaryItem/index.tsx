import { Flex, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface CartSummaryItemProps {
  label: string
  value?: string
  children?: ReactNode
}

export const CartSummaryItem = (props: CartSummaryItemProps) => {
  const { label, value, children } = props
  return (
    <Flex
      justify="space-between"
      fontWeight="bold"
      fontSize={{ base: 'mobile.bodySM', md: 'desktop.bodySM' }}
    >
      <Text>{label}</Text>
      {value ? <Text>{value}</Text> : children}
    </Flex>
  )
}
