import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'
import borders from '../foundations/borders'
import borderStyles from '../foundations/borderStyles'
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // Styles for the base style
  parts: ['field'],
  baseStyle: {
    /**
     * Styles set within { variants } will override base styles
     * Styles set within { sizes } will override base styles
     * The Input component uses "md" size and "outline" variant by default.
     *
     * You can unset those defaults by using null in defaultProps:
     *    defaultProps: {
     *      size: null,
     *      variant: null
     *    },
     *
     * You will lose all default styles this way, including things like focus.
     */
    field: {
      // Add custom base styles here
      borderWidth: borders.sm,
      borderStyle: borderStyles.normal,
    },
  },
  // // Styles for the size variations
  // sizes: {},
  // // Styles for the visual style variations
  variants: {
    outline: (props: SystemStyleFunction) => {
      return {
        field: {
          borderColor: 'inherit',
          bg: mode('white', 'black')(props),
          _focus: {
            borderWidth: borders.sm,
            borderStyle: borderStyles.normal,
            borderColor: 'primary.500',
          },
          _invalid: {
            borderColor: 'red.300',
          },
        },
        addon: {
          // chakra-ui default
          border: '1px solid',
          borderColor: mode('inherit', 'whiteAlpha.50')(props),
          bg: mode('gray.100', 'whiteAlpha.300')(props),
        },
      }
    },
  },
  defaultProps: {
    variant: 'outline', // null here
  },
}
