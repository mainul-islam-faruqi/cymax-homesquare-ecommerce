import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Select,
  SelectProps,
} from '@chakra-ui/react'
import React from 'react'
import { FieldError } from 'react-hook-form'
import { useIntl } from 'react-intl'

export interface SelectFieldOption {
  label: string
  value: string
}

export interface SelectFieldProps {
  label: string
  selectProps: SelectProps
  error?: FieldError
  formLabelProps?: FormLabelProps
  options: SelectFieldOption[]
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  selectProps,
  error,
  formLabelProps,
  options,
}) => {
  const intl = useIntl()
  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel {...formLabelProps}>{label}</FormLabel>
      <Select backgroundColor="white" {...selectProps}>
        {React.Children.toArray(
          (options || []).map((opt) => (
            // eslint-disable-next-line react/jsx-key
            <option value={opt.value}>
              {intl.formatMessage({ id: opt.label })}
            </option>
          ))
        )}
      </Select>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
