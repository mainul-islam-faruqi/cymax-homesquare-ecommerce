import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Link,
  Radio,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  NEXT_PUBLIC_PAYMENT_TOGGLE_AFFIRM,
  NEXT_PUBLIC_PAYMENT_TOGGLE_AMAZONPAY,
  NEXT_PUBLIC_PAYMENT_TOGGLE_OPENPATH,
  NEXT_PUBLIC_PAYMENT_TOGGLE_PAYPAL,
  paths,
  SelectField,
  useInputFocus,
} from '@modules/app'
import { AmazonPayButton } from '@modules/checkout'
import {
  MultiPageCheckoutData,
  useAffirmPayment,
  useAuthorizedPayment,
  useMultiPageCheckout,
  usePaypalPayment,
} from '@modules/checkout/hooks'
import { EpCustomerInterface, useCart } from '@modules/ep'

import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { formatPhone, phoneRegisterWithFormatting } from '@modules/app/utils'
import { useUser } from '@myplanetdigital/elasticpath'
import { InputField } from '@myplanetdigital/ui'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { COUNTRIES, STATES } from '../AddressForms'
import { ReturnPolicy } from './ReturnPolicy'
import { PaymentForm, PaymentMethod, registerPaymentFormSchema } from './types'

const EXCLUDED_STATES = ['PR']

const formDataWithEmptyValues = {
  first_name: '',
  last_name: '',
  phone_number: '',
  line_1: '',
  line_2: '',
  city: '',
  county: '',
  postcode: '',
  country: '',
}

