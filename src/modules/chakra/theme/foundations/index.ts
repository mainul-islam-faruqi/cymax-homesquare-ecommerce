import { spacing } from './spacing'
import borders from './borders'
import borderStyles from './borderStyles'
import breakpoints from './breakpoints'
import colors from './colors'
import radii from './radius'
import shadows from './shadows' // elevation
import sizes from './sizes'
import typography from './typography'

const foundations = {
  ...typography,
  borders,
  borderStyles,
  breakpoints,
  colors,
  radii,
  shadows,
  sizes,
  space: spacing,
}

type FoundationsType = typeof foundations

export interface Foundations extends FoundationsType {}

export default foundations
