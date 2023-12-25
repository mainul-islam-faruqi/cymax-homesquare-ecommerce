import {
  Box,
  Button,
  Checkbox,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectField } from '@modules/app/components'
import {
  KLAVIYO_BUSINESS_PROGRAM_LIST_ID,
  KLAVIYO_NEWSLETTER_LIST_ID,
} from '@modules/app/constants'
import { useInputFocus } from '@modules/app/hooks'
import { hashEmailKlaviyo } from '@modules/app/utils'
import { INDUSTRIES } from '@modules/checkout'
import { InputField, TextareaField } from '@myplanetdigital/ui'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useCustomToast } from '../../hooks/useCustomToast'
import { businessProgramFormSchema } from './formSchema'
import { FormData } from './types'

const REQUIRED = '*'

export const Form = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const intl = useIntl()
  const { textFieldFocusFX, selectFocusFX } = useInputFocus()
  const customToast = useCustomToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(businessProgramFormSchema({ intl })),
    mode: 'onTouched',
  })

  const handleSubmitBusinessProgramForm = async (values: FormData) => {
    const newEmail = hashEmailKlaviyo(values?.email)
    const data = [
      {
        first_name: values.firstName,
        last_name: values.lastName,
        email: newEmail,
        phone: values.phone,
        company_name: values.companyName,
        industry: values.industry,
        details: values.details,
        custom_email: values.email,
      },
    ]

    if (values.isSubscribeToNewsletter) {
      await subscribeToNewsletter(values.email)
    }

    try {
      const { status } = await axios.post(
        `/api/klaviyo/subscribe-list/${KLAVIYO_BUSINESS_PROGRAM_LIST_ID}`,
        data
      )
      if (status === 200) {
        reset()
        customToast('success')
      }
    } catch (err: any) {
      customToast('error')
    }
  }

  const subscribeToNewsletter = async (email: string) => {
    const data = [
      {
        email,
      },
    ]

    await axios.post(
      `/api/klaviyo/subscribe-list/${KLAVIYO_NEWSLETTER_LIST_ID}`,
      data
    )
  }

  return (
    <Box
      onSubmit={handleSubmit(handleSubmitBusinessProgramForm)}
      as="form"
      width="100%"
      maxW="894px"
      bg="shading.100"
      paddingInline={5}
      paddingBlock={8}
      marginBottom={10}
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
        textArea: {
          bg: 'white',
          _focus: {
            ...textFieldFocusFX,
            borderColor: 'primary.500',
          },
          _placeholder: {
            fontSize: 'desktop.body',
          },
        },
      }}
    >
      <Box
        display={'flex'}
        gap={4}
        flexDirection={isMobile ? 'column' : 'row'}
        mb={3}
      >
        <InputField
          label={
            intl.formatMessage({
              id: 'account.register.label.firstName',
            }) + REQUIRED
          }
          inputProps={{
            ...register('firstName'),
            placeholder: intl.formatMessage({
              id: 'address.firstNameHint',
            }),
          }}
          error={errors.firstName}
        />
        <InputField
          label={
            intl.formatMessage({
              id: 'account.register.label.lastName',
            }) + REQUIRED
          }
          inputProps={{
            ...register('lastName'),
            placeholder: intl.formatMessage({
              id: 'address.lastNameHint',
            }),
          }}
          error={errors.lastName}
        />
      </Box>

      <Box display={'flex'} gap={4} flexDirection={isMobile ? 'column' : 'row'}>
        <InputField
          label={
            intl.formatMessage({
              id: 'account.register.label.email',
            }) + REQUIRED
          }
          inputProps={{
            ...register('email'),
            placeholder: intl.formatMessage({
              id: 'address.emailHint',
            }),
          }}
          error={errors.email}
        />

        <InputField
          label={
            intl.formatMessage({
              id: 'account.register.label.phone',
            }) + REQUIRED
          }
          inputProps={{
            ...register('phone'),
            placeholder: intl.formatMessage({
              id: 'cart.phoneNumber.placeholder',
            }),
          }}
          error={errors.phone}
        />
      </Box>

      <Box
        display={'flex'}
        gap={4}
        flexDirection={isMobile ? 'column' : 'row'}
        marginTop={3}
      >
        <InputField
          label={
            intl.formatMessage({
              id: 'address.companyTitle',
            }) + REQUIRED
          }
          inputProps={register('companyName')}
          error={errors.companyName}
        />

        <SelectField
          label={intl.formatMessage({ id: 'address.industryTitle' }) + REQUIRED}
          options={INDUSTRIES}
          selectProps={{
            ...register('industry'),
            _focus: { ...selectFocusFX },
            placeholder: intl.formatMessage({
              id: 'address.dropdownHint',
            }),
          }}
          error={errors.industry}
        />
      </Box>

      <Box marginTop={3}>
        <TextareaField
          inputProps={{
            ...register('details'),
            placeholder: intl.formatMessage({
              id: 'businessProgram.details.placeholder',
            }),
          }}
          label=""
          error={errors.details}
        />
      </Box>
      <Box marginTop={3} width="fit-content">
        <Checkbox
          spacing={3}
          size="md"
          colorScheme="primary"
          display="flex"
          {...register('isSubscribeToNewsletter')}
        >
          {' '}
          <Text as="p">
            {intl.formatMessage({
              id: 'businessProgram.subscribeToNewsletter',
            })}
          </Text>
        </Checkbox>
      </Box>
      <Button
        mt={8}
        paddingBlock={5}
        paddingInline={5}
        fontSize="desktop.bodySM"
        border="none"
        type="submit"
        _hover={{ border: 'none' }}
        disabled={isSubmitting}
      >
        {intl.formatMessage({ id: 'businessProgram.button' })}
      </Button>
    </Box>
  )
}
