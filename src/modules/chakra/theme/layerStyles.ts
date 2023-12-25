import borderStyles from './foundations/borderStyles'

const layerStyles = {
  'divider-default': {
    borderStyle: borderStyles.normal,
    borderColor: 'gray.300',
    borderWidth: '0 0 1px 0',
  },
}

export type LayerStyles = typeof layerStyles

export default layerStyles
