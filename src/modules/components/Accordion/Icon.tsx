import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { IconProps } from './types'

export const AccordionIcon = ({ isExpanded }: IconProps) => {
  return (
    <> {isExpanded ? <MinusIcon fontSize="xs" /> : <AddIcon fontSize="xs" />}</>
  )
}
