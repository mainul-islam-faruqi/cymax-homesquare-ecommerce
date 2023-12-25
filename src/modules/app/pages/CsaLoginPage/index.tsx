import {
  Alert,
  Box,
  Button,
  Container,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useInputFocus } from '@modules/app/hooks'
import { paths } from '@modules/app/paths'
import { useToast } from '@modules/ui'
import { useUser } from '@myplanetdigital/elasticpath'
import { InputField, PasswordField } from '@myplanetdigital/ui'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IntlShape, useIntl } from 'react-intl'
import * as yup from 'yup'
import { useCsa } from './hooks'

export type FormData = {
  email: string
  password: string
}

export const CsaLoginPage = () => {
  const intl = useIntl()
  const { textFieldFocusFX } = useInputFocus()
  const { customer, isLoading } = useUser()
  const [triggerToast, setTriggerToast] = useState(true)
  const router = useRouter()
  const toast = useToast()

  const title = intl.formatMessage({ id: 'account.login.title' })
  const { login, token, isLoading: isLoadingCsa, isLoadingLogin } = useCsa()

  useEffect(() => {
    if (!isLoading) {
      if (token || customer) {
        triggerToast
          ? toast({
              position: 'top',
              status: 'warning',
              description: intl.formatMessage({
                id: 'csa.validation.customer.login',
              }),
            })
          : null
        router.push(paths.HOME)
      }
    }
  }, [isLoading, token, customer])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(loginFormSchema({ intl })),
    mode: 'onTouched',
  })

  const handleCsaLogin = async (values: FormData) => {
    if (token) {
      return
    }

    setTriggerToast(false) //Avoid toast message when a CSA logs.
    try {
      await login.mutateAsync(values)
      toast({
        position: 'top',
        status: 'success',
        description: intl.formatMessage({
          id: 'csa.login.success',
        }),
      })
      router.push(paths.HOME)
      reset()
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoadingCsa) {
    return null
  }

  return (
    <Flex
      w="100%"
      direction={{ base: 'column', xl: 'row', lg: 'row' }}
      background="shading.100"
      gap={{ base: 5, md: 10 }}
      padding={{ base: 5, md: 10 }}
      justifyContent="center"
      alignItems="center"
    >
      <Container
        maxW="660px"
        background="theme.background"
        p={{ base: 5, md: 10 }}
        margin={0}
      >
        <Text
          as="h2"
          mb={5}
          fontWeight="extrabold"
          fontSize={{ base: 'mobile.md', md: 'desktop.md' }}
        >
          {title}
        </Text>
        <Box as="form" onSubmit={handleSubmit(handleCsaLogin)}>
          <Stack
            spacing={6}
            direction="column"
            sx={{
              label: {
                fontWeight: 'extrabold',
                fontSize: 'desktop.body',
              },
              input: {
                fontSize: 'desktop.body',
                _focus: { ...textFieldFocusFX },
              },
            }}
          >
            <InputField
              label={intl.formatMessage({ id: 'account.login.label.email' })}
              inputProps={{
                ...register('email'),
                placeholder: intl.formatMessage({
                  id: 'address.emailHint',
                }),
              }}
              error={errors.email}
            />
            <PasswordField
              label={intl.formatMessage({ id: 'account.login.label.password' })}
              inputProps={{
                ...register('password'),
                placeholder: intl.formatMessage({
                  id: 'validation.passwordRequired',
                }),
              }}
              error={errors.password}
            />
          </Stack>
          <Box>
            {login.isError && (
              <Alert mt={8} status="error">
                {intl.formatMessage({
                  id: 'account.login.error.incorrectSignIn',
                })}
              </Alert>
            )}
          </Box>
          <Box mt={8} display="flex" justifyContent="center">
            <Button
              type="submit"
              disabled={isLoadingLogin || isSubmitting}
              isLoading={isLoadingLogin}
              width="100%"
              _hover={{ background: 'primary.500' }}
              fontSize="desktop.body"
              height={12}
            >
              {intl.formatMessage({ id: 'action.login' })}
            </Button>
          </Box>
        </Box>
      </Container>
    </Flex>
  )
}

const loginFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.emailRequired' })),

    password: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.passwordRequired' })),
  })
}
