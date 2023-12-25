import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { getFlexAlignment } from '@modules/app/utils'
import { FlexDirection } from '@modules/contentful/utils'
import React from 'react'
import { GridProps } from './types'
import { useBasis } from './useBasis'

export const Grid: React.FC<GridProps> = ({
  alignment,
  cardBackgroundColor,
  columns,
  gap,
  name,
  render,
  style,
  ...props
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const hasTwoColumnsOnMobile = isMobile && style === '2 Columns'
  const basis = useBasis({
    style,
    isMobile: !!isMobile,
    gap,
    hasTwoColumnsOnMobile,
  })
  const justify = hasTwoColumnsOnMobile ? 'center' : getFlexAlignment(alignment)
  const direction = hasTwoColumnsOnMobile
    ? FlexDirection.column
    : FlexDirection.row

  return (
    <Flex
      aria-label={`${name} Grid`}
      gap={gap}
      width="100%"
      justifyContent={justify}
      wrap="wrap"
      flexDirection={direction}
      {...props}
    >
      {React.Children.toArray(
        columns?.map((column) => (
          // eslint-disable-next-line react/jsx-key
          <Flex basis={basis}>
            {render({ cardBackgroundColor, ...column })}
          </Flex>
        ))
      )}
    </Flex>
  )
}