export const Payment: React.FC = () => {
  const router = useRouter()
  const intl = useIntl()
  const toast = useToast()

  const { cartId, cart } = useCart()
  const { checkoutData: data, placeOrder } = useMultiPageCheckout()

  const { customer: composableCustomer } = useUser()
  const { token: csaToken } = useCsa()
  const customer: EpCustomerInterface | null | undefined = composableCustomer

  const { textFieldFocusFX, selectFocusFX } = useInputFocus()

  const [orderButtonActive, setOrderButtonActive] = useState(true)
  const { paypalPayment } = usePaypalPayment()
  const { isProcessing, affirmPayment, affirmSuccess } = useAffirmPayment()
  const { authorizedPayment } = useAuthorizedPayment()

  const OPTIONAL = intl.formatMessage({
    id: 'form.field.optional',
  })

  const defaultValues = {
    sameAsShipping: true,
    ...data?.payment,
    method: 'openPath',
  }

  const defaultInputValues = data?.delivery || formDataWithEmptyValues
  const phoneDefaultInputValues =
    formatPhone(data?.delivery?.phone_number) ||
    formDataWithEmptyValues.phone_number

  const { isCommercial, industry } = data?.delivery || {}

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PaymentForm>({
    resolver: yupResolver(registerPaymentFormSchema({ intl })),
    defaultValues,
  })
  const watchSameAsShipping = watch('sameAsShipping', true)
  const watchMethod = watch('method', '')

  const onSubmit = async (formData: PaymentForm) => {
    const { customer: customerData, ...rest } = data

    const orderData = {
      ...rest,
      customer: customer ? { id: customer?.id } : customerData,
      contact: { email: customerData?.email || customer?.email },
      payment: {
        ...formData,
      },
      flows: {
        ...data?.flows,
        payment_method: formData.method,
        referral: localStorage.getItem('referral') ?? 'direct',
        isCSA: Boolean(csaToken),
      },
    } as MultiPageCheckoutData

    setOrderButtonActive(false)

    await placeOrder.mutate(
      {
        cartId,
        data: orderData,
      },
      {
        onSuccess: async (order: any) => {
          switch (formData.method) {
            case 'paypal':
              // Save authorize in EP and redirect to Paypal
              await paypalPayment.mutate({ order })
              break
            case 'openPath':
              // Redirect to credit card page
              router.push(paths.OPEN_PATH_FORM)
              break
            case 'affirm':
              await affirmPayment({ order })
              break
            default:
              // Set PO or CSA payments as authorized
              await authorizedPayment.mutateAsync({ order })
              router.push('/checkout/order-confirmation')
              break
          }
        },
        onError: (err) => {
          setOrderButtonActive(true)
          toast({ status: 'error', title: 'Error', description: `${err}` })
        },
      }
    )
  }

  const methods = useMemo(() => {
    return [
      {
        isAvailable: NEXT_PUBLIC_PAYMENT_TOGGLE_OPENPATH,
        key: 'openPath',
        title: intl.formatMessage({ id: 'checkout.cardOptionTitle' }),
        imgURL: null,
      },
      {
        isAvailable: NEXT_PUBLIC_PAYMENT_TOGGLE_PAYPAL,
        key: 'paypal',
        title: intl.formatMessage({ id: 'checkout.paypalTitle' }),
        imgURL: '/img/paypal.svg',
      },
      {
        isAvailable: NEXT_PUBLIC_PAYMENT_TOGGLE_AMAZONPAY,
        key: 'amazon',
        title: intl.formatMessage({ id: 'checkout.amazonPayTitle' }),
        imgURL: '/img/amazon.svg',
      },
      {
        isAvailable:
          NEXT_PUBLIC_PAYMENT_TOGGLE_AFFIRM && Boolean((window as any).affirm),
        key: 'affirm',
        title: intl.formatMessage({ id: 'checkout.affirmTitle' }),
        imgURL: '/img/affirm.svg',
      },
      {
        isAvailable: isCommercial && industry,
        key: 'po',
        title: intl.formatMessage({ id: 'checkout.poTitle' }),
        imgURL: null,
        description:
          watchMethod === PaymentMethod.PO ? (
            <Text
              as="span"
              fontSize="desktop.body"
              color={'shading.400'}
              ml="1"
              fontWeight="normal"
              px="7"
              py="2"
            >
              {intl.formatMessage({ id: 'Payment.poLine1' })}
              <br />
              {intl.formatMessage({ id: 'Payment.poLine2' })}
              <br />
              <Link
                color={'blackAlpha.900'}
                href="\ordering-information-paymentoptions"
                target="_blank"
              >
                {intl.formatMessage({ id: 'checkout.learnMore' })}
              </Link>
            </Text>
          ) : null,
      },
      {
        isAvailable: Boolean(csaToken),
        key: 'Pre-Authorized',
        title: intl.formatMessage({ id: 'checkout.preAuthorizationTitle' }),
        imgURL: null,
      },
    ]
  }, [intl, watchMethod, customer, csaToken])

  router.events.on('hashChangeComplete', () => {
    setOrderButtonActive(true)
  })

  useEffect(() => {
    const handlePageShow = () => {
      setOrderButtonActive(true)
    }

    /**
     * This is a workaround for the issue with the back button on Safari
     */
    window.addEventListener('pageshow', handlePageShow)

    return () => {
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="purchases">
      {/* Heading */}

      <Heading fontSize={{ base: '24', md: '32' }}>
        {intl.formatMessage({ id: 'checkout.payment.title' })}
      </Heading>

      {/* Payment Methods */}
      <Box bg="theme.background" py="8" px="6" mt="8">
        <Text
          fontSize={{ base: 'mobile.bodyXL', md: 'desktop.bodyXL' }}
          fontWeight="extrabold"
          pb={6}
        >
          {intl.formatMessage({ id: 'checkout.paymentMethod.title' })}
        </Text>
        <Stack spacing="3">
          {methods
            .filter((method) => method.isAvailable)
            .map((method) => (
              <Flex
                key={method.key}
                p="4"
                direction={'column'}
                borderWidth="1px"
                borderColor="shading.200"
              >
                <Flex justifyContent="space-between">
                  <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Radio
                      isChecked={(watchMethod as string) === method.key}
                      {...register('method')}
                      value={method.key}
                      _focus={{ boxShadow: 'none' }}
                      _checked={{
                        borderColor: 'primary.500',
                        borderWidth: '6px',
                      }}
                      size="lg"
                      fontSize="desktop.body"
                      ml="1"
                    >
                      <Text
                        as="span"
                        fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
                      >
                        {method.title}
                      </Text>
                    </Radio>
                  </Flex>
                  {method.imgURL && (
                    <Image
                      src={method.imgURL}
                      height="24px"
                      width="24px"
                      alt={`${method.title} logo`}
                    />
                  )}
                </Flex>
                {method.description}
              </Flex>
            ))}
        </Stack>
      </Box>
      {
        watchMethod != PaymentMethod.AMAZON && (
          <Box
            position="relative"
            py="10"
            px="6"
            backgroundColor="theme.background"
            mt="6"
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
            <Heading fontSize="2xl" mb={{ base: '0', md: '6' }}>
              {intl.formatMessage({ id: 'address.billing.title' })}
            </Heading>
            <Text
              position={{ base: 'static', md: 'absolute' }}
              top={{ base: 0, md: 5 }}
              right={{ base: 0, md: 6 }}
              mb={{ base: 6, md: 0 }}
              color="shading.600"
              fontSize="sm"
            >
              {intl.formatMessage({ id: 'form.required' })}
            </Text>
            <Stack spacing="4">
              <Checkbox
                colorScheme="primary"
                size="lg"
                rounded="xs"
                {...register('sameAsShipping')}
              >
                <Text fontSize="desktop.body" ml="1" fontWeight="normal">
                  {intl.formatMessage({ id: 'address.isSameAsShipping' })}
                </Text>
              </Checkbox>
              {!watchSameAsShipping && (
                <>
                  <Stack spacing="4" direction={{ base: 'column', md: 'row' }}>
                    <InputField
                      label={`${intl.formatMessage({
                        id: 'address.firstNameTitle',
                      })}*`}
                      inputProps={{
                        ...register('first_name'),
                        defaultValue: defaultInputValues['first_name'],
                        placeholder: intl.formatMessage({
                          id: 'address.firstNameHint',
                        }),
                      }}
                      error={errors.first_name}
                    />
                    <InputField
                      label={`${intl.formatMessage({
                        id: 'address.lastNameTitle',
                      })}*`}
                      inputProps={{
                        ...register('last_name'),
                        defaultValue: defaultInputValues['last_name'],
                        placeholder: intl.formatMessage({
                          id: 'address.lastNameHint',
                        }),
                      }}
                      error={errors.last_name}
                    />
                  </Stack>
                  <InputField
                    label={`${intl.formatMessage({
                      id: 'address.phoneNumberTitle',
                    })}*`}
                    inputProps={{
                      ...register('phone_number'),
                      onChange: phoneRegisterWithFormatting({
                        setValue,
                        phoneKey: 'phone_number',
                      }),
                      defaultValue: phoneDefaultInputValues,
                      placeholder: intl.formatMessage({
                        id: 'cart.phoneNumber.placeholder',
                      }),
                    }}
                    error={errors?.phone_number}
                  />
                  <InputField
                    label={`${intl.formatMessage({
                      id: 'account.register.label.addressLineOne',
                    })}*`}
                    inputProps={{
                      ...register('line_1'),
                      defaultValue: defaultInputValues['line_1'],
                      placeholder: intl.formatMessage({
                        id: 'address.line1Hint',
                      }),
                    }}
                    error={errors.line_1}
                  />
                  <InputField
                    label={
                      intl.formatMessage({
                        id: 'account.register.label.addressLineTwo',
                      }) + OPTIONAL
                    }
                    inputProps={{
                      ...register('line_2'),
                      defaultValue: defaultInputValues['line_2'],
                      placeholder: intl.formatMessage({
                        id: 'address.line2Hint',
                      }),
                    }}
                    error={errors.line_2}
                  />
                  <Stack spacing="4" direction={{ base: 'column', md: 'row' }}>
                    <InputField
                      label={`${intl.formatMessage({
                        id: 'address.cityTitle',
                      })}*`}
                      inputProps={{
                        ...register('city'),
                        defaultValue: defaultInputValues['city'],
                      }}
                      error={errors.city}
                    />
                    <SelectField
                      label={`${intl.formatMessage({
                        id: 'address.stateTitle',
                      })}*`}
                      options={STATES?.['US'].filter(
                        (x) => !EXCLUDED_STATES.includes(x.value)
                      )}
                      selectProps={{
                        placeholder: intl.formatMessage({
                          id: 'address.dropdownHint',
                        }),
                        ...register('county'),
                        defaultValue: defaultInputValues['county'],
                        _focus: {
                          ...selectFocusFX,
                        },
                      }}
                      error={errors.county}
                    />
                  </Stack>
                  <Stack spacing="4" direction={{ base: 'column', md: 'row' }}>
                    <InputField
                      label={`${intl.formatMessage({
                        id: 'address.postCodeTitle',
                      })}*`}
                      inputProps={{
                        ...register('postcode'),
                        defaultValue: defaultInputValues['postcode'],
                      }}
                      error={errors.postcode}
                    />

                    <SelectField
                      label={`${intl.formatMessage({
                        id: 'address.countryTitle',
                      })}*`}
                      options={COUNTRIES}
                      selectProps={{
                        placeholder: intl.formatMessage({
                          id: 'address.dropdownHint',
                        }),
                        ...register('country'),
                        defaultValue: defaultInputValues['country'],
                        _focus: {
                          ...selectFocusFX,
                        },
                      }}
                      error={errors.country}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          </Box>
        ) /* End of the billing address box */
      }
      <ReturnPolicy />
      {watchMethod !== PaymentMethod.AMAZON ? (
        <Button
          p="6"
          mt="8"
          variant="solid"
          isLoading={!orderButtonActive || isSubmitting || isProcessing}
          type="submit"
          id={`checkout ${intl.formatMessage({
            id: 'checkout.payment.continueToPayment',
          })}`}
          _hover={{
            _loading: {
              opacity: 1,
              background: 'primary.500',
            },
          }}
          _loading={{
            opacity: 1,
            background: 'primary.500',
          }}
          data-insights-object-id={cart.data?.map((item) => item.id).join(',')}
        >
          {intl.formatMessage({ id: 'checkout.payment.continueToPayment' })}
        </Button>
      ) : (
        <AmazonPayButton
          id="paymentAmazonPayButton"
          buttonProps={{
            w: '230px !important',
            minW: '230px !important',
          }}
          loadingProps={{
            w: '230px !important',
            minW: '230px !important',
          }}
        />
      )}
    </form>
  )
}
