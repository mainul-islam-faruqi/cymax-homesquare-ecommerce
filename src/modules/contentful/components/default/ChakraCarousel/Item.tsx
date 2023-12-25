import { Flex } from '@chakra-ui/react'
import { ReactElement, useState } from 'react'

export interface ItemProps {
  setTrackIsActive: (value: React.SetStateAction<boolean>) => void
  setActiveItem: (prev: React.SetStateAction<number>) => void
  activeItem: number
  constraint: number
  itemWidth: number
  positions: number[]
  children: ReactElement | ReactElement[]
  index: number
  gap: number
}

export const Item = ({
  setTrackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  index,
  gap,
}: ItemProps) => {
  const [userDidTab, setUserDidTab] = useState(false)

  const handleFocus = () => setTrackIsActive(true)

  const handleBlur = () => {
    userDidTab && index + 1 === positions.length && setTrackIsActive(false)
    setUserDidTab(false)
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) =>
    event.key === 'Tab' &&
    !(activeItem === positions.length - constraint) &&
    setActiveItem(index)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) =>
    event.key === 'Tab' && setUserDidTab(true)

  return (
    <Flex
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      w={`${itemWidth}px`}
      _notLast={{
        mr: `${gap}px`,
      }}
      py="4px"
    >
      {children}
    </Flex>
  )
}
