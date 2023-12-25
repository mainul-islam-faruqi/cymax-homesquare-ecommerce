import { useUser } from '@myplanetdigital/elasticpath'
import split from 'lodash/split'

export interface CustomerName {
  firstName: string
  lastName: string
}

export const useCustomerName = (): CustomerName => {
  const { customer } = useUser()
  const [firstName, lastName] = split(customer?.name, / (.*)/)

  return {
    firstName,
    lastName,
  }
}
