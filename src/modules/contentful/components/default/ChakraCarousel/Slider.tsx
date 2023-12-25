import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Progress } from '@chakra-ui/react'
import { ReactElement, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useBoundingRect } from './hooks'
import { percentage } from './utils'

export interface SliderProps {
  setTrackIsActive: (value: React.SetStateAction<boolean>) => void
  initSliderWidth: (width: React.SetStateAction<number>) => void
  setActiveItem: (prev: React.SetStateAction<number>) => void
  activeItem: number
  constraint: number
  itemWidth: number
  positions: number[]
  children: ReactElement | ReactElement[]
  gap: number
  shouldScrollInfinite?: boolean
}

export const Slider = ({
  setTrackIsActive,
  initSliderWidth,
  setActiveItem,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  gap,
  shouldScrollInfinite,
}: SliderProps) => {
  const intl = useIntl()
  const [ref, dimensions] = useBoundingRect()
  const interval = useRef<any>(null)

  useEffect(
    () => initSliderWidth(Math.round(dimensions?.width)),
    [dimensions?.width, initSliderWidth]
  )

  const handleFocus = () => setTrackIsActive(true)

  const handleDecrementClick = () => {
    setTrackIsActive(true)
    !(activeItem === positions.length - positions.length) &&
      setActiveItem((prev: number) => prev - 1)
  }

  const handleIncrementClick = () => {
    setTrackIsActive(true)

    if (
      shouldScrollInfinite ||
      !(activeItem === positions.length - constraint)
    ) {
      setActiveItem((prev: number) => {
        if (prev >= positions.length - 1) return 0
        return prev + 1
      })
    }
  }

  useEffect(() => {
    if (shouldScrollInfinite && interval) {
      interval.current = setInterval(() => {
        handleIncrementClick()
      }, 5000)
    }

    return () => {
      clearInterval(interval?.current)
    }
  }, [shouldScrollInfinite, interval])

  return (
    <>
      <Box
        ref={ref}
        w={{ base: '100%', md: `calc(100% + ${gap}px)` }}
        ml={{ base: 0, md: `-${gap / 2}px` }}
        px={`${gap / 2}px`}
        position="relative"
        overflow="hidden"
        _before={{
          bgGradient: 'linear(to-r, base.d400, transparent)',
          position: 'absolute',
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: '100%',
          left: 0,
          top: 0,
        }}
        _after={{
          bgGradient: 'linear(to-l, base.d400, transparent)',
          position: 'absolute',
          w: `${gap / 2}px`,
          content: "''",
          zIndex: 1,
          h: '100%',
          right: 0,
          top: 0,
        }}
      >
        {children}
      </Box>

      <Flex w={{ base: '319px', md: '518.66px' }} mt={`${gap / 2}px`} mx="auto">
        <Button
          onClick={handleDecrementClick}
          onFocus={handleFocus}
          mr={`${gap / 3}px`}
          color="primary.500"
          variant="link"
          minW={0}
        >
          <ChevronLeftIcon
            boxSize={9}
            aria-label={intl.formatMessage({ id: 'ariaLabel.previous' })}
          />
        </Button>

        <Progress
          value={percentage(activeItem, positions.length - constraint)}
          alignSelf="center"
          borderRadius="2px"
          bg="shading.200"
          flex={1}
          h="3px"
          sx={{
            '> div': {
              backgroundColor: 'primary.500',
            },
          }}
          aria-label="progressbar"
        />

        <Button
          onClick={handleIncrementClick}
          onFocus={handleFocus}
          ml={`${gap / 3}px`}
          color="primary.500"
          variant="link"
          zIndex={2}
          minW={0}
        >
          <ChevronRightIcon
            boxSize={9}
            aria-label={intl.formatMessage({ id: 'ariaLabel.next' })}
          />
        </Button>
      </Flex>
    </>
  )
}
