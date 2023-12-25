/* eslint-disable react/display-name */
import { Box, Tooltip } from '@chakra-ui/react'
import { forwardRef, LegacyRef } from 'react'
import { PickerSelector } from './PickerSelector'
import { ColorPickerOptionProps } from './types'

export const PickerWrapper = forwardRef(
  (props: ColorPickerOptionProps, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <>
        {props.isImage ? (
          // to be implemented in the future the tooltip
          // <Tooltip label={props.value}>
          // </Tooltip>
          <Box ref={ref}>
            <PickerSelector {...props} />
          </Box>
        ) : (
          <Box ref={ref}>
            <PickerSelector {...props} />
          </Box>
        )}
      </>
    )
  }
)
