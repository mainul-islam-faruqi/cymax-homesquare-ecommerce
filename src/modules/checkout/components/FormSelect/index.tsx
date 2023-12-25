import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Select,
  SelectProps,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { SelectOptions } from '../AddressForms'

export interface FormSelectProps {
  label: string
  options: SelectOptions[] | string[]
  value: string
  setValue: (newVal: string) => void
  placeholder: string
  onBlur: () => void
  error?: string
  labelStyles?: FormLabelProps
  selectProps?: SelectProps
}

const Option: React.FC<{
  data: SelectOptions | string
}> = ({ data }) => {
  const intl = useIntl()
  if (typeof data === 'string') {
    return (
      <option key={data} value={data}>
        {data}
      </option>
    )
  }
  return (
    <option key={data.value} value={data.value}>
      {intl.formatMessage({ id: data.label })}
    </option>
  )
}

export const FormSelect: React.FC<FormSelectProps> = ({
  options,
  placeholder,
  label,
  error,
  value,
  setValue,
  onBlur,
  labelStyles,
  selectProps,
}) => {
  return (
    <FormControl isInvalid={error !== ''}>
      <Flex justify="space-between">
        <FormLabel {...labelStyles}>{label}</FormLabel>
      </Flex>
      <Select
        placeholder={placeholder}
        color={!!value ? 'shading.900' : 'shading.300'}
        fontSize={'desktop.body'}
        value={value}
        onBlur={() => onBlur()}
        onChange={(event) => setValue(event.target.value)}
        {...selectProps}
      >
        {options.map((option, index) => (
          <Option data={option} key={`option-${index}`} />
        ))}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
