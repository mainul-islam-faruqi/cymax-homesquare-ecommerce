import { EpCartItemInterface } from '@modules/ep'
import { EpFlowFieldsInterface } from '@myplanetdigital/elasticpath'

export interface CartItemProps {
  cartItem: EpCartItemInterface
  onChangeQuantity?: (quantity: number) => void
  isLoading?: boolean
  flow?: EpFlowFieldsInterface
  index: number
}
