import {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from './foundations/typography'

import borderStyles from './foundations/borderStyles'
import { palette, paletteTokens } from './foundations/colors'
import { spacing as space } from './foundations/spacing'

// For key/props ref: https://v0.chakra-ui.com/style-props
export const variants = {
  // token name needs to be exact match
  blockQuote: {
    fontFamily: fonts.body,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.relaxed,
    borderLeft: `${space.xxxs} ${borderStyles.normal} ${palette.primary[900]}`,
    marginLeft: space.sm,
    padding: `0 ${space.sm}`,
    color: palette.shading[600],
    fontSize: fontSizes.lg,
    fontStyle: 'italic',
  },
  body: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  caption: {
    display: 'block',
    fontSize: { base: fontSizes.xs, md: fontSizes.sm },
    lineHeight: { base: lineHeights.tight, md: lineHeights.normal },
  },
  h1: {
    fontFamily: fonts.heading,
    fontSize: { base: fontSizes.mobile.xxl, md: fontSizes.desktop.xxl },
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h2: {
    fontFamily: fonts.heading,
    fontSize: { base: fontSizes.mobile.xl, md: fontSizes.desktop.xl },
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h3: {
    fontFamily: fonts.heading,
    fontSize: { base: fontSizes.mobile.lg, md: fontSizes.desktop.lg },
    fontWeight: fontWeights.bold,
  },
  h4: {
    fontFamily: fonts.heading,
    fontSize: { base: fontSizes.mobile.md, md: fontSizes.desktop.md },
    fontWeight: fontWeights.bold,
  },
  h5: {
    fontFamily: fonts.heading,
    fontSize: { base: fontSizes.mobile.sm, md: fontSizes.desktop.sm },
    fontWeight: fontWeights.bold,
  },
  h6: {
    fontFamily: fonts.heading,
    fontSize: { base: fontSizes.mobile.xs, md: fontSizes.desktop.xs },
    fontWeight: fontWeights.normal,
  },
  headline: {
    fontFamily: fonts.heading,
    fontSize: { base: fontSizes.md, lg: fontSizes.lg },
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.relaxed,
  },
  p: {
    display: 'block',
    fontSize: { md: fontSizes.md },
  },
  subhead: {
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.relaxed,
  },
  tag: {
    height: space.md,
    backgroundColor: palette.warning[700],
    color: palette.shading[100],
    textTransform: 'uppercase',
    letterSpacing: letterSpacings.loose,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    top: space.sm,
    right: space.sm,
    padding: `${space.xxxs} ${space.xs}`,
    fontSize: fontSizes.xs,
  },
  textHighlight: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.relaxed,
    color: palette.primary[900],
    padding: space.md,
  },
}

export const sizes = {
  // token name needs to be exact match
  // XXL
  'xx-large': {
    fontSize: { base: '2.25rem', lg: '4.5rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  XXL: {
    fontSize: { base: '2.25rem', lg: '4.5rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  'Desktop/XXL': {
    fontSize: '4.5rem',
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  'Mobile/XXL': {
    fontSize: '2.25',
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  // XL
  'x-large': {
    fontSize: { base: '2rem', lg: '3.75rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  XL: {
    fontSize: { base: '2rem', lg: '3.75rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  'Desktop/XL': {
    fontSize: '3.75rem',
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  'Mobile/XL': {
    fontSize: '2rem',
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  // L
  large: {
    fontSize: { base: '1.5rem', lg: '2.75rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  L: {
    fontSize: { base: '1.5rem', lg: '2.75rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  'Desktop/L': {
    fontSize: '2.75rem',
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  'Mobile/L': {
    fontSize: '1.5rem',
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  // M
  medium: {
    fontSize: { base: '1.25rem', lg: '1.75rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  M: {
    fontSize: { base: '1.25rem', lg: '1.75rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  'Desktop/M': {
    fontSize: '1.75rem',
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  'Mobile/M': {
    fontSize: '1.25rem',
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  // S
  small: {
    fontSize: { base: '1rem', md: '1.5rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  S: {
    fontSize: { base: '1rem', md: '1.5rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  'Desktop/S': {
    fontSize: '1.5rem',
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  'Mobile/S': {
    fontSize: '1rem',
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
  },
  // XS
  'x-small': {
    fontSize: { base: '1rem', md: '1.25rem' },
    fontWeight: fontWeights.extrabold,
    lineHeight: '120%',
  },
  XS: {
    fontSize: { base: '1rem', md: '1.25rem' },
    fontWeight: fontWeights.extrabold,
    lineHeight: '120%',
  },
  'Desktop/XS': {
    fontSize: '1.25rem',
    fontWeight: fontWeights.extrabold,
    lineHeight: '120%',
  },
  'Mobile/XS': {
    fontSize: '1rem',
    fontWeight: fontWeights.extrabold,
    lineHeight: '120%',
  },
  // Desktop/Body-XL
  'body-x-large': {
    fontSize: { base: '1.25rem', lg: '1.5rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '150%',
  },
  'Body-XL': {
    fontSize: { base: '1.25rem', lg: '1.5rem' },
    fontWeight: fontWeights.bold,
    lineHeight: '150%',
  },
  'Desktop/Body-XL': {
    fontSize: '1.5rem',
    fontWeight: fontWeights.bold,
    lineHeight: '150%',
  },
  'Mobile/Body-XL': {
    fontSize: '1.25rem',
    fontWeight: fontWeights.bold,
    lineHeight: '150%',
  },
  // Body-L
  'body-large': {
    fontSize: { base: '1rem', lg: '1.25rem' },
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Body-L': {
    fontSize: { base: '1rem', lg: '1.25rem' },
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Desktop/Body-L': {
    fontSize: '1.25rem',
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Mobile/Body-L': {
    fontSize: '1rem',
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  // Body-Default
  'body-default': {
    fontSize: { base: '0.875rem', md: '1rem' },
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Body-Default': {
    fontSize: { base: '0.875rem', md: '1rem' },
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Desktop/Body-Default': {
    fontSize: '1rem',
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Mobile/Body-Default': {
    fontSize: '0.875rem',
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  // Body-S
  'body-small': {
    fontSize: { base: '0.75rem', md: '0.875rem' },
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Body-S': {
    fontSize: { base: '0.75rem', md: '0.875rem' },
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Desktop/Body-S': {
    fontSize: '0.875rem',
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Mobile/Body-S': {
    fontSize: '0.75rem',
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  // Body-XS
  'body-x-small': {
    fontSize: { base: '0.625rem', md: '0.75rem' },
    fontWeight: fontWeights.normal,
    lineHeight: '125%',
  },
  'Body-XS': {
    fontSize: { base: '0.625rem', md: '0.75rem' },
    fontWeight: fontWeights.normal,
    lineHeight: '125%',
  },
  'Desktop/Body-XS': {
    fontSize: '0.75rem',
    fontWeight: fontWeights.normal,
    lineHeight: '125%',
  },
  'Mobile/Body-XS': {
    fontSize: '0.625rem',
    fontWeight: fontWeights.normal,
    lineHeight: '125%',
  },
  Eyebrow: {
    fontSize: { base: fontSizes.xs, md: fontSizes.sm },
    textTransform: 'uppercase',
    letterSpacing: letterSpacings.loose,
    color: paletteTokens.theme.primary,
    lineHeights: { base: '4', md: '5' },
    fontWeights: fontWeights.extrabold,
    maxWidth: '450px',
  },
  'Desktop/Eyebrow': {
    fontSize: fontSizes.sm,
    textTransform: 'uppercase',
    letterSpacing: letterSpacings.loose,
    color: paletteTokens.theme.primary,
    lineHeights: '5',
    fontWeights: fontWeights.extrabold,
    maxWidth: '450px',
  },
  'Mobile/Eyebrow': {
    fontSize: fontSizes.xs,
    textTransform: 'uppercase',
    letterSpacing: letterSpacings.loose,
    color: paletteTokens.theme.primary,
    lineHeights: '4',
    fontWeights: fontWeights.extrabold,
    maxWidth: '450px',
  },
}

export type TextStyles = typeof variants & typeof sizes

const textStyles = { ...sizes, ...variants }

export default textStyles
