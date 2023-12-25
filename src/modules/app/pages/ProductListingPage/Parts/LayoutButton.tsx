import { IconButton } from '@chakra-ui/react'
import { GridLayoutOption } from '../../../../algolia'
import { useGridLayout } from '../../../components'

export const LayoutButton = ({
  layout,
  icon,
}: {
  layout: GridLayoutOption
  icon: JSX.Element
}) => {
  const { currentLayout, changeLayout, showLayoutControl } = useGridLayout()
  return (
    <IconButton
      display={showLayoutControl(layout) ? 'flex' : 'none'}
      aria-label={layout}
      fontSize="xl"
      icon={icon}
      onClick={() => changeLayout(layout)}
      opacity={currentLayout === layout ? 1 : 0.4}
      mx={1}
      color="blackAlpha.900"
      variant="ghost"
      backgroundColor={'white'}
    />
  )
}
