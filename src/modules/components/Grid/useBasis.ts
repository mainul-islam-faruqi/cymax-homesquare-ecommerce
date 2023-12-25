import { GridColumns } from '@modules/contentful/utils/types'

type ColumnWidth =
  | '1'
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '4/5'
  | '1/6'

const widthMap: Record<ColumnWidth, number> = {
  '1': 1,
  '1/2': 1 / 2,
  '1/3': 33.78 / 100,
  '2/3': 2 / 3,
  '1/4': 25.347 / 100,
  '3/4': 3 / 4,
  '1/5': 1 / 5,
  '2/5': 2 / 5,
  '3/5': 3 / 5,
  '4/5': 4 / 5,
  '1/6': 1 / 6,
}

const compensateGapValue: Record<string, number> = {
  '2 Columns': 20,
  '3 Columns': 33,
  '4 Columns': 35,
}

const COLUMN_WIDTH_MAP = Object.freeze({
  '2 Columns': ['1', '1/2'],
  '3 Columns': ['1/2', '1/3'],
  '4 Columns': ['1/2', '1/4'],
})

type BasisProps = {
  style: GridColumns
  isMobile: boolean
  gap?: string
  hasTwoColumnsOnMobile?: boolean
}

export const useBasis = ({ style, isMobile, gap }: BasisProps) => {
  const handleBasis = ({ style, isMobile, gap }: BasisProps) => {
    const column = COLUMN_WIDTH_MAP[style] ?? ['1', '1']
    const gapValue = compensateGapValue[style] ?? 10
    const mobileKey = column[isMobile ? 0 : 1] as ColumnWidth
    const columnWidthValue = widthMap[mobileKey] ?? 1
    const newGap: number = Number(gap?.slice(0, 2)) / 2
    return `calc(${columnWidthValue * 100}% - ${
      isMobile ? newGap : gapValue
    }px)`
  }

  const basis = handleBasis({ style, isMobile, gap })
  return basis
}
