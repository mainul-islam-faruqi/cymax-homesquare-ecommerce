import { Box, HStack, Tag, Text, VStack } from '@chakra-ui/react'
import { getIndexName } from '@modules/algolia'
import { ChakraNextImage } from '@modules/app'
import { formattedValueToFloat, validURL } from '@modules/app/utils'
import { EpGetMultipleStockDataInterface } from '@modules/ep'
import { productSelected } from '@modules/gtm'
import { clickEvent } from '@modules/gtm/clickEvent'
import { AlgoliaProduct } from '@myplanetdigital/algolia'
import { useComposable } from '@myplanetdigital/base'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useCsa } from '../../CsaLoginPage/hooks'

export type MyAlgoliaProduct = AlgoliaProduct & {
  slug: string,
  sku: string
  listPrice: {
    USD: {
      float_price: number
      on_sale: boolean
      sale_prices: {
        float_price: number
        original_price: { float_price: number }
      }
    }
  }
  salePrice: { 'sale-1': { currencies: { USD: { float_price: number } } } }
  cymaxProductId: number
  brand: string
  material: string
  finish: string
  category: string
  categoriesName: string
  categoriesSlug: string[]
  collectionName: string
  collectionSlug: string
  images: string
}

interface CategoryProductCardProps {
  product: MyAlgoliaProduct
  priority?: boolean
  index: number
  stock: EpGetMultipleStockDataInterface | undefined
}

