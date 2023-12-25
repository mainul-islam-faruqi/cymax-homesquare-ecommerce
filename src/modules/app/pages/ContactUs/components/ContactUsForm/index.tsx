import { Box, Button, Stack, useBreakpointValue } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectField } from '@modules/app/components'
import { KLAVIYO_CONTACT_US_LIST_ID } from '@modules/app/constants'
import { useInputFocus } from '@modules/app/hooks'
import { hashEmailKlaviyo } from '@modules/app/utils'
import { useUser } from '@myplanetdigital/elasticpath'
import { InputField, TextareaField } from '@myplanetdigital/ui'
import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { contactUsFormSchema } from './formSchema'
import { useCustomToast } from './hooks/useCustomToast'
import { FormData, REASON_OPTIONS, YES_NO_OPTIONS } from './types'

const REQUIRED = '*'

export const ContactUsForm = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const intl = useIntl()
  const { textFieldFocusFX, selectFocusFX } = useInputFocus()
  const customToast = useCustomToast()
  const { customer } = useUser()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(contactUsFormSchema({ intl })),
    mode: 'onTouched',
  })

  useEffect(() => {
    if (customer) {
      setValue('email', customer.email)
    }
  }, [customer])

  const handleSubmitContactUsForm = async (values: FormData) => {
    const newEmail = hashEmailKlaviyo(values?.email)

    const data = [
      {
        order_number_select: values.orderNumberSelect,
        order_number_details: values.orderNumberDetails,
        first_name: values.firstName,
        last_name: values.lastName,
        email: newEmail,
        phone: values.phone,
        zip_code: values.zipCode,
        first_contact: values.firstContact,
        reason: values.reason,
        details: values.details,
        custom_email: values.email,
      },
    ]

    try {
      const { status } = await axios.post(
        `/api/klaviyo/subscribe-list/${KLAVIYO_CONTACT_US_LIST_ID}`,
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

  return (
    <Box
      onSubmit={handleSubmit(handleSubmitContactUsForm)}
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
        },
      }}
    >
      <Box
        display={'flex'}
        gap={4}
        flexDirection={isMobile ? 'column' : 'row'}
        mb={3}
      >
        <SelectField
          label={intl.formatMessage({ id: 'contactUs.orderNumber' }) + REQUIRED}
          options={YES_NO_OPTIONS}
          selectProps={{
            ...register('orderNumberSelect'),
            _focus: { ...selectFocusFX },
            placeholder: intl.formatMessage({
              id: 'address.dropdownHint',
            }),
          }}
          error={errors.orderNumberSelect}
        />
        <InputField
          label={intl.formatMessage({
            id: 'contactUs.orderNumberDetails',
          })}
          inputProps={{
            ...register('orderNumberDetails'),
            placeholder: intl.formatMessage({
              id: 'address.orderHint',
            }),
          }}
        />
      </Box>
      <Box display={'flex'} gap={4} flexDirection={isMobile ? 'column' : 'row'}>
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

      <Stack mt={3}>
        <InputField
          label={
            intl.formatMessage({
              id: 'contactUs.label.email',
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
              id: 'account.register.label.zipCode',
            }) + REQUIRED
          }
          inputProps={register('zipCode')}
          error={errors.zipCode}
        />

        <InputField
          label={
            intl.formatMessage({
              id: 'account.register.label.phone',
            }) + REQUIRED
          }
          inputProps={register('phone')}
          error={errors.phone}
        />
      </Stack>
      <Box
        display={'flex'}
        gap={4}
        flexDirection={isMobile ? 'column' : 'row'}
        marginBlock={3}
      >
        <SelectField
          label={
            intl.formatMessage({ id: 'contactUs.firstContact' }) + REQUIRED
          }
          options={YES_NO_OPTIONS}
          selectProps={{
            ...register('firstContact'),
            _focus: { ...selectFocusFX },
            placeholder: intl.formatMessage({
              id: 'address.dropdownHint',
            }),
          }}
          error={errors.firstContact}
        />
        <SelectField
          label={intl.formatMessage({ id: 'contactUs.reason' }) + REQUIRED}
          options={REASON_OPTIONS}
          selectProps={{
            ...register('reason'),
            _focus: { ...selectFocusFX },
            placeholder: intl.formatMessage({
              id: 'address.dropdownHint',
            }),
          }}
          error={errors.reason}
        />
      </Box>
      <TextareaField
        inputProps={{
          ...register('details'),
          placeholder: intl.formatMessage({
            id: 'contactUs.details.placeholder',
          }),
        }}
        label={intl.formatMessage({ id: 'contactUs.details' })}
      />
      <Button
        disabled={isSubmitting}
        isLoading={isSubmitting}
        mt={8}
        paddingBlock={5}
        paddingInline={5}
        fontSize="desktop.bodySM"
        border="none"
        type="submit"
        _hover={{ border: 'none' }}
      >
        {intl.formatMessage({ id: 'contactUs.submitBtn' })}
      </Button>
    </Box>
  )
}
