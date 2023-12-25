export const fonts = {
  // Cymax
  primary: 'font-family: Lato',
  // Composable
  body: 'font-family: Circular Std',
  heading: 'font-family: Circular Std',
  mono: 'font-family: Circular Std',
}
export const fontSizes = {
  // Project
  desktop: {
    xxl: '4rem', //64px
    xl: '3rem', //48px
    lg: '2rem', //32px
    md: '1.75rem', //28px
    sm: '1.5rem', //24px
    xs: '1.25rem', //20px
    bodyXL: '1.5rem', //24px
    bodyLG: '1.25rem', //20px
    body: '1rem', //16px
    bodySM: '0.875rem', //14px
    bodyXS: '0.75rem', //12px
    eyebrow: '0.875rem', //14px
  },
  mobile: {
    xxl: '2.25rem', //36px
    xl: '2rem', //32px
    lg: '1.75rem', //28px
    md: '1.5rem', //24px
    sm: '1.25rem', //20px
    xs: '1rem', //16px
    bodyXL: '1.25rem', //20px
    bodyLG: '1rem', //16px
    body: '0.875rem', //14px
    bodySM: '0.75rem', //12px
    bodyXS: '0.625rem', //10px
    eyebrow: '0.75rem', //12px`
  },
  // Composable
  xxs: '0.625rem', //10px
  xs: '0.75rem', //12px
  sm: '0.875rem', //14px
  base: '1rem', //16px
  md: '1.125rem', //18px
  lg: '1.25rem', //20px
  xl: '1.5rem', //24px
  xxl: '1.75rem', //28px
  xxxl: '2.25rem', //36px
  xxxxl: '2.625rem', //42px
  xxxxxl: '3rem', //48px

  //chakra-ui default
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
}

export const fontWeights = {
  extraLight: 100,
  light: 200,
  normal: 400,
  bold: 600,

  //chakra-ui default
  hairline: 100,
  thin: 100,
  medium: 300,
  semibold: 500,
  extrabold: 700,
  black: 800,
}
export const letterSpacings = {
  // Composable
  extraTight: '-0.04em',
  tight: '-0.02em',
  normal: '0',
  relaxed: '0.02em',
  loose: '0.04em',
  extraLoose: '0.08em',

  //chakra-ui default
  tighter: '-0.05em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}
export const lineHeights = {
  // Composable
  none: 1,
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.5,
  loose: 2,

  //chakra-ui default
  base: 1.5, // 150%
  shorter: 1.25,
  short: 1.375,
  tall: 1.625,
  taller: 2,
  '3': '.75rem', //12px
  '4': '1rem', //16px
  '5': '1.25rem', //20
  '6': '1.5rem', //24
  '7': '1.75rem', //28
  '8': '2rem', //32
  '9': '2.25rem', //36
  '10': '2.5rem', //40
}

// Need to match with chakra-ui Theme Key
export const typography = {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
}

export type Typography = typeof typography

export default typography
