import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectField } from '@modules/app/components'
import { useInputFocus } from '@modules/app/hooks'
import {
  COUNTRIES,
  INDUSTRIES,
  ResidentialRadio,
  STATES,
  useMultiPageCheckout,
} from '@modules/checkout'
import { EpAddressInterface } from '@modules/ep'
import {
  EpAddressResponse,
  getError,
  useAddress,
} from '@myplanetdigital/elasticpath'
import { InputField } from '@myplanetdigital/ui'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { updateAddressFormSchema } from './formSchema'
import {
  ComposableCustomUpdateAddress,
  EpCustomAddressInterface,
  FormData,
  relationsAddressFields,
} from './types'

const REQUIRED = '*'

const EXCLUDED_STATES: { [key: string]: boolean } = {
  AK: true,
  HI: true,
  PR: true,
}

interface AddressFormProps {
  address?: EpAddressInterface
  addressId?: string
}

export const AddressOneForm = ({
  address: composableAddress,
  addressId,
}: AddressFormProps) => {
  let address = composableAddress as EpCustomAddressInterface
  const isMobile = useBreakpointValue({ base: true, md: false })
  const intl = useIntl()
  const toast = useToast()
  const { checkoutData, saveData } = useMultiPageCheckout()
  const { textFieldFocusFX, selectFocusFX } = useInputFocus()

  const { updateAddress: composableUpdateAddress, addAddress } = useAddress({
    onAddressUpdateSuccess(address) {
      const { id, meta, links, name, ...restAddress } =
        address as EpAddressResponse
      if (checkoutData.delivery) {
        saveData({ ...checkoutData, delivery: restAddress })
      }
      toast({
        position: 'top',
        status: 'success',
        description: intl.formatMessage({ id: 'address.update.success' }),
      })
    },
    onAddressUpdateError() {
      toast({
        position: 'top',
        status: 'error',
        description: intl.formatMessage({ id: 'address.update.error' }),
      })
    },
    onAddressAddSuccess() {
      toast({
        position: 'top',
        status: 'success',
        description: intl.formatMessage({ id: 'address.add.success' }),
      })
    },
    onAddressAddError: (e) => {
      toast({ status: 'error', ...getError(e) })
    },
  })
  const updateAddress = composableUpdateAddress as ComposableCustomUpdateAddress
  const OPTIONAL = intl.formatMessage({
    id: 'form.field.optional',
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(updateAddressFormSchema({ intl })),
    mode: 'all',
  })
  const watchIsCommercial = watch(
    'isCommercial',
    address?.isCommercial ?? false
  )

  const setValueOptions = {
    shouldValidate: Boolean(address),
  }
  const resetInitialValues = () => {
    Object.keys(relationsAddressFields).map((key) => {
      const value = address
        ? address[
            relationsAddressFields[
              key as keyof FormData
            ] as keyof EpCustomAddressInterface
          ]
        : ''
      setValue(key as keyof FormData, value, setValueOptions)
    })
  }

  useEffect(() => {
    resetInitialValues()
  }, [])

  const title = intl.formatMessage({ id: 'profile.updateAddress.addressOne' })
  const requiredText = intl.formatMessage({ id: 'form.required' })

  const handleForm = async (data: FormData) => {
    const mapedEpAddress = Object.keys(relationsAddressFields).reduce<any>(
      (previous, current) => {
        previous[relationsAddressFields[current as keyof FormData]] =
          data[current as keyof FormData]
        return previous
      },
      {}
    ) as EpCustomAddressInterface
    mapedEpAddress.name = 'default'
    if (!data.isCommercial) {
      mapedEpAddress.company_name = ''
      mapedEpAddress.industry = ''
      setValue('companyName', '')
      setValue('industry', undefined)
    }

    address
      ? await updateAddress.mutate({
          addressId: addressId ?? '',
          address: mapedEpAddress,
        })
      : //For new account address
        await addAddress.mutate({
          address: mapedEpAddress,
        })
  }

  return (
    <Box
      bg="shading.100"
      paddingInline={5}
      paddingBlock={8}
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
      <Flex
        direction="row"
        justifyContent="space-between"
        flexWrap={isMobile ? 'nowrap' : 'wrap'}
        alignItems="center"
      >
        <Text
          as="h3"
          fontSize={{ base: 'mobile.md', md: 'desktop.sm' }}
          fontWeight="bold"
        >
          {title}
        </Text>
        <Text
          as="p"
          fontSize={{ base: 'desktop.bodyXS', md: 'desktop.bodySM' }}
          color="theme.textMuted"
        >
          {requiredText}
        </Text>
      </Flex>

      <Box as="form" onSubmit={handleSubmit(handleForm)} mt={10}>
        <Stack spacing={5} direction="column">
          <Flex gap={4} flexDirection={isMobile ? 'column' : 'row'}>
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
          </Flex>

          <InputField
            label={
              intl.formatMessage({
                id: 'account.register.label.phone',
              }) + REQUIRED
            }
            inputProps={register('phone')}
            error={errors.phone}
          />

          <InputField
            label={
              intl.formatMessage({
                id: 'account.register.label.addressLineOne',
              }) + REQUIRED
            }
            inputProps={{
              ...register('addressLineOne'),
              placeholder: intl.formatMessage({
                id: 'address.line1Hint',
              }),
            }}
            error={errors.addressLineOne}
          />

          <InputField
            label={
              intl.formatMessage({
                id: 'account.register.label.addressLineTwo',
              }) + OPTIONAL
            }
            inputProps={{
              ...register('addressLineTwo'),
              placeholder: intl.formatMessage({
                id: 'address.line2Hint',
              }),
            }}
            error={errors.addressLineTwo}
          />

          <Flex gap={4} flexDirection={{ base: 'column', md: 'row' }}>
            <InputField
              label={
                intl.formatMessage({
                  id: 'account.register.label.city',
                }) + REQUIRED
              }
              inputProps={register('city')}
              error={errors.city}
            />
            <SelectField
              label={`${intl.formatMessage({ id: 'address.stateTitle' })}*`}
              options={STATES['US'].filter(
                (state) => !EXCLUDED_STATES[state.value]
              )}
              selectProps={{
                ...register('state'),
                _focus: { ...selectFocusFX },
                placeholder: intl.formatMessage({
                  id: 'address.dropdownHint',
                }),
              }}
              error={errors.state}
            />
          </Flex>

          <Flex gap={4} flexDirection={isMobile ? 'column' : 'row'}>
            <InputField
              label={
                intl.formatMessage({
                  id: 'account.register.label.zipCode',
                }) + REQUIRED
              }
              inputProps={register('zipCode')}
              error={errors.zipCode}
            />
            <SelectField
              label={`${intl.formatMessage({ id: 'address.countryTitle' })}*`}
              selectProps={{
                ...register('country'),
                _focus: { ...selectFocusFX },
                placeholder: intl.formatMessage({
                  id: 'address.dropdownHint',
                }),
              }}
              options={COUNTRIES}
              error={errors.country}
            />
          </Flex>

          <ResidentialRadio
            label={intl.formatMessage({ id: 'address.addressType' })}
            value={watchIsCommercial}
            setValue={(value) => setValue('isCommercial', value)}
          />
          {watchIsCommercial && (
            <Flex gap={4} flexDirection={isMobile ? 'column' : 'row'}>
              <InputField
                label={
                  intl.formatMessage({
                    id: 'account.register.label.companyName',
                  }) + REQUIRED
                }
                inputProps={register('companyName')}
                error={errors.companyName}
              />

              <SelectField
                label={
                  intl.formatMessage({
                    id: 'address.industryTitle',
                  }) + REQUIRED
                }
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
            </Flex>
          )}
        </Stack>

        <Box mt={10}>
          <Button
            paddingBlock={5}
            paddingInline={10}
            fontSize="desktop.bodySM"
            border="1px solid transparent"
            type="submit"
            isLoading={updateAddress.isLoading}
            _hover={{ borderColor: 'transparent' }}
          >
            {intl.formatMessage({ id: 'action.save' })}
          </Button>
          <Button
            fontSize="desktop.bodySM"
            bg="transparent"
            color="shading.800"
            borderColor="transparent"
            textDecoration="underline"
            ml={5}
            _hover={{ bg: 'transparent' }}
            onClick={resetInitialValues}
          >
            {intl.formatMessage({ id: 'action.cancel' })}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