export const Card = ({
  product,
  priority = false,
  index,
  stock,
}: CategoryProductCardProps) => {
  const { locale } = useComposable()
  const algoliaIndex = getIndexName(locale)
  const { token: csaToken } = useCsa()
  const { asPath } = useRouter()
  const intl = useIntl()
  const salePrice = formattedValueToFloat(
    product?.listPrice?.USD?.sale_prices?.float_price
  ) as number

  const [hasRating, setHasRating] = useState(false)
  const elemRef = useRef(null)

  const listPrice = formattedValueToFloat(
    product?.listPrice?.USD?.sale_prices?.original_price?.float_price ||
      product?.listPrice?.USD?.float_price
  ) as number
  const isSale = Boolean(product?.listPrice?.USD?.on_sale)
  const tagLabel = useMemo(() => {
    const isAvailable = stock?.available

    return isAvailable === 0
      ? intl.formatMessage({ id: 'productListingPage.sold' })
      : salePrice < listPrice && isSale
      ? intl.formatMessage({ id: 'productListingPage.sale' })
      : null
  }, [stock?.available, intl, product?.salePrice, product?.listPrice])

  const colorLabel = useMemo(() => {
    const isAvailable = stock?.available
    return isAvailable === 0
      ? '#ADADAD'
      : salePrice < listPrice && isSale
      ? 'red.500'
      : ''
  }, [stock?.available])

  const image: string = useMemo(() => {
    const mainImage = (product?.images || '').split(',')[0]
    return validURL(mainImage) ? mainImage : '/img/image-placeholder.svg'
  }, [product?.images])

  const isSearchPage = () => {
    return asPath.startsWith('/search?query=')
  }
  const handleGtmProductSelected = (product: MyAlgoliaProduct) => {
    const discount = product.listPrice?.USD?.on_sale
      ? product.listPrice?.USD?.sale_prices?.original_price?.float_price -
        product.listPrice?.USD?.sale_prices?.float_price
      : 0
    let roundedDiscount: string = discount.toFixed(2)
    productSelected({
      ecommerce: {
        items: [
          {
            item_name: product?.name,
            item_id: product?.sku,
            price: salePrice || listPrice,
            item_brand: product?.brand,
            item_category: product?.ProductCategory as string,
            quantity: 1,
            discount: parseFloat(roundedDiscount),
            index: product?.__position as number,
          },
        ],
      },
    })
  }
  function productSessionStore(
    product: MyAlgoliaProduct,
    filters: (string | null)[]
  ) {
    // Store product data in sessionStorage before navigating
    sessionStorage.setItem(
      'selectedProduct',
      JSON.stringify({
        ObjectId: product.objectID,
        QueryID: product.__queryID,
        isSearch: isSearchPage(),
        position: product.__position,
        filters: filters,
        index: algoliaIndex,
        algoliaUserToken: localStorage.getItem('algoliaUserToken'),
      })
    )
  }
  const handleClickEventGtm = (product: MyAlgoliaProduct) => {
    clickEvent({
      event: 'clickEvent',
      category: (product?.ep_categories as string) || '',
      subcategory: (product?.productAttributes as string) || '',
      page_details: product?.slug || '',
      section: intl.formatMessage({ id: 'ariaLabel.productCard' }),
      clicktext: product.name || '',
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
  }

  const salePriceFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(salePrice)

  const listPriceFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(listPrice)

  useEffect(() => {
    setTimeout(() => {
      const rating = (elemRef?.current as any)?.querySelector(
        '[itemprop="reviewCount"]'
      )
      setHasRating(!!rating)
    }, 2000)
  }, [elemRef])

  useEffect(() => {
    setTimeout(() => {
      const rating = (elemRef?.current as any)?.querySelector(
        '[itemprop="reviewCount"]'
      )
      setHasRating(!!rating)
    }, 2000)
  }, [elemRef])

  function fetchFilters(product: MyAlgoliaProduct) {
    var labelElements = Array.from(
      document.querySelectorAll('label[data-insights-filter][data-checked]')
    )
    var otherElements = Array.from(
      document.querySelectorAll(':not(label)[data-insights-filter]')
    )
    var combinedElements = labelElements.concat(otherElements)

    var filteredElements = combinedElements.filter(function (element) {
      return !element.closest('.chakra-portal')
    })

    const attributes = filteredElements
      .map((element) => element.getAttribute('data-insights-filter'))
      .filter(Boolean) // This will filter out null and empty string values

    var uniqueAttributes = []
    for (var i = 0; i < attributes.length; i++) {
      if (uniqueAttributes.indexOf(attributes[i]) === -1) {
        uniqueAttributes.push(attributes[i])
      }
    }

    productSessionStore(product, uniqueAttributes)
  }

  return (
    <VStack
      p="12px"
      as="article"
      w="100%"
      spacing="12px"
      alignItems="initial"
      onClick={() => {
        handleGtmProductSelected(product)
        handleClickEventGtm(product)
        fetchFilters(product)
      }}
      data-insights-object-id={product.objectID}
      data-insights-position={product.__position}
      data-insights-query-id={product.__queryID}
      data-insights-search={isSearchPage()}
    >
      <Link href={`/${product?.slug}`} passHref>
        <Box as="a" cursor="pointer" position={'relative'}>
          {tagLabel && (
            <Box padding={3} position="absolute" zIndex={1}>
              <Tag
                h="18px"
                bg={colorLabel}
                fontSize="sm"
                variant="solid"
                borderRadius="2px"
                fontWeight="extrabold"
              >
                {tagLabel}
              </Tag>
            </Box>
          )}
          <ChakraNextImage
            id={`productSelected ${product?.sku} PLP`}
            src="https://s3-us-west-2.amazonaws.com/stamped.io/uploads/photos/291343_11314_16dd5e46_035d_4c9d_8592_cc5c48732c9d.jpg"
            alt={product?.name}
            width={400}
            height={500}
            objectFit="contain"
            layout="responsive"
            priority={priority}
          />
        </Box>
      </Link>
      <Link href={`/${product?.slug}`} passHref>
        <VStack spacing="xxxxs" alignItems="initial" cursor="pointer" as="a">
          <Text
            fontSize={{ base: 'xxs', lg: 'xs' }}
            color="gray.500"
            title={product?.brand as string}
          >
            {product.brand}
          </Text>
          <Text
            fontSize={{ base: 'sm', lg: 'base' }}
            color={'blackAlpha.1000'}
            title={product?.name as string}
          >
            {product.name}
          </Text>
          <HStack>
            {isSale ? (
              <>
                <Text fontSize={{ base: 'xs', lg: 'sm' }} color={'red.500'}>
                  {salePriceFormatted}
                </Text>
                <Text
                  fontSize={{ base: 'xs', lg: 'sm' }}
                  color="gray.500"
                  textDecoration="line-through"
                >
                  {listPriceFormatted}
                </Text>
              </>
            ) : (
              <Text fontSize={{ base: 'xs', lg: 'sm' }} color="black.500">
                {listPriceFormatted}
              </Text>
            )}
          </HStack>
          <HStack>
            <Box
              minH={8}
              ref={elemRef}
              data-bv-show="inline_rating"
              data-bv-product-id={product?.sku}
              display={hasRating ? 'block' : 'none'}
            />
          </HStack>
        </VStack>
      </Link>
    </VStack>
  )
}

export const CategoryProductCard = React.memo(Card)
