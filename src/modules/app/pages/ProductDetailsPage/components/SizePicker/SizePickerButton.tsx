import {
  Button,
  chakra,
  useColorModeValue,
  useRadio,
  UseRadioProps,
  useTheme,
  VisuallyHidden,
} from '@chakra-ui/react'
import { transparentize } from '@chakra-ui/theme-tools'
import * as React from 'react'

export type SizePickerButtonProps = UseRadioProps & {
  label?: string
}

export const SizePickerButton = (props: SizePickerButtonProps) => {
  const { value, label } = props
  const { getInputProps, htmlProps, getCheckboxProps, getLabelProps } =
    useRadio(props)
  const theme = useTheme()

  return (
    <chakra.label {...htmlProps}>
      <chakra.input {...getInputProps()} />
      <Button
        as="span"
        px="0"
        cursor="pointer"
        variant="outline"
        colorScheme="blue"
        color={useColorModeValue('gray.600', 'gray.400')}
        borderRadius="base"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
        _checked={{
          color: useColorModeValue('blue.500', 'blue.200'),
          bg: useColorModeValue(
            'blue.50',
            transparentize('blue.200', 0.12)(theme)
          ),
          borderColor: useColorModeValue('blue.500', 'blue.200'),
          borderWidth: '2px',
        }}
        _focus={{ boxShadow: 'none' }}
        _focusVisible={{ boxShadow: 'outline' }}
        {...getCheckboxProps()}
      >
        {value}
      </Button>
      <VisuallyHidden {...getLabelProps()}>{label} selected</VisuallyHidden>
    </chakra.label>
  )
}
