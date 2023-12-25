import { Box, useBreakpointValue, useTheme } from '@chakra-ui/react'
import { Grid } from '@modules/components/Grid'
import { GridHeader } from './GridHeader'
import { renderGridComponent } from './renderGridComponent'
import { ComposableContentGridProps } from './types'

export const ComposableContentGrid = (props: ComposableContentGridProps) => {
  const { columns, title } = props
  const { space } = useTheme()
  const isMobile = useBreakpointValue({ base: true, md: false })

  if (!columns?.length) {
    return null
  }

  return (
    <Box
      maxW="container.max"
      margin="0 auto"
      my={{ base: 'mobile', md: 'desktop' }}
      px={{ base: 'mobile', md: 'desktop' }}
    >
      {!!title && <GridHeader {...props} />}
      <Grid
        gap={isMobile ? space.mobile : space.desktop}
        render={renderGridComponent}
        {...props}
      />
    </Box>
  )
}
