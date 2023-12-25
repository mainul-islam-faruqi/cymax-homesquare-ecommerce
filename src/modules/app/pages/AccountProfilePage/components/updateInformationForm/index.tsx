import {
  Box,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useInputFocus } from '@modules/app/hooks'
import { useCustomerName } from '@modules/app/hooks/useCustomerName'
import { removeCharacterFromString } from '@modules/app/utils'
import { useUser } from '@myplanetdigital/elasticpath'
import { InputField } from '@myplanetdigital/ui'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IntlShape, useIntl } from 'react-intl'
import * as yup from 'yup'

interface FormData {
  firstName: string
  lastName: string
  email: string
}

export const UpdateInformationForm = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const intl = useIntl()
  const { textFieldFocusFX } = useInputFocus()

  const subtitle = intl.formatMessage({ id: 'profile.updateInfo.subtitle' })
  // const requiredText = intl.formatMessage({ id: 'form.required' })
  const duplicatedEmail = intl.formatMessage({
    id: 'profile.updateInfo.error.email',
  })
  const successUpdate = intl.formatMessage({ id: 'profile.updateInfo.success' })
  const toast = useToast()
  const { customer, updateUser } = useUser({
    onUserUpdateError(err) {
      if (err.response?.status === 409) {
        setError(
          'email',
          { type: 'validate', message: duplicatedEmail },
          { shouldFocus: true }
        )
      }
    },
    onUserUpdateSuccess() {
      toast({ position: 'top', status: 'success', description: successUpdate })
    },
  })
  const { firstName, lastName } = useCustomerName()

  const setValueOptions = {
    shouldValidate: true,
  }
  useEffect(() => setInitialCustomerData(), [])
  const setInitialCustomerData = () => {
    setValue('firstName', firstName, setValueOptions)
    setValue('lastName', lastName, setValueOptions)
    setValue('email', customer?.email ?? '', setValueOptions)
  }

  const {
    register,
    formState: { errors },
    setValue,
    setError,
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(updateInfoFormSchema({ intl })),
    mode: 'all',
  })

  const handleUpdateInformation = async (data: FormData) => {
    await updateUser.mutate({
      name: `${removeCharacterFromString(
        data.firstName,
        '|'
      )}|${removeCharacterFromString(data.lastName, '|')}`,
      email: `${data.email}`,
    })
  }

  return (
    <Box bg="shading.100" paddingInline={5} paddingBlock={8}>
      <Flex
        direction={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        flexWrap={isMobile ? 'nowrap' : 'wrap'}
        alignItems={isMobile ? 'flex-start' : 'center'}
      >
        <Text
          as="h3"
          fontSize={{ base: 'mobile.md', md: 'desktop.sm' }}
          fontWeight="bold"
          paddingRight={isMobile ? 0 : 48}
        >
          {intl.formatMessage({ id: 'profile.navMenu.profileInformation' })}
        </Text>
      </Flex>

      <Text
        as="p"
        mt={4}
        fontSize={{ base: 'desktop.bodySM', md: 'desktop.body' }}
      >
        {subtitle}
      </Text>

      <Box mt={10}>
        <Box as="form" onSubmit={handleSubmit(handleUpdateInformation)}>
          <Stack
            spacing={5}
            direction="column"
            sx={{
              label: {
                fontWeight: 'extrabold',
                fontSize: 'desktop.body',
              },
              input: {
                fontSize: 'desktop.body',
                _focus: {
                  ...textFieldFocusFX,
                },
              },
            }}
          >
            <Flex gap={4} flexDirection={isMobile ? 'column' : 'row'}>
              <InputField
                label={intl.formatMessage({
                  id: 'account.register.label.firstName',
                })}
                inputProps={{
                  ...register('firstName'),
                  placeholder: intl.formatMessage({
                    id: 'address.firstNameHint',
                  }),
                  isDisabled: true,
                  _disabled: {
                    opacity: 0.5,
                  },
                }}
                error={errors.firstName}
              />
              <InputField
                label={intl.formatMessage({
                  id: 'account.register.label.lastName',
                })}
                inputProps={{
                  ...register('lastName'),
                  placeholder: intl.formatMessage({
                    id: 'address.lastNameHint',
                  }),
                  isDisabled: true,
                  _disabled: {
                    opacity: 0.5,
                  },
                }}
                error={errors.lastName}
              />
            </Flex>

            <InputField
              label={intl.formatMessage({
                id: 'account.register.label.email',
              })}
              inputProps={{
                ...register('email'),
                placeholder: intl.formatMessage({
                  id: 'address.emailHint',
                }),
                isDisabled: true,
                _disabled: {
                  opacity: 0.5,
                },
              }}
              error={errors.email}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

const updateInfoFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    firstName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
    lastName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),

    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.required' })),
  })
}
