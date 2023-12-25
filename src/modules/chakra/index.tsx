import { extendTheme } from '@chakra-ui/react'

import * as components from './theme/components'
import foundations from './theme/foundations'
import layerStyles from './theme/layerStyles'
import styles from './theme/styles'
import textStyles from './theme/textStyles'

import defaultTheme from './util/defaultTheme.json'
import siteTheme from './util/theme.json'

/*
  This is the Composable default theme that overrides Chakra-UI base theme.
  Override within this ./theme dir for project customization.

  Chakra-UI theme sorce: @chakra-ui/theme/src/
  Chakra-UI GitHub: https://github.com/chakra-ui/chakra-ui/tree/main/packages
  
  ## Theme typings and autocomplete (VScode only)
  for the extended theme to be added to autocomplete (VScode only)
  1. go to your project root, make sure @chakra-ui/cli is installed for the dev environment or just install it:

    ```yarn add --dev @chakra-ui/cli```

  2. then run: `npx chakra-cli tokens [path to this theme file]`
  3. restart Typescript Server (Command + Shift + P on any TS file, then find Restart TS server)
  4. your customized theme should be available for autocomplete now 

    Guide:https://chakra-ui.com/docs/styled-system/theming/advanced#theme-typings

  ## How to customize the theme for your project
  see https://chakra-ui.com/docs/styled-system/theming/theme on how to override the default or append new theme settings

  We already created a `theme` folder under `starterkit-shared/src/modules/chakra` for Composable default themes to override the chakra-ui base theme. 

  For more customization, just override or add to the `theme` folder, and run the command `npx chakra-cli tokens [path to this theme file]` to update typings. Make sure to restart the Typescript server. 

  see https://chakra-ui.com/docs/styled-system/theming/theme on how to override the default or append new theme settings

  Chakra-UI theme sorce: @chakra-ui/theme/src/
  Chakra-UI GitHub: https://github.com/chakra-ui/chakra-ui/tree/main/packages

  Example: override Input component
  - Guide: https://chakra-ui.com/docs/styled-system/theming/component-style
  - Input Doc: https://chakra-ui.com/docs/components/form/input
  - Input Source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/input
  - Input Theme source: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/input.ts

*/

/* 
    the export name must be `theme` here for the `npx chakra-cli tokens` to work
    change it to `theme`
*/
export const theme = extendTheme(
  {
    ...foundations,
    textStyles, // text variants
    layerStyles, // style variants
    styles, // Global style override
    components: {
      ...components,
    },
  },
  {
    ...defaultTheme,
    ...siteTheme,
  }
)
