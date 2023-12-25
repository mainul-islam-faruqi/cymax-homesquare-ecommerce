import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectField, useInputFocus } from '@modules/app'
import { useCustomerName } from '@modules/app/hooks/useCustomerName'
import { EpCustomAddressInterface } from '@modules/app/pages/AccountAddressPage/components/addressOneForm/types'
import { formatPhone, phoneRegisterWithFormatting } from '@modules/app/utils'
import {
  COUNTRIES,
  INDUSTRIES,
  ResidentialRadio,
  STATES,
  useMultiPageCheckout,
} from '@modules/checkout'
import { useCustomerAddress } from '@modules/checkout/hooks/useCustomerAddress'
import { useCart } from '@modules/ep'
import { useToast } from '@modules/ui'
import { InputField } from '@myplanetdigital/ui'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import {
  DeliveryComponentProps,
  DeliveryForm,
  registerDeliveryFormSchema,
} from './types'

const SAVED_ADDRESS_KEY = 'SAVED'
const NEW_ADDRESS_KEY = 'NEW'

export const DeliveryComponent: React.FC<DeliveryComponentProps> = ({
  data,
  saveData,
  cartId,
  customer,
}) => {
  const [nextPageLoading, setNextPageLoading] = useState(false)
  const intl = useIntl()
  const OPTIONAL = intl.formatMessage({
    id: 'form.field.optional',
  })
  const { cart } = useCart()
  const router = useRouter()
  const { textFieldFocusFX, selectFocusFX } = useInputFocus()
  const [addressValue, setAddressValue] = useState<string>(
    customer ? SAVED_ADDRESS_KEY : NEW_ADDRESS_KEY
  )
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const toast = useToast()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<DeliveryForm>({
    resolver: yupResolver(
      registerDeliveryFormSchema(
        { intl },
        addressValue == SAVED_ADDRESS_KEY && !isEdit
      )
    ),
    mode: 'onBlur',
    defaultValues: {
      ...(data?.delivery || {}),
      phone_number: formatPhone(data?.delivery?.phone_number),
    },
  })

  const { customerAddress } = useCustomerAddress()
  const [customerAddressFields, setCustomerAddressFields] = React.useState<
    EpCustomAddressInterface | undefined
  >(customerAddress?.data?.[0] as EpCustomAddressInterface)
  const { checkoutData } = useMultiPageCheckout()

  const watchIsCommercial = watch('isCommercial', false)

  useEffect(() => {
    if (customerAddress) {
      reset(
        data?.delivery && data?.delivery?.line_1
          ? data?.delivery
          : (customerAddress.data[0] as EpCustomAddressInterface)
      )
      setCustomerAddressFields(
        data?.delivery && data?.delivery?.line_1
          ? data?.delivery
          : (customerAddress.data[0] as EpCustomAddressInterface)
      )
    }

    if (customerAddressFields?.isCommercial) {
      setValue(
        'isCommercial',
        customerAddressFields?.isCommercial ||
          checkoutData.delivery?.isCommercial
      )
    }

    customerAddress?.data?.[0]
      ? setAddressValue(SAVED_ADDRESS_KEY)
      : setAddressValue(NEW_ADDRESS_KEY)
  }, [customerAddress])

  const { firstName, lastName } = useCustomerName()
  const onSubmit: SubmitHandler<DeliveryForm> = async (
    formData: DeliveryForm
  ) => {
    const customerName = customer
      ? `${firstName} ${lastName}`
      : `${formData.first_name} ${formData.last_name}`
    // Save info to localstorage

    const delivery: EpCustomAddressInterface = {
      type: 'address',
      city:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.city as string)
          : (formData.city as string),
      country:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.country as string)
          : (formData.country as string),
      county:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.county as string)
          : (formData.county as string),
      instructions:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.instructions as string)
          : (formData.instructions as string),
      line_1:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.line_1 as string)
          : (formData.line_1 as string),
      line_2:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.line_2 as string)
          : (formData.line_2 as string),
      first_name:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.first_name as string)
          : (formData.first_name as string),
      last_name:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.last_name as string)
          : (formData.last_name as string),
      phone_number:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.phone_number as string)
          : (formData.phone_number as string),
      postcode:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.postcode as string)
          : (formData.postcode as string),
      isCommercial:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.isCommercial as boolean)
          : (formData.isCommercial as boolean),
      company_name:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.company_name as string)
          : (formData.company_name as string),
      industry:
        addressValue === SAVED_ADDRESS_KEY && !isEdit
          ? (customerAddressFields?.industry as string)
          : (formData.industry as string),
    }

    saveData({
      ...data,
      customer: {
        email: formData.email,
        name:
          addressValue === SAVED_ADDRESS_KEY
            ? customerAddressFields?.first_name +
              ' ' +
              customerAddressFields?.last_name
            : customerName,
        authentication_mechanism: customer?.authentication_mechanism,
        id: customer?.id,
      },
      delivery: delivery,
    })
    // taxjar - Errors here shouldn't block the order placement
    if (!isEdit) {
      try {
        await axios.post(`/api/taxjar`, {
          cartId,
          shippingAddress: {
            country: delivery.country,
            zip: delivery.postcode,
            city: delivery.city,
            jurisdiction: delivery.county,
            line1: delivery.line_1,
          },
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error while requesting tax updates', e)
      }
      await router.push('/checkout/payment-information')
    } else {
      setIsEdit(false)
      setCustomerAddressFields(delivery)
      toast({
        status: 'success',
        description: intl.formatMessage({
          id: 'address.update.success.message',
        }),
      })
    }
  }

  // Cancel edit form if user start editing and changes to use custom address.
  const setCustomAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == NEW_ADDRESS_KEY) {
      setIsEdit(false)
    }
  }

  const EXCLUDED_STATES = ['AK', 'HI', 'PR']

  // Address form so we can render it conditionally.
  const newAddressForm = (
    <Stack
      w="100%"
      spacing="4"
      sx={{
        input: {
          _focus: { ...textFieldFocusFX, borderColor: 'primary.500' },
        },
      }}
    >
      <Stack spacing="4" direction={{ base: 'column', md: 'row' }}>
        <InputField
          label={`${intl.formatMessage({
            id: 'address.firstNameTitle',
          })}*`}
          inputProps={{
            ...register('first_name'),
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
            ...register('county'),
            _focus: { ...selectFocusFX },
            placeholder: intl.formatMessage({
              id: 'address.dropdownHint',
            }),
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
          }}
          error={errors.postcode}
        />
        <SelectField
          label={`${intl.formatMessage({
            id: 'address.countryTitle',
          })}*`}
          selectProps={{
            ...register('country'),
            placeholder: intl.formatMessage({
              id: 'address.dropdownHint',
            }),
            _focus: { ...selectFocusFX },
            defaultValue:
              addressValue === SAVED_ADDRESS_KEY
                ? customerAddressFields?.country
                : undefined,
          }}
          options={COUNTRIES}
          error={errors.country}
        />
      </Stack>
      <InputField
        label={intl.formatMessage({
          id: 'address.instructionsTitle',
        })}
        inputProps={register('instructions')}
        error={errors?.instructions}
      />
      <ResidentialRadio
        label={intl.formatMessage({
          id: 'address.addressType',
        })}
        value={watchIsCommercial}
        setValue={(value) => setValue('isCommercial', value)}
      />
      {watchIsCommercial && (
        <Stack spacing="4" direction={{ base: 'column', md: 'row' }}>
          <InputField
            label={`${intl.formatMessage({
              id: 'address.companyTitle',
            })}*`}
            inputProps={register('company_name')}
            error={errors.company_name}
          />
          <SelectField
            label={`${intl.formatMessage({
              id: 'address.industryTitle',
            })}*`}
            options={INDUSTRIES}
            selectProps={{
              ...register('industry'),
              placeholder: intl.formatMessage({
                id: 'address.dropdownHint',
              }),
              _focus: { ...selectFocusFX },
            }}
            error={errors.industry}
          />
        </Stack>
      )}
    </Stack>
  )

  return (
    <Box>
      <Heading fontSize={{ base: '24', md: '32' }}>
        {intl.formatMessage({ id: 'checkout.delivery.title' })}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          position="relative"
          px="6"
          py={{ base: '8', md: '10' }}
          backgroundColor="theme.background"
          mt={{ base: '6', md: '8' }}
          sx={{
            label: {
              fontWeight: 'extrabold',
              fontSize: 'desktop.body',
            },
            input: {
              fontSize: 'desktop.body',
              borderColor: 'theme.muted',
              _focus: { ...textFieldFocusFX, borderColor: 'primary.500' },
            },
          }}
        >
          <Heading fontSize="desktop.bodyXL" mb={{ base: '0', md: '4' }}>
            {intl.formatMessage({ id: 'address.guestForm.title' })}
          </Heading>
          <Text
            position={{ base: 'static', md: 'absolute' }}
            top={{ base: '0', md: '6' }}
            right={{ base: '0', md: '6' }}
            mb={{ base: '5', md: '0' }}
            color="theme.textMuted"
            fontSize="desktop.bodySM"
          >
            {intl.formatMessage({ id: 'form.required' })}
          </Text>
          <InputField
            label={intl.formatMessage({
              id: 'checkout.shipping.form.input.email',
            })}
            inputProps={{
              ...register('email'),
              placeholder: intl.formatMessage({ id: 'address.emailHint' }),
              defaultValue: customer
                ? customer.email
                : checkoutData?.customer?.email,
            }}
            error={errors.email}
          />
          <Text color="shading.600" fontSize="desktop.bodySM" pt="2">
            {intl.formatMessage({ id: 'address.guestForm.emailExplanation' })}
          </Text>
        </Box>
        {/* Address section */}
        <Box
          position="relative"
          py="8"
          px="6"
          backgroundColor="theme.background"
          mt="8"
          sx={{
            label: {
              fontWeight: 'extrabold',
              fontSize: 'desktop.body',
            },
            input: {
              fontSize: 'desktop.body',
              _focus: {
                borderColor: 'theme.dark.background',
                color: 'theme.dark.background',
                boxShadow: '0 0 0 1px',
              },
            },
          }}
        >
          {(customerAddressFields?.line_1 || checkoutData?.delivery?.line_1) &&
          customer &&
          !nextPageLoading ? (
            <>
              <Heading fontSize="2xl" mb={{ base: '0', md: '4' }}>
                {intl.formatMessage({ id: 'address.shipping.title' })}
              </Heading>
              <Text
                position={{ base: 'static', md: 'absolute' }}
                top={{ base: 0, md: 6 }}
                right={{ base: 0, md: 6 }}
                mb={{ base: 5, md: 0 }}
                color="theme.textMuted"
                fontSize="sm"
              >
                {intl.formatMessage({ id: 'form.required' })}
              </Text>
              <RadioGroup
                onChange={(newVal) => setAddressValue(newVal)}
                value={addressValue}
                mt={1}
              >
                <Stack mt="10" spacing="3">
                  <Flex
                    key={SAVED_ADDRESS_KEY}
                    p="4"
                    direction={'column'}
                    borderWidth="1px"
                    borderColor="shading.200"
                    w="100%"
                  >
                    <Flex
                      justifyContent="space-between"
                      w="100%"
                      alignItems="start"
                    >
                      <Flex
                        w="100%"
                        alignItems="start"
                        justifyContent={isEdit ? 'flex-start' : 'space-between'}
                      >
                        <Radio
                          key={SAVED_ADDRESS_KEY}
                          value={SAVED_ADDRESS_KEY}
                          colorScheme="primary"
                          _focus={{ boxShadow: 'none' }}
                          size="lg"
                          fontSize="desktop.body"
                          ml="1"
                        />
                        {isEdit && (
                          <Text
                            fontSize={{ base: 'sm', md: 'desktop.body' }}
                            fontWeight={'semibold'}
                            ml={3.5}
                          >
                            {intl.formatMessage({
                              id: 'checkout.delivery.editAddress',
                            })}
                          </Text>
                        )}
                        {!isEdit && (
                          <Flex direction={'column'} w="100%" ml={3.5}>
                            <Flex
                              as="p"
                              fontSize={{ base: 'sm', md: 'desktop.body' }}
                              w="100%"
                              alignItems="start"
                              justifyContent="space-between"
                            >
                              {checkoutData?.delivery?.first_name ||
                                customerAddressFields?.first_name}{' '}
                              {checkoutData?.delivery?.last_name ||
                                customerAddressFields?.last_name}
                            </Flex>
                            <Flex
                              as="p"
                              fontSize={{ base: 'sm', md: 'desktop.body' }}
                              w="100%"
                              alignItems="start"
                              justifyContent="space-between"
                            >
                              {checkoutData?.delivery?.line_1 ||
                                customerAddressFields?.line_1}{' '}
                              {checkoutData?.delivery?.line_2 ||
                                customerAddressFields?.line_2}
                            </Flex>
                            <Flex
                              as="p"
                              fontSize={{ base: 'sm', md: 'desktop.body' }}
                              w="100%"
                              alignItems="start"
                              justifyContent="space-between"
                            >
                              {checkoutData?.delivery?.city ||
                                customerAddressFields?.city}
                              {', '}
                              {checkoutData?.delivery?.county ||
                                customerAddressFields?.county}{' '}
                              {checkoutData?.delivery?.postcode ||
                                customerAddressFields?.postcode}
                            </Flex>
                            <Flex
                              as="p"
                              fontSize={{ base: 'sm', md: 'desktop.body' }}
                              w="100%"
                              alignItems="start"
                              justifyContent="space-between"
                            >
                              {intl.formatMessage({
                                id: 'checkout.delivery.phone',
                              })}
                              {': '}
                              {checkoutData?.delivery?.phone_number ||
                                customerAddressFields?.phone_number}
                            </Flex>
                          </Flex>
                        )}
                      </Flex>
                      {!isEdit && (
                        <Button
                          type="button"
                          variant="link"
                          fontSize="desktop.bodySM"
                          color="theme.text"
                          fontWeight="700"
                          padding="0"
                          onClick={() => {
                            setIsEdit(true)
                          }}
                          _hover={{ textDecoration: 'none' }}
                          borderBottomWidth="1px"
                          borderBottomColor="theme.text"
                          minWidth="auto"
                          textDecoration="none"
                        >
                          {intl.formatMessage({ id: 'action.edit' })}
                        </Button>
                      )}
                    </Flex>
                    {isEdit && (
                      <Flex
                        direction={'column'}
                        w="100%"
                        marginTop={isMobile ? 4 : 0}
                        paddingInline={isMobile ? 0 : 6}
                        borderTopWidth="1px"
                        borderTopColor={
                          isMobile ? 'shading.200' : 'transparent'
                        }
                      >
                        <Flex
                          justifyContent="space-between"
                          paddingTop={6}
                          w="100%"
                        >
                          {newAddressForm}
                        </Flex>
                        <Flex
                          flexDirection={isMobile ? 'column' : 'row'}
                          justifyContent="flex-end"
                          alignItems="center"
                          paddingTop={6}
                        >
                          <Button
                            type="submit"
                            height="40px"
                            width={isMobile ? '100%' : '100px'}
                            fontSize="desktop.bodySM"
                          >
                            {intl.formatMessage({ id: 'action.save' })}
                          </Button>
                          <Button
                            type="button"
                            marginTop={isMobile ? 4 : 0}
                            marginLeft={isMobile ? 0 : 6}
                            variant="link"
                            fontSize="desktop.bodySM"
                            color="shading.900"
                            fontWeight="700"
                            padding="0"
                            onClick={() => {
                              setIsEdit(false)
                            }}
                            size="sm"
                            _hover={{ textDecoration: 'none' }}
                            minWidth="auto"
                          >
                            {intl.formatMessage({ id: 'action.cancel' })}
                          </Button>
                        </Flex>
                      </Flex>
                    )}
                  </Flex>
                  <Flex
                    key={NEW_ADDRESS_KEY}
                    p="4"
                    direction={'column'}
                    borderWidth="1px"
                    borderColor="shading.200"
                  >
                    <Flex w="100%" alignItems="center" justifyContent="start">
                      <Radio
                        key={NEW_ADDRESS_KEY}
                        value={NEW_ADDRESS_KEY}
                        colorScheme="primary"
                        _focus={{ boxShadow: 'none' }}
                        _checked={{
                          borderColor: 'primary.500',
                          borderWidth: '6px',
                        }}
                        size="lg"
                        fontSize="desktop.body"
                        ml="1"
                        onChange={(e) => {
                          setCustomAddress(e)
                        }}
                      />
                      <Text
                        fontSize={{ base: 'sm', md: 'desktop.body' }}
                        fontWeight={'semibold'}
                        ml={3.5}
                      >
                        {intl.formatMessage({ id: 'address.shipping.new' })}
                      </Text>
                    </Flex>
                    <Flex
                      justifyContent="space-between"
                      paddingTop={6}
                      display={
                        addressValue === NEW_ADDRESS_KEY ? 'block' : 'none'
                      }
                    >
                      {!isEdit && newAddressForm}
                    </Flex>
                  </Flex>
                </Stack>
              </RadioGroup>
            </>
          ) : (
            // No selector, only delivery form
            <>
              <Heading fontSize="desktop.bodyXL" mb={{ base: '0', md: '4' }}>
                {intl.formatMessage({ id: 'address.shipping.title' })}
              </Heading>
              <Text
                position={{ base: 'static', md: 'absolute' }}
                top={{ base: '0', md: '6' }}
                right={{ base: '0', md: '6' }}
                mb={{ base: '5', md: '0' }}
                color="shading.600"
                fontSize="desktop.bodySM"
              >
                {intl.formatMessage({ id: 'form.required' })}
              </Text>
              {newAddressForm}
            </>
          )}
        </Box>
        <Button
          mt="5"
          p="6"
          variant="solid"
          isLoading={isSubmitting}
          type="submit"
          w={{ base: '100%', md: 'inherit' }}
          onClick={() => {
            if (
              !(
                (customerAddressFields?.line_1 ||
                  checkoutData?.delivery?.line_1) &&
                customer
              )
            ) {
              setNextPageLoading(true)
            }
          }}
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
          {intl.formatMessage({ id: 'checkout.delivery.continueToPayment' })}
        </Button>
      </form>
    </Box>
  )
}
