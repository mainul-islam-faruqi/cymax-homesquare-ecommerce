import { forwardRef, useRef } from 'react'
import { useIntl } from 'react-intl'
import { FieldError } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import {
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  FormErrorMessage,
  FormLabelProps,
} from '@chakra-ui/react'

interface PasswordFieldProps {
  label: string
  inputProps: Omit<InputProps, 'type'>
  error?: FieldError
  callToAction?: JSX.Element
  isRequired?: boolean
  formLabelProps?: FormLabelProps
}
const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    { label, error, inputProps, callToAction, isRequired, formLabelProps },
    ref
  ) => {
    const intl = useIntl()
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)
    const mergeRef = useMergeRefs(inputRef, ref)
    const { name } = inputProps

    if (!name) {
      return null
    }

    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }

    return (
      <FormControl isInvalid={Boolean(error)} isRequired={isRequired}>
        <Flex justify="space-between">
          <FormLabel {...formLabelProps}>{label}</FormLabel>
          {callToAction}
        </Flex>
        <InputGroup>
          <Input
            ref={mergeRef}
            name={name}
            type={isOpen ? 'text' : 'password'}
            autoComplete="off"
            {...inputProps}
          />
          <InputRightElement>
            <IconButton
              bg="transparent !important"
              variant="ghost"
              aria-label={intl.formatMessage({
                id: isOpen ? 'action.passwordMask' : 'action.passwordReveal',
              })}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    )
  }
)

PasswordField.displayName = 'PasswordField'

export { PasswordField }
