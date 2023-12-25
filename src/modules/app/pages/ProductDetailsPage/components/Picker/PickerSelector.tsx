import { chakra, Flex, Text, useRadio, VisuallyHidden } from '@chakra-ui/react'
import { ChakraNextImage } from '@modules/app'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { ColorPickerOptionProps } from './types'

export const PickerSelector = (props: ColorPickerOptionProps) => {
  const intl = useIntl()
  const { query } = useRouter()
  const { image_url, value, slug, isImage = true, stock_available } = props

  const { getInputProps, htmlProps, getCheckboxProps, getLabelProps } =
    useRadio(props)

  const opacity = stock_available === 0 ? 0.4 : 1
  const borderWidth = String(slug) === String(query.slug) ? '2px' : '1px'
  const borderColor =
    String(slug) === String(query.slug) ? 'primary.500' : 'primary.1000'
  const height = {
    base: isImage ? '60px' : '48px',
    md: isImage ? '65px' : '48px',
  }

  return (
    <chakra.label cursor="pointer" {...htmlProps}>
      <chakra.input {...getInputProps()} />
      <Flex
        w="auto"
        borderRadius="4px"
        position="relative"
        alignItems="center"
        justifyContent="center"
        px={isImage ? 0 : 3}
        h={height}
        borderWidth={borderWidth}
        borderColor={borderColor}
        _hover={{
          borderWidth: '2px',
          borderColor:
            String(slug) === String(query.slug) ? 'primary.500' : 'primary.300',
        }}
        {...getCheckboxProps()}
      >
        {isImage ? (
          <ChakraNextImage
            layout="fill"
            alt={slug}
            src={image_url}
            borderRadius="4px"
            objectFit="contain"
            opacity={opacity}
          />
        ) : (
          <Text fontWeight="normal">{value}</Text>
        )}
      </Flex>
      <VisuallyHidden {...getLabelProps()}>
        {intl.formatMessage(
          { id: 'productDetailsPageColorPicker.colorSelected' },
          {
            color: value,
          }
        )}
      </VisuallyHidden>
    </chakra.label>
  )
}
