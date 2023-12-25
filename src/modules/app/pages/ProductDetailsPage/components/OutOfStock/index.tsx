import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { KLAVIYO_BACK_IN_STOCK_LIST_ID } from '@modules/app/constants'
import { useInputFocus } from '@modules/app/hooks'
import { handleEmailToKlaviyo } from '@modules/app/utils'
import { useUser } from '@myplanetdigital/elasticpath'
import { InputField } from '@myplanetdigital/ui'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaCheckCircle } from 'react-icons/fa'
import { IntlShape, useIntl } from 'react-intl'
import * as yup from 'yup'

type OutOfStockProps = {
  productId?: string
}

export const OutOfStock = ({ productId }: OutOfStockProps) => {
  const intl = useIntl()
  const toast = useToast()
  const router = useRouter()
  const { customer } = useUser()
  const [success, setSuccess] = useState(false)
  const { textFieldFocusFX } = useInputFocus()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{
    email: string
  }>({
    resolver: yupResolver(registerFormSchema({ intl })),
    mode: 'onTouched',
  })

  const onSubmit = async (data: { email: string }) => {
    try {
      const formattedEmail = handleEmailToKlaviyo(data?.email)
      const body = [
        {
          email: formattedEmail,
          product_id: productId,
          customer_id: customer?.id,
          orginalEmail: data?.email,
        },
      ]

      const res = await axios.post(
        `/api/klaviyo/subscribe-list/${KLAVIYO_BACK_IN_STOCK_LIST_ID}`,
        body
      )
      if (res?.status === 200) {
        setSuccess(true)
      } else {
        toast({
          status: 'error',
          position: 'top',
          description: intl.formatMessage({
            id: 'outOfStock.submitErrorMessage',
          }),
        })
      }
    } catch (error) {
      setSuccess(false)
      toast({
        status: 'error',
        position: 'top',
        description: intl.formatMessage({
          id: 'outOfStock.submitErrorMessage',
        }),
      })
    }
  }

  const showOutStockForm = useCallback(() => {
    setSuccess(false)
    reset()
  }, [setSuccess, reset])

  useEffect(() => {
    router.events.on('routeChangeStart', showOutStockForm)
    return () => router.events.off('routeChangeStart', showOutStockForm)
  }, [showOutStockForm, router.events])

  return (
    <Box mb={7} p={6} bg="shading.100">
      <Text as="h6" fontWeight="700" fontSize="xl">
        {intl.formatMessage({ id: 'outOfStock.title' })}
      </Text>
      <Text as="p" mb={1} pt={2} fontSize="base">
        {intl.formatMessage({
          id: success
            ? 'outOfStock.subtitleAfterSendEmail'
            : 'outOfStock.subtitle',
        })}
      </Text>
      {success ? (
        <Flex
          mt={5}
          px="3"
          py="4"
          bg="success.100"
          borderRadius="6px"
          alignItems="center"
        >
          <Box w="5">
            <FaCheckCircle color="#38A169" size={20} />
          </Box>
          <Text ml={4}>
            {intl.formatMessage({ id: 'outOfStock.requestReceived' })}
          </Text>
        </Flex>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label=""
            inputProps={{
              ...register('email'),
              _focus: {
                ...textFieldFocusFX,
                borderColor: 'primary.500',
              },
              placeholder: intl.formatMessage({
                id: 'outOfStock.emailPlaceholder',
              }),
              defaultValue: customer?.email ?? '',
            }}
            error={errors.email}
          />
          <Button
            mt={4}
            size="xl"
            width="100%"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            colorScheme="shading.900"
            fontSize="desktop.body"
          >
            {intl.formatMessage({ id: 'outOfStock.button' })}
          </Button>
        </form>
      )}
    </Box>
  )
}

const registerFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.emailRequired' })),
  })
}
