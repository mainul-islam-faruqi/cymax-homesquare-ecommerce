export const palette = {
  primary: {
    '100': '#F0E0DA',
    '200': '#EEC4BE',
    '300': '#CF9190',
    '400': '#9F6267',
    '500': '#5F2F37',
    '600': '#51222E',
    '700': '#441727',
    '800': '#370E20',
    '900': '#2D091C',
  },
  secondary: {
    '100': '#FEF1EB',
    '200': '#FFDBCB',
    '300': '#FABB9E',
    '400': '#F8A077',
    '500': '#F68551',
    '600': '#F46A2A',
    '700': '#E9520C',
    '800': '#C2440A',
    '900': '#C2440A',
  },
  tertiary: {
    '100': '#D6FFE3',
    '200': '#ADFFCF',
    '300': '#84FFC3',
    '400': '#66FFC3',
    '500': '#33FFC3',
    '600': '#25DBB7',
    '700': '#19B7A8',
    '800': '#109393',
    '900': '#096F7A',
  },
  success: {
    '100': '#D9FADB',
    '200': '#B5F5C0',
    '300': '#8AE2A1',
    '400': '#65C689',
    '500': '#38A169',
    '600': '#288A60',
    '700': '#1C7356',
    '800': '#115D4B',
    '900': '#0A4D44',
  },
  danger: {
    '100': '#FDE5D8',
    '200': '#FCC5B2',
    '300': '#F79D8B',
    '400': '#EF776C',
    '500': '#E53E3E',
    '600': '#C42D3A',
    '700': '#A41F36',
    '800': '#841331',
    '900': '#6D0B2D',
  },
  warning: {
    '100': '#FDEDD1',
    '200': '#FBD6A5',
    '300': '#F4B777',
    '400': '#EA9854',
    '500': '#DD6B20',
    '600': '#BE4F17',
    '700': '#9F3710',
    '800': '#80240A',
    '900': '#6A1606',
  },
  info: {
    '100': '#D6F1FC',
    '200': '#ADE0FA',
    '300': '#82C6F0',
    '400': '#60A9E1',
    '500': '#3182CE',
    '600': '#2365B1',
    '700': '#184B94',
    '800': '#0F3577',
    '900': '#092562',
  },
  shading: {
    '100': '#F4F4F4',
    '200': '#E2E2E2',
    '300': '#C0C0C0',
    '400': '#828282',
    '500': '#404040',
    '600': '#232323',
    '700': '#222222',
    '800': '#1B1B1B',
    '900': '#111111',
  },
  dark: {
    '100': '#000000',
    '200': '#000000',
    '300': '#000000',
    '400': '#000000',
    '500': '#000000',
    '600': '#000000',
    '700': '#000000',
    '800': '#000000',
    '900': '#000000',
  },
  white: {
    '100': '#FFFFFF',
    '200': '#FFFFFF',
    '300': '#FFFFFF',
    '400': '#FFFFFF',
    '500': '#FFFFFF',
    '600': '#FFFFFF',
    '700': '#FFFFFF',
    '800': '#FFFFFF',
    '900': '#FFFFFF',
  },
  gray: {
    '1000': '#CCCCCC',
  },
}

export const paletteTokens = {
  theme: {
    background: 'white', //Body background color
    text: 'black', //Body foreground color
    textMuted: palette.shading['400'], //Body foreground color for alternative styling
    primary: palette.primary['500'], //Primary brand color for links, buttons, etc.
    secondary: palette.primary['800'], //A secondary brand color for alternative styling
    highlight: palette.primary['100'], //A background color for highlighting text
    muted: palette.shading['200'], //A faint color for backgrounds, borders, and accents that do not require high contrast with the background color.
    accent: palette.primary['200'], //A contrast color for emphasizing UI
    dark: {
      background: 'black',
      text: 'white',
      textMuted: palette.primary['300'],
      primary: palette.primary['500'],
      secondary: palette.primary['800'],
      highlight: palette.primary['100'],
      muted: palette.shading['200'],
      accent: palette.primary['200'],
    },
  },
}

// Color Tokens - Global Status
const colorTokens = {
  // info
  infoLight: palette.info['100'],
  infoMed: palette.info['500'],
  infoDark: palette.info['900'],
  // success
  successLight: palette.success['100'],
  successMed: palette.success['500'],
  successDark: palette.success['900'],
  // warning
  warningLight: palette.warning['100'],
  warningMed: palette.warning['500'],
  warningDark: palette.warning['700'],
  // danger
  dangerLight: palette.danger['100'],
  dangerMed: palette.danger['500'],
  dangerDark: palette.danger['900'],
}

export type Colors = typeof palette & typeof paletteTokens & typeof colorTokens

const colors = { ...palette, ...paletteTokens, ...colorTokens }

export default colors
