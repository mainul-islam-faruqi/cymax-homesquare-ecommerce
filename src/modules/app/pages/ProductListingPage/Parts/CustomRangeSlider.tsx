import {
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react'
import { PRICE_FILTER } from '@modules/algolia'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRange } from 'react-instantsearch-hooks-web'

export const CustomRangeSlider = () => {
  const [values, setValues] = useState<number[]>([])
  const [defaultValues, setDefaultValues] = useState<number[]>([])

  const didMountRef = useRef(false)
  const { range, refine, start } = useRange({
    attribute: PRICE_FILTER,
  })

  const onChange = (values: number[]) => {
    // Don't let maximum value be equal to minimum value to avoid non results.
    values[1] = values[1] == values[0] ? values[0] + 1 : values[1]
    setValues([values[0], values[1]])
  }

  const onChangeEnd = (values: number[]) => {
    refine([
      Number.isFinite(values[0]) ? values[0] : undefined,
      Number.isFinite(values[1]) ? values[1] : undefined,
    ])
  }

  const handleValues = useCallback(() => {
    onChange([range.min as number, range.max as number])
    setDefaultValues([range.min as number, range.max as number])
  }, [range.max, range.min])

  useEffect(() => {
    if (range.max) {
      handleValues()
    }
  }, [range.max, range.min, handleValues])

  useEffect(() => {
    if (didMountRef.current) {
      if (!isFinite(start[0] as number) && !isFinite(start[1] as number)) {
        return handleValues()
      } else if (!isFinite(start[0] as number)) {
        setValues([range.min || 0, values[1]])
      } else if (!isFinite(start[1] as number)) {
        setValues([values[0], range.max as number])
      }
    }
    didMountRef.current = true
  }, [start, handleValues])

  return (
    <>
      <Flex
        justify="space-between"
        data-insights-filter={PRICE_FILTER + ':' + values[0] + ':' + values[1]}
      >
        <Text>${values[0]}</Text>
        <Text>${values[1]}</Text>
      </Flex>
      {defaultValues?.length > 0 && (
        <RangeSlider
          aria-label={['min', 'max']}
          width="95%"
          min={defaultValues[0]}
          max={defaultValues[1]}
          value={values}
          defaultValue={defaultValues}
          onChange={onChange}
          onChangeEnd={onChangeEnd}
        >
          <RangeSliderTrack bg="shading.200">
            <RangeSliderFilledTrack bg="primary.500" />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} bgColor="primary.500" outlineOffset={0} />
          <RangeSliderThumb index={1} bgColor="primary.500" outlineOffset={0} />
        </RangeSlider>
      )}
    </>
  )
}
