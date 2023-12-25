import { Box, Radio, RadioGroup, Stack, Text, useToast } from '@chakra-ui/react'
import { ShippingOption } from '@modules/ep'
import { EpFlowFieldValue } from '@myplanetdigital/elasticpath'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { ShippingOptionName } from './components'

interface CartItemShippingProps {
  options: ShippingOption[]
  previousShippingOption: ShippingOption
  updateShippingOption: (shippingOption: ShippingOption) => Promise<{
    isAddSuccess: boolean
    isDeleteSuccess: boolean
  }>
  shippingDaysTo: EpFlowFieldValue | undefined
}

export const CartItemShipping: React.FC<CartItemShippingProps> = ({
  options,
  previousShippingOption,
  updateShippingOption,
  shippingDaysTo,
}) => {
  const intl = useIntl()
  const toast = useToast()
  const selectedOption = previousShippingOption
    ? previousShippingOption.Order
    : options[0]?.Order

  const [value, setValue] = React.useState<string>(`${selectedOption}`)

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const finalDate = useMemo(() => {
    const daysTo = Number(shippingDaysTo)
    const startDate = new Date()
    if (isNaN(daysTo)) {
      return
    }
    if (!(startDate instanceof Date)) {
      return
    }
    var dow = startDate.getDay()
    var daysToAdd = daysTo
    if (dow == 0) daysToAdd++
    if (dow + daysToAdd >= 6) {
      var remainingWorkDays = daysToAdd - (5 - dow)
      daysToAdd += 2
      if (remainingWorkDays > 5) {
        daysToAdd += 2 * Math.floor(remainingWorkDays / 5)
        if (remainingWorkDays % 5 == 0) daysToAdd -= 2
      }
    }
    startDate.setDate(startDate.getDate() + daysToAdd)

    return (
      month[startDate.getMonth()] +
      ' ' +
      startDate.getDate() +
      'th ' +
      startDate.getFullYear()
    )
  }, [shippingDaysTo])

  const onChangeShippingOption = async (order: string) => {
    const shippingOption = options.find((op) => op.Order == +order)!

    const { isAddSuccess, isDeleteSuccess } = await updateShippingOption(
      shippingOption
    )

    if (!isDeleteSuccess) {
      toast({
        status: 'error',
        position: 'top',
        description: intl.formatMessage(
          { id: 'cart.shippingItem.update.error' },
          { name: shippingOption.Name }
        ),
      })
      return
    }

    if (isAddSuccess) {
      setValue(order)
      toast({
        status: 'success',
        description: intl.formatMessage(
          { id: `cart.shippingItem.add.success` },
          { name: shippingOption.Name }
        ),
        position: 'top',
      })
    } else {
      toast({
        status: 'error',
        position: 'top',
        description: intl.formatMessage(
          { id: 'cart.shippingItem.add.error' },
          { name: shippingOption.Name }
        ),
      })
      return
    }
  }

  if (!(Array.isArray(options) && options.length)) {
    return null
  }

  return (
    <Box>
      <>
        <Text
          mb={0.5}
          color="shading.400"
          fontSize={{ base: 'mobile.bodyXS', md: 'desktop.bodyXS' }}
        >
          {intl.formatMessage({ id: 'cart.itemShippedBy' })}
        </Text>
        <Text
          fontWeight="bold"
          fontSize={{ base: 'mobile.bodySM', md: 'desktop.bodySM' }}
        >
          {intl.formatMessage({ id: 'cart.itemShipsBy' })} {finalDate}
        </Text>
      </>
      {options?.length > 1 ? (
        <RadioGroup onChange={onChangeShippingOption} value={value} mt={1}>
          <Stack spacing="1">
            {options.map((option) => (
              <Radio
                key={option.Name}
                value={`${option.Order}`}
                colorScheme="primary"
                size="md"
              >
                <ShippingOptionName
                  ProviderName={option.ProviderName}
                  Name={option.Name}
                  Cost={option.Cost}
                />
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      ) : (
        <ShippingOptionName
          ProviderName={options[0].ProviderName}
          Name={options[0].Name}
          Cost={options[0].Cost}
        />
      )}
    </Box>
  )
}
