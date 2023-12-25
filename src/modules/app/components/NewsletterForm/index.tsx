/* eslint-disable @next/next/no-sync-scripts */
import { SmallCloseIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { KLAVIYO_NEWSLETTER_LIST_ID } from '@modules/app/constants'
import { useInputFocus } from '@modules/app/hooks'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { clickEvent } from '@modules/gtm/clickEvent'
import { InputField } from '@myplanetdigital/ui'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IntlShape, useIntl } from 'react-intl'
import * as yup from 'yup'

interface NewsletterFormInterface {
  email: string
}

export const NewsletterForm = () => {
  const intl = useIntl()
  const { asPath } = useRouter()
  const { token: csaToken } = useCsa()
  const { textFieldFocusFX } = useInputFocus()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NewsletterFormInterface>({
    resolver: yupResolver(newsletterFormSchema({ intl })),
    mode: 'onTouched',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [formSubmittedMessage, setFormSubmittedResponse] = useState('')

  const closeMessage = () => {
    setFormSubmittedResponse('')
  }

  const handleSubmitClick = () => {
    clickEvent({
      event: 'clickEvent',
      category: '',
      subcategory: '',
      page_details: asPath || '',
      section: intl.formatMessage({ id: 'ariaLabel.footerSection' }),
      clicktext: intl.formatMessage({ id: 'newsletter.button' }),
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
  }

  const onSubmit = async (data: NewsletterFormInterface) => {
    setIsLoading(true)

    const body = [
      {
        email: data?.email,
      },
    ]

    const res = await axios.post(
      `/api/klaviyo/subscribe-list/${KLAVIYO_NEWSLETTER_LIST_ID}`,
      body
    )

    if (res?.status === 200) {
      const message = intl.formatMessage({ id: 'newsletter.success.message' })
      setFormSubmittedResponse(message)
      setValue('email', '')
    }

    setTimeout(() => closeMessage(), 2000)
    setIsLoading(false)
  }

  return (
    <Box w="100%" maxW={{ sm: '100%', md: '343px' }} mt={3}>
      <Text as="p">{intl.formatMessage({ id: 'newsletter.title' })}</Text>

      <Stack
        mt="mobile"
        direction="row"
        sx={{
          input: {
            borderRadius: '5px 0 0 5px',
            _focus: { ...textFieldFocusFX },
          },
        }}
        as="form"
        id="email_signUp"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label={intl.formatMessage({
            id: 'newsletter.email',
          })}
          inputProps={{
            ...register('email'),
            placeholder: intl.formatMessage({
              id: 'newsletter.email',
            }),
          }}
          formLabelProps={{ display: 'none' }}
          error={errors.email}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          variant="solid"
          borderRadius="0 5px 5px 0"
          border="1px"
          borderColor="primary.500"
          height="10"
          mx="0 !important"
          px="sm"
          py="xxs"
          fontSize="base"
          _hover={{
            border: '1px',
            borderColor: 'primary.500',
          }}
          onClick={handleSubmitClick}
        >
          {intl.formatMessage({ id: 'newsletter.button' })}
        </Button>
      </Stack>
      {formSubmittedMessage && formSubmittedMessage?.length > 0 && (
        <Alert
          w="100%"
          mt="mobile"
          variant="left-accent"
          justifyContent="space-between"
          status="success"
        >
          <Flex>
            <AlertIcon />
            <AlertDescription>{formSubmittedMessage}</AlertDescription>
          </Flex>
          <SmallCloseIcon
            alignSelf={'center'}
            marginLeft={6}
            cursor={'pointer'}
            onClick={closeMessage}
          />
        </Alert>
      )}
    </Box>
  )
}

const newsletterFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.emailRequired' })),
  })
}
