import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { FieldError } from 'react-hook-form'
import { useIntl } from 'react-intl'
export interface ResidentialRadioProps {
  label: string
  value: boolean
  setValue: (newVal: boolean) => void
  error?: FieldError
}

export const ResidentialRadio: React.FC<ResidentialRadioProps> = ({
  label,
  error,
  value,
  setValue,
}) => {
  const intl = useIntl()

  return (
    <FormControl isInvalid={Boolean(error)}>
      <Flex justify="space-between">
        <FormLabel>{label}</FormLabel>
      </Flex>
      <RadioGroup
        onChange={(newVal) => setValue(newVal === 'commercial')}
        value={value ? 'commercial' : 'residential'}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '6', md: '12' }}
        >
          <Radio
            size="lg"
            value="residential"
            _focus={{ boxShadow: 'none' }}
            _checked={{
              borderColor: 'primary.500',
              borderWidth: '6px',
            }}
          >
            <Text fontSize="desktop.body" fontWeight="normal">
              {intl.formatMessage({ id: 'address.residential' })}
            </Text>
          </Radio>
          <Radio
            size="lg"
            value="commercial"
            _focus={{ boxShadow: 'none' }}
            _checked={{
              borderColor: 'primary.500',
              borderWidth: '6px',
            }}
          >
            <Text fontSize="desktop.body" fontWeight="normal">
              {intl.formatMessage({ id: 'address.commercial' })}
            </Text>
          </Radio>
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
