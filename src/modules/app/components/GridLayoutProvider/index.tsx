import { useBreakpointValue } from '@chakra-ui/react'
import { BaseBreakpointConfig, Breakpoints } from '@chakra-ui/theme-tools'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { GridLayoutOption } from '../../../algolia'

type ChakraBreakpoint = keyof Breakpoints<BaseBreakpointConfig>

const DEFAULT_ITEMS_PER_ROW: Record<
  GridLayoutOption,
  Record<ChakraBreakpoint, number>
> = {
  single: { base: 1, sm: 2 },
  comfortable: { base: 2 },
  standard: { base: 2, sm: 3 },
  condensed: { base: 2, sm: 3, lg: 4 },
}

const DEFAULT_HITS_PER_PAGE: Record<GridLayoutOption, number> = {
  single: 24,
  comfortable: 24,
  standard: 24,
  condensed: 24,
}

const DEFAULT_SHOW_CONTROL_BREAKPOINTS: Record<
  ChakraBreakpoint,
  GridLayoutOption[]
> = {
  base: ['single', 'comfortable'],
  sm: ['comfortable', 'standard'],
  lg: ['comfortable', 'standard', 'condensed'],
}

export interface GridLayoutInterface {
  currentLayout: string
  changeLayout: Dispatch<SetStateAction<GridLayoutOption>>
  gridTemplateColumns: Record<ChakraBreakpoint, string>
  hitsPerPage: number
  showLayoutControl: (layout: GridLayoutOption) => boolean
}

const GridLayoutContext = createContext<GridLayoutInterface | undefined>(
  undefined
)

export type GridLayoutProviderProps = {
  children: JSX.Element | JSX.Element[]
  itemsPerRow?: Record<GridLayoutOption, Record<ChakraBreakpoint, number>>
  algoliaHitsPerPage?: Record<GridLayoutOption, number>
  showControlBreakpoints?: Record<ChakraBreakpoint, GridLayoutOption[]>
}

export const GridLayoutProvider = ({
  children,
  itemsPerRow = DEFAULT_ITEMS_PER_ROW,
  algoliaHitsPerPage = DEFAULT_HITS_PER_PAGE,
  showControlBreakpoints = DEFAULT_SHOW_CONTROL_BREAKPOINTS,
}: GridLayoutProviderProps) => {
  const [currentLayout, setCurrentLayout] =
    useState<GridLayoutOption>('condensed')
  const allowedLayouts = useBreakpointValue<GridLayoutOption[]>(
    showControlBreakpoints,
    'lg'
  )

  useEffect(() => {
    if (allowedLayouts && !allowedLayouts.includes(currentLayout)) {
      setCurrentLayout(allowedLayouts[allowedLayouts.length - 1])
    }
  }, [allowedLayouts])

  const shouldDisplayControl = (layout: GridLayoutOption) => {
    return allowedLayouts?.includes(layout) || false
  }

  const gridTemplateColumns = useMemo(
    () =>
      Object.entries(itemsPerRow[currentLayout]).reduce<
        Record<ChakraBreakpoint, string>
      >((acc, [breakpoint, columns]) => {
        acc[breakpoint] = `repeat(${columns}, minmax(0, 1fr))`
        return acc
      }, {}),
    [currentLayout]
  )

  const hitsPerPage = useMemo(
    () => algoliaHitsPerPage[currentLayout],
    [currentLayout]
  )
  return (
    <GridLayoutContext.Provider
      value={{
        currentLayout,
        changeLayout: setCurrentLayout,
        gridTemplateColumns,
        hitsPerPage,
        showLayoutControl: shouldDisplayControl,
      }}
    >
      {children}
    </GridLayoutContext.Provider>
  )
}

export const useGridLayout = () => {
  const context = useContext(GridLayoutContext)
  if (context === undefined) {
    throw new Error('useGridLayout must be used within a GridLayoutProvider')
  }
  return context
}
