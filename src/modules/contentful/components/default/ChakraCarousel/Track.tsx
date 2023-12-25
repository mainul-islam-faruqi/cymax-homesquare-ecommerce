import { Flex, VStack } from '@chakra-ui/react'
import { useState, useRef, useCallback, useEffect, ReactElement } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'

const MotionFlex = motion(Flex)

const transitionProps = {
  stiffness: 400,
  type: 'spring',
  damping: 60,
  mass: 3
}

export interface TrackProps {
  setTrackIsActive: (value: React.SetStateAction<boolean>) => void
  trackIsActive: boolean
  setActiveItem: (prev: React.SetStateAction<number>) => void
  activeItem: number
  constraint: number
  multiplier: number
  itemWidth: number
  positions: number[]
  children: ReactElement | ReactElement[]
}

export const Track = ({
  setTrackIsActive,
  trackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  multiplier,
  itemWidth,
  positions,
  children
}: TrackProps) => {
  const [dragStartPosition, setDragStartPosition] = useState(0)
  const controls = useAnimation()
  const motionValue = useMotionValue(0)
  const node: any = useRef(null)

  const handleDragStart = () => setDragStartPosition(positions[activeItem])

  const handleDragEnd = (_: any, info: any) => {
    const distance = info.offset.x
    const velocity = info.velocity.x * multiplier
    const direction = velocity < 0 || distance < 0 ? 1 : -1

    const extrapolatedPosition =
      dragStartPosition +
      (direction === 1
        ? Math.min(velocity, distance)
        : Math.max(velocity, distance))

    const closestPosition = positions.reduce((prev: number, curr: number) => {
      return Math.abs(curr - extrapolatedPosition) <
        Math.abs(prev - extrapolatedPosition)
        ? curr
        : prev
    }, 0)

    if (!(closestPosition < positions[positions.length - constraint])) {
      setActiveItem(positions.indexOf(closestPosition))
      controls.start({
        x: closestPosition,
        transition: {
          velocity: info.velocity.x,
          ...transitionProps
        }
      })
    } else {
      setActiveItem(positions.length - constraint)
      controls.start({
        x: positions[positions.length - constraint],
        transition: {
          velocity: info.velocity.x,
          ...transitionProps
        }
      })
    }
  }

  const handleResize = useCallback(
    () =>
      controls.start({
        x: positions[activeItem],
        transition: {
          ...transitionProps
        }
      }),
    [activeItem, controls, positions]
  )

  const handleClick = useCallback(
    (event: KeyboardEvent | MouseEvent) =>
      node?.current?.contains(event.target)
        ? setTrackIsActive(true)
        : setTrackIsActive(false),
    [setTrackIsActive]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      if (trackIsActive) {
        if (activeItem < positions.length - constraint) {
          if ((event as KeyboardEvent).key === 'ArrowRight' || (event as KeyboardEvent).key === 'ArrowUp') {
            event.preventDefault()
            setActiveItem((prev: number) => prev + 1)
          }
        }
        if (activeItem > positions.length - positions.length) {
          if ((event as KeyboardEvent).key === 'ArrowLeft' || (event as KeyboardEvent).key === 'ArrowDown') {
            event.preventDefault()
            setActiveItem((prev: number) => prev - 1)
          }
        }
      }
    },
    [trackIsActive, setActiveItem, activeItem, constraint, positions.length]
  )

  useEffect(() => {
    handleResize()

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [handleClick, handleResize, handleKeyDown, positions])

  return (
    <>
      {itemWidth && (
        <VStack ref={node} spacing={5} alignItems='stretch'>
          <MotionFlex
            dragConstraints={node}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ x: motionValue }}
            drag='x'
            _active={{ cursor: 'grabbing' }}
            minWidth='min-content'
            flexWrap='nowrap'
            cursor='grab'
          >
            {children}
          </MotionFlex>
        </VStack>
      )}
    </>
  )
}
