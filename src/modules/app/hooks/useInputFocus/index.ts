import { useToken } from '@chakra-ui/react'

export const useInputFocus = () => {
  const [primColor] = useToken('colors', ['primary.500'])

  return {
    textFieldFocusFX: { boxShadow: `0 0 0 1px ${primColor}` },
    selectFocusFX: { borderWidth: '2px', borderColor: primColor },
  }
}
