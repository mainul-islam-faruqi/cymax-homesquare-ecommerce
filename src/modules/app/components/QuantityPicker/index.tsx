import {
  Divider,
  Flex,
  FormControl,
  FormControlProps,
  IconButton,
  IconButtonProps,
  Text,
  useControllableState,
  UseControllableStateProps,
} from '@chakra-ui/react'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { clickEvent } from '@modules/gtm/clickEvent'
import { useRouter } from 'next/router'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import { useIntl } from 'react-intl'

interface QuantityPickerProps extends UseControllableStateProps<number> {
  max?: number
  min?: number
  rootProps?: FormControlProps
  isLoading?: boolean
  step?: number
  toastStockUnavailable?: () => void
}

export const QuantityPicker = (props: QuantityPickerProps) => {
  const { asPath } = useRouter()
  const { token: csaToken } = useCsa()
  const intl = useIntl()
  const {
    min = 1,
    max,
    rootProps,
    step = 1,
    toastStockUnavailable,
    ...rest
  } = props

  const [value, setValue] = useControllableState(rest)

  const handleDecrement = () => {
    setValue(value === min ? value : value - step)
  }
  const handleIncrement = () => {
    if (max && value + step > max) {
      toastStockUnavailable && toastStockUnavailable()
      return
    }
    setValue(value === max ? value : value + step)
  }

  const handleQuantityClick = () => {
    clickEvent({
      event: 'clickEvent',
      category: '',
      subcategory: '',
      page_details: asPath || '',
      section: intl.formatMessage({ id: 'ariaLabel.quantityPickerPDP' }),
      clicktext: intl.formatMessage({ id: 'ariaLabel.quantityPickerButton' }),
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
  }

  return (
    <FormControl {...rootProps} width="initial">
      <Flex
        borderRadius="md"
        borderWidth="1px"
        borderColor="shading.300"
        alignItems="center"
        justifyContent="space-between"
        height={{ base: '8', md: '10' }}
        width={{ base: '20', md: '24' }}
      >
        <Text
          as="span"
          fontWeight="normal"
          userSelect="none"
          pl={{ base: '4', md: '7' }}
          pr={2}
          minWidth="12"
          textAlign="center"
          fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
        >
          {value}
        </Text>
        <Flex
          flexDir="column"
          borderLeft="1px"
          borderColor="shading.300"
          h="100%"
          justifyContent="space-evenly"
        >
          <QuantityPickerButton
            onClick={handleIncrement}
            icon={
              <GoTriangleUp
                onClick={handleQuantityClick}
                id={
                  asPath === '/cart'
                    ? 'addToCart quantity-picker-increment'
                    : ''
                }
                fontSize="12px"
              />
            }
            isDisabled={value === max}
            aria-label="Increment"
            borderRadius="0"
            borderTopRightRadius="md"
            borderColor="shading.300"
          />
          <Divider />
          <QuantityPickerButton
            onClick={handleDecrement}
            icon={
              <GoTriangleDown
                onClick={handleQuantityClick}
                id={
                  asPath === '/cart'
                    ? 'addToCart quantity-picker-decrement'
                    : ''
                }
                fontSize="12px"
              />
            }
            isDisabled={value === min}
            aria-label="Decrement"
            borderRadius="0"
            borderBottomRightRadius="md"
          />
        </Flex>
      </Flex>
    </FormControl>
  )
}

const QuantityPickerButton = (props: IconButtonProps) => (
  <IconButton
    size="xs"
    fontSize="sm"
    paddingX="1.5"
    color="shading.900"
    border="none"
    backgroundColor="white"
    _hover={{ backgroundColor: 'white' }}
    _active={{ backgroundColor: 'white' }}
    _focus={{ backgroundColor: 'white' }}
    {...props}
  />
)
