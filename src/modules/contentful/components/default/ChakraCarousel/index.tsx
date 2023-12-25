import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useMediaQuery, useTheme } from '@chakra-ui/react'
import { Item } from './Item'
import { Slider } from './Slider'
import { Track } from './Track'

interface ChakraCarouselProps {
  children: ReactElement[]
  gap: number
  renderAsBanner?: boolean
}

export const ChakraCarousel = ({
  children,
  gap,
  renderAsBanner,
}: ChakraCarouselProps) => {
  const [trackIsActive, setTrackIsActive] = useState(false)
  const [multiplier, setMultiplier] = useState(0.35)
  const [sliderWidth, setSliderWidth] = useState(0)
  const [activeItem, setActiveItem] = useState(0)
  const [constraint, setConstraint] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)

  const initSliderWidth = useCallback(
    (width: React.SetStateAction<number>) => setSliderWidth(width),
    []
  )

  const positions = useMemo(
    () =>
      children.map(
        (_: any, index: number) => -Math.abs((itemWidth + gap) * index)
      ),
    [children, itemWidth, gap]
  )

  const { breakpoints } = useTheme()

  const [isBetweenBaseAndMd] = useMediaQuery(
    `(min-width: ${breakpoints.base}) and (max-width: ${breakpoints.md})`
  )

  const [isBetweenMdAndLg] = useMediaQuery(
    `(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`
  )

  const [isBetweenLgAndXl] = useMediaQuery(
    `(min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl})`
  )

  const [isGreaterThanXL] = useMediaQuery(`(min-width: ${breakpoints.xl})`)

  useEffect(() => {
    let numItems = 1
    if (isBetweenBaseAndMd) {
      setItemWidth(sliderWidth - gap)
      setMultiplier(1 / numItems)
      setConstraint(numItems)
    }
    if (isBetweenMdAndLg) {
      numItems = renderAsBanner ? 1 : 2
      setItemWidth(sliderWidth / numItems - gap)
      setMultiplier(1 / numItems)
      setConstraint(numItems)
    }
    if (isBetweenLgAndXl) {
      numItems = renderAsBanner ? 1 : 3
      setItemWidth(sliderWidth / numItems - gap)
      setMultiplier(1 / numItems)
      setConstraint(numItems)
    }
    if (isGreaterThanXL) {
      numItems = renderAsBanner ? 1 : 4
      setItemWidth(sliderWidth / numItems - gap)
      setMultiplier(1 / numItems)
      setConstraint(numItems)
    }
  }, [
    isBetweenBaseAndMd,
    isBetweenMdAndLg,
    isBetweenLgAndXl,
    isGreaterThanXL,
    sliderWidth,
    gap,
  ])

  const sliderProps = {
    setTrackIsActive,
    initSliderWidth,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    gap,
    shouldScrollInfinite: renderAsBanner,
  }

  const trackProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    sliderWidth,
    activeItem,
    constraint,
    multiplier,
    itemWidth,
    positions,
  }

  const itemProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    gap,
  }

  if (children?.length <= 0) {
    return null
  }

  return (
    <Slider {...sliderProps}>
      <Track {...trackProps}>
        {
          React.Children.toArray(
            (children || [])?.map(
              (child: React.ReactElement, index: number) => (
                // eslint-disable-next-line react/jsx-key
                <Item {...itemProps} index={index}>
                  {child}
                </Item>
              )
            )
          ) as ReactElement[]
        }
      </Track>
    </Slider>
  )
}
