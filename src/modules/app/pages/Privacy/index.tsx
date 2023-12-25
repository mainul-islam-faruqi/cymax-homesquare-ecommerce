import { Box, Button, Checkbox, Flex, Text, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { KLAVIYO_PRIVACY_INFORMATION_LIST_ID } from '@modules/app/constants'
import { handleEmailToKlaviyo } from '@modules/app/utils'
import { FormSelect, STATES } from '@modules/checkout'
import { InputField } from '@myplanetdigital/ui'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IntlShape, useIntl } from 'react-intl'
import * as yup from 'yup'

interface PrivacyForm {
  firstName: string
  lastName: string
  address: string
  city: string
  stateCode: string
  zipCode: string
  email: string
  phone: string
  timeStamp: Date
  requestDetails?: boolean
  deleteInformation?: boolean
}

export const PrivacyInformation = () => {
  const intl = useIntl()
  const toast = useToast()
  const [customErrors, setCustomErrors] = useState({ state: false })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PrivacyForm>({
    resolver: yupResolver(privacyFormSchema({ intl })),
    mode: 'onTouched',
  })

  const onSubmit = async (values: PrivacyForm) => {
    const formattedEmail = handleEmailToKlaviyo(values.email)
    const data = [
      {
        email: formattedEmail,
        originalEmail: values.email,
        phoneNumber: values.phone,
        first_name: values.firstName,
        last_name: values.lastName,
        address: values.address,
        city: values.city,
        stateCode: values.stateCode,
        zipCode: values.zipCode,
        requestDetails: values.requestDetails,
        deleteInformation: values.deleteInformation,
        timeStamp: new Date().toUTCString(),
      },
    ]

    try {
      const res = await axios.post(
        `/api/klaviyo/subscribe-list/${KLAVIYO_PRIVACY_INFORMATION_LIST_ID}`,
        data
      )

      if (res?.status === 200) {
        toast({
          status: 'success',
          position: 'top',
          description: intl.formatMessage({
            id: 'privacyForm.submitSuccessMessage',
          }),
        })
      } else {
        toast({
          status: 'error',
          position: 'top',
          description: intl.formatMessage({
            id: 'privacyForm.submitErrorMessage',
          }),
        })
      }
    } catch (error) {
      toast({
        status: 'error',
        position: 'top',
        description: intl.formatMessage({
          id: (error as Error).message?.includes('400')
            ? 'privacyForm.submitErrorPhoneNumber'
            : 'privacyForm.submitErrorMessage',
        }),
      })
    } finally {
      reset()
      setCustomErrors({ state: false })
    }
  }

  return (
    <Flex w="100%" as="main" m="0 auto" flexDir="column" alignItems="center">
      <Flex
        w="100%"
        position="relative"
        alignItems="center"
        justifyContent="center"
        h={{ base: '306px', md: '500px' }}
      >
        <Text
          as="h1"
          zIndex={1}
          fontWeight="bold"
          color="shading.100"
          position="absolute"
          textAlign="center"
          fontSize={{ base: '4xl', md: '5xl' }}
        >
          {intl.formatMessage({ id: 'privacyForm.header' })}
        </Text>
        <Image
          src={'/img/privacy.png'}
          layout="fill"
          alt={intl.formatMessage({ id: 'privacyForm.header' })}
        />
      </Flex>
      <Box my={0} mx={5} maxWidth="894px" mb={{ base: 5, md: 16 }}>
        <Box
          mt={{ base: 5, md: 10 }}
          w="100%"
          h="100%"
          fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'privacyForm.content' }),
          }}
        />
      </Box>
      <Flex px={{ base: 5, lg: 0 }} justifyContent="center" w="100%" mb={5}>
        <Box
          w="100%"
          py={8}
          px={6}
          maxWidth="894px"
          flexDir="column"
          backgroundColor="shading.100"
          sx={{
            label: {
              fontWeight: 'extrabold',
              fontSize: 'desktop.body',
            },
            input: {
              fontSize: 'desktop.body',
            },
            span: {
              fontSize: 'desktop.body',
            },
          }}
        >
          <Text mb={6} as="h2" fontWeight="bold" fontSize="xl">
            {intl.formatMessage({ id: 'privacyForm.requestTitle' })}
          </Text>
          <Flex
            gap={4}
            as="form"
            flexDir="column"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              label={`${intl.formatMessage({ id: 'privacyForm.firstName' })}*`}
              inputProps={{
                ...register('firstName'),
                placeholder: intl.formatMessage({
                  id: 'privacyForm.firstNamePlaceHolder',
                }),
              }}
              error={errors.firstName}
            />
            <InputField
              label={`${intl.formatMessage({ id: 'privacyForm.lastName' })}*`}
              inputProps={{
                ...register('lastName'),
                placeholder: intl.formatMessage({
                  id: 'privacyForm.lastNamePlaceHolder',
                }),
              }}
              error={errors.lastName}
            />
            <InputField
              label={intl.formatMessage({ id: 'privacyForm.address' })}
              inputProps={{
                ...register('address'),
                placeholder: intl.formatMessage({
                  id: 'privacyForm.addressPlaceHolder',
                }),
              }}
              error={errors.address}
            />
            <InputField
              label={intl.formatMessage({ id: 'privacyForm.city' })}
              inputProps={{ ...register('city') }}
              error={errors.city}
            />
            <Controller
              control={control}
              name="stateCode"
              defaultValue=""
              render={({ field: { onChange, value }, formState }) => (
                <FormSelect
                  placeholder={intl.formatMessage({
                    id: 'privacyForm.statePlaceHolder',
                  })}
                  label={`${intl.formatMessage({
                    id: 'privacyForm.stateCode',
                  })}*`}
                  options={STATES['US']}
                  value={value}
                  setValue={(newVal) => onChange(newVal)}
                  onBlur={() =>
                    setCustomErrors({
                      ...customErrors,
                      state: value !== '' ? false : true,
                    })
                  }
                  error={
                    !!formState.errors.stateCode || customErrors.state
                      ? intl.formatMessage({ id: 'privacyForm.stateRequired' })
                      : ''
                  }
                  selectProps={{ background: 'white' }}
                />
              )}
            />
            <InputField
              label={intl.formatMessage({ id: 'privacyForm.zipCode' })}
              inputProps={{ ...register('zipCode') }}
              error={errors.zipCode}
            />
            <InputField
              label={`${intl.formatMessage({ id: 'privacyForm.email' })}*`}
              inputProps={{ ...register('email') }}
              error={errors.email}
            />
            <InputField
              label={`${intl.formatMessage({ id: 'privacyForm.phone' })}*`}
              inputProps={{ ...register('phone') }}
              error={errors.phone}
            />
            <Checkbox
              display="flex"
              {...register('deleteInformation')}
              isInvalid={!!errors.deleteInformation}
            >
              {intl.formatMessage({ id: 'privacyForm.deleteInformation' })}
            </Checkbox>
            <Checkbox
              display="flex"
              {...register('requestDetails')}
              isInvalid={!!errors.deleteInformation}
            >
              {intl.formatMessage({ id: 'privacyForm.requestDetails' })}
            </Checkbox>
            {!!errors.deleteInformation && (
              <Text color="red.500" fontSize="sm">
                {intl.formatMessage({ id: 'privacyForm.checkboxesRequired' })}
              </Text>
            )}
            <Button
              mt={4}
              size="xl"
              type="submit"
              fontSize="sm"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              colorScheme="shading.900"
            >
              {intl.formatMessage({ id: 'privacyForm.submitButton' })}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

const privacyFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup
    .object()
    .shape({
      email: yup
        .string()
        .email(intl.formatMessage({ id: 'validation.emailValid' }))
        .required(intl.formatMessage({ id: 'validation.emailRequired' })),
      phone: yup
        .string()
        .required(intl.formatMessage({ id: 'privacyForm.phoneRequired' })),
      firstName: yup
        .string()
        .required(intl.formatMessage({ id: 'privacyForm.firstNameRequired' })),
      lastName: yup
        .string()
        .required(intl.formatMessage({ id: 'privacyForm.lastNameRequired' })),
      stateCode: yup
        .string()
        .required(intl.formatMessage({ id: 'privacyForm.stateRequired' })),
    })
    .test('myCustomTest', '', (obj) => {
      if (obj.deleteInformation || obj.requestDetails) {
        return true
      }
      return new yup.ValidationError('', null, 'deleteInformation')
    })
}
