import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useRadioGroup,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { PickerWrapper } from './PickerWrapper'
import { ColorPickerProps } from './types'

export const Picker = (props: ColorPickerProps) => {
  const intl = useIntl()
  const { query } = useRouter()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const {
    options,
    rootProps,
    hideLabel,
    label = '',
    variantSelector,
    ...rest
  } = props
  const { getRadioProps, getRootProps } = useRadioGroup(rest)
  const selectedOption = options.find(
    (option) => String(option.slug) === String(query.slug)
  )
  const [showMore, setShowMore] = useState(false)
  const [hoveredPickerLabel, setHoveredPickerLabel] = useState('')

  const start = useMemo(() => {
    return isMobile ? 20 : 24
  }, [isMobile])

  const defaultValueOfOptions = useMemo(() => {
    return options.slice(0, showMore ? options.length : start)
  }, [options, showMore, start])

  return (
    <Flex direction="column">
      {isMobile && <Divider />}
      {selectedOption && label && (
        <FormControl pt={{ base: 4, md: 0 }} {...rootProps}>
          {!hideLabel && (
            <FormLabel fontSize="sm" color="shading.900">
              {label &&
                intl.formatMessage(
                  { id: 'productDetailsPageColorPicker.label' },
                  {
                    label,
                  }
                )}{' '}
              <Text as="span" fontWeight="bold">
                {hoveredPickerLabel !== ''
                  ? hoveredPickerLabel
                  : selectedOption?.label ?? ''}
              </Text>
            </FormLabel>
          )}
          {selectedOption && (
            <SimpleGrid
              columns={{ base: 5, md: 6 }}
              gap={{ base: 2, md: 3 }}
              {...getRootProps()}
            >
              <Link
                key={selectedOption?.slug}
                href={`/${selectedOption?.slug}`}
                passHref
              >
                <PickerWrapper
                  {...selectedOption}
                  {...getRadioProps({ value: selectedOption?.label })}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                />
              </Link>
              {defaultValueOfOptions
                .filter((item) => item.slug !== selectedOption?.slug)
                .map((option) => (
                  <Link key={option.slug} href={`/${option.slug}`} passHref>
                    <PickerWrapper
                      {...option}
                      {...getRadioProps({ value: option.label })}
                      onMouseEnter={() => {
                        if (variantSelector && !isMobile) {
                          variantSelector(option.image_url)
                          setHoveredPickerLabel(option.label)
                        }
                      }}
                      onMouseLeave={() => {
                        if (variantSelector && !isMobile) {
                          variantSelector(null)
                          setHoveredPickerLabel('')
                        }
                      }}
                    />
                  </Link>
                ))}
            </SimpleGrid>
          )}
        </FormControl>
      )}
      {options.length > start && (
        <Button
          pt={6}
          pl={0}
          border="none"
          fontSize="sm"
          bg="white"
          color="shading.900"
          fontWeight="extrabold"
          textDecoration="underline"
          _active={{ color: 'shading.900', background: 'white' }}
          _hover={{ color: 'shading.900', background: 'white' }}
          onClick={() => setShowMore((prev) => !prev)}
        >
          {!showMore
            ? intl.formatMessage({ id: 'pickerButton.showMore' })
            : intl.formatMessage({ id: 'pickerButton.showLess' })}
        </Button>
      )}
    </Flex>
  )
}
