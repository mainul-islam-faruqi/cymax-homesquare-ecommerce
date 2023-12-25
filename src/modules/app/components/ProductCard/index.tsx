import { AspectRatio, Box, BoxProps, Stack, Text } from '@chakra-ui/react'
import { ChakraNextImage, IMAGE_PLACEHOLDER, Price } from '@modules/app'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { getProductImages } from '@modules/app/utils'
import { EpProductInterface } from '@modules/ep'
import { formatProductCardData, productSelected } from '@modules/gtm'
import { clickEvent } from '@modules/gtm/clickEvent'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
interface ProductCardProps {
  product: EpProductInterface
  rootProps?: BoxProps
  isPdpPage?: boolean
  index: number
}

export const ProductCard = ({
  product,
  rootProps,
  isPdpPage = false,
  index,
}: ProductCardProps) => {
  const { asPath } = useRouter()
  const { name, slug, sku } = product?.attributes
  const { token: csaToken } = useCsa()
  const intl = useIntl()
  const { image } = getProductImages(product)
  const href = `/${slug}`
  const id = asPath === '/' ? 'homepage' : asPath

  const brand =
    product?.attributes?.extensions?.['products(extended)']?.brand_name

  const handleGtmProductSelected = (data: EpProductInterface) => {
    const products = formatProductCardData(data)

    productSelected({
      ecommerce: {
        items: products,
      },
    })
  }

  const handleClickEventGtm = (data: EpProductInterface) => {
    clickEvent({
      event: 'clickEvent',
      category: '',
      subcategory: '',
      page_details: data.attributes.slug || '',
      section: intl.formatMessage({ id: 'ariaLabel.productCard' }),
      clicktext: data.attributes.name || '',
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
  }

  return (
    <Box
      {...rootProps}
      position="relative"
      onClick={() => {
        handleGtmProductSelected(product)
        handleClickEventGtm(product)
      }}
    >
      <NextLink
        href={href}
        passHref
        id={isPdpPage ? '' : `productSelected ${sku} ${id}`}
      >
        <Box as="a">
          <Box h="300px">
            <AspectRatio
              borderRadius={'base'}
              overflow="hidden"
              h="full"
              w="full"
            >
              <ChakraNextImage
                src={image || IMAGE_PLACEHOLDER}
                alt={name}
                layout="fill"
                objectFit="contain"
              />
            </AspectRatio>
          </Box>
          <Stack my={{ base: 4, md: 6 }} spacing="1">
            {brand && (
              <Text
                fontSize={{ base: 'mobile.bodyXS', md: 'desktop.bodyXS' }}
                color="shading.400"
                fontWeight="normal"
              >
                {brand}
              </Text>
            )}
            <Text color="shading.900" fontWeight="bold" title={name}>
              {name}
            </Text>
            <Price
              rootProps={{ minHeight: '1.5em' }}
              displayPrice={product?.meta?.display_price}
              originalDisplayPrice={product?.meta?.original_display_price}
            />
          </Stack>
        </Box>
      </NextLink>
    </Box>
  )
}
