import { Box, Grid, GridItem } from '@chakra-ui/react'
import { useBundles } from '@modules/app'
import { BundleAccordion, QuantityPicker } from '@modules/app/components'
import LowStockAlert from '@modules/app/components/LowStockAlert'
import {
  ELASTIC_PATH_CLIENT_ID,
  EP_CUSTOM_ITEM_KEY,
  NEXT_PUBLIC_BAZAARVOICE_URL,
  NEXT_PUBLIC_CUSTOMER_SERVICE_EMAIL,
  NEXT_PUBLIC_CUSTOMER_SERVICE_PHONE,
} from '@modules/app/constants'
import {
  getCartItemShippingOptionKey,
  saveProductToSession,
} from '@modules/app/utils'
import { Accordion } from '@modules/components'
import { BreadcrumbsHierarchy } from '@modules/components/BreadcrumbsHierarchy'
import { Carousel, CarouselVariant } from '@modules/contentful'
import { Alignment } from '@modules/contentful/utils'
import {
  EpProductInterface,
  FileType,
  ProductIdType,
  useCart,
  useCustomCartItem,
  useGetMultipleStocks,
} from '@modules/ep'
import { addToCart, addToCartClickAlgolia } from '@modules/gtm'
import { clickEvent } from '@modules/gtm/clickEvent'
import { useToast } from '@modules/ui'
import { useComposable } from '@myplanetdigital/base'
import { getError } from '@myplanetdigital/elasticpath'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useCsa } from '../CsaLoginPage/hooks'
import {
  Buttons,
  Header,
  OutOfStock,
  Picker,
  ProductImageGallery,
  Questions,
  Seo,
  Shipping,
} from './components'
import {
  useAccordionOptions,
  useExtendedProductAttributes,
  useGtmProductViewed,
} from './hooks'

export * from './ssr'

export interface ItemListElements {
  item: string
  name: string
  position: number
}
export interface seoMetaTags {
  content: string
  keyOverride?: string
  property: string
  name?: undefined
  httpEquiv?: undefined
}
export interface ProductDetailsPageProps {
  product: EpProductInterface | undefined
  variants: EpProductInterface[] | undefined
  host?: string
  taxonomy?: any
  isNoMatch?: boolean
}

export interface Breadcrumb {
  slug: string
  name: string
}

export const ProductDetailsPage = ({
  product,
  host,
  taxonomy,
  variants,
}: ProductDetailsPageProps) => {
  const intl = useIntl()
  const router = useRouter()
  const { path } = useComposable()
  const toast = useToast()
  const { name, description, sku, extensions } = product?.attributes ?? {}
  const [quantity, setQuantity] = useState(1)
  useEffect(() => {
    saveProductToSession(sku)
  }, [sku])
  const [hoveredPickerUrl, setHoveredPickerUrl] = useState<string | null>()

  const selectedVariantUrl = (url: string | null | undefined) => {
    setHoveredPickerUrl(url)
  }
  const extendedProductAttributes: any = useExtendedProductAttributes({
    extensions,
    name,
  })
  const {
    assemblyGuides,
    brandAbout,
    finish,
    height,
    imageGallery,
    length,
    material,
    minQty,
    productGroupName,
    productSKUs,
    productWeight,
    setQty,
    shippingDayFrom,
    shippingDaysTo,
    shippingOptions,
    similarProducts,
    style,
    warranty,
    width,
    brandName,
    categoryName,
    variant,
    currency,
    categoryPath,
    manufactureOriginalId,
  } = extendedProductAttributes

  useEffect(() => {
    if (imageGallery && imageGallery.length == 0) {
      imageGallery.push({
        url: '/img/image-placeholder.svg',
        name: 'Image-Placeholder',
        type: FileType.image,
      })
    }
  }, [imageGallery])

  // Fetch stock for product and variants
  const productIds: ProductIdType[] = [
    { id: product?.id ?? '' },
    ...(variants || []).map((el) => ({ id: el?.id })),
  ]
  const stockQuery = useGetMultipleStocks(productIds)
  const stock = stockQuery.stocks?.find((el) => el?.id === product?.id)
  const pickerOptions = variants?.map((item) => {
    const productsProps = item?.attributes?.extensions?.['products(extended)']
    const stock_available =
      stockQuery.stocks?.find((st) => st?.id === item?.id)?.available || 0

    return {
      id: item?.id,
      slug: item?.attributes?.slug,
      label: String(productsProps?.productgroupvariation),
      image_url: (productsProps?.image_list as string)?.split(',')[0],
      stock_available,
    }
  })

  const { accordionOptions } = useAccordionOptions({
    assemblyGuides,
    finish,
    material,
    style,
    brandAbout,
    warranty,
    height,
    width,
    productWeight,
    length,
    name,
  })

  useEffect(() => {
    if (minQty) {
      setQuantity(minQty)
    }
  }, [minQty])

  const toastStockUnavailable = useCallback(() => {
    toast({
      status: 'error',
      title: intl.formatMessage({ id: 'product.unavailableStockTitle' }),
      description: intl.formatMessage(
        { id: 'product.unavailableStockDescription' },
        { name }
      ),
    })
  }, [toast, name, intl])

  const { bundles } = useBundles(product)

  const { addCustomCartItem } = useCustomCartItem()
  const { asPath } = useRouter()
  const { token: csaToken } = useCsa()
  const { addCartItem, cartId, cart } = useCart({
    onCartItemAddError: (e) => toast({ status: 'error', ...getError(e) }),
    onCartItemAddSuccess: async () => {
      const shippingOption = shippingOptions?.[0]
      const previousShipping = cart?.data?.find(
        (item) => item.sku === getCartItemShippingOptionKey(product?.id!)
      )
      if (shippingOption && !previousShipping) {
        const customItemAdded = await addCustomCartItem(cartId, {
          type: EP_CUSTOM_ITEM_KEY,
          name: `${shippingOption.ProviderName} ${shippingOption.Name}`,
          sku: getCartItemShippingOptionKey(product?.id!),
          description: JSON.stringify({
            storeId: ELASTIC_PATH_CLIENT_ID,
            shippingOption,
          }),
          custom_inputs: {
            selectedShippingOption: shippingOption,
          },
          price: {
            amount: shippingOption?.Cost * 100,
            includes_tax: false,
          },
          quantity: quantity,
        })
        if (!customItemAdded) {
          toast({
            status: 'warning',
            description: intl.formatMessage(
              { id: 'cart.shippingItem.add.error' },
              { name }
            ),
          })
          return
        }
      }
      toast({
        status: 'success',
        description: (
          <>
            {intl.formatMessage({ id: 'cart.item.add.success' }, { name })}
            &nbsp;{' '}
            <a
              href={path.getCart()}
              onClick={(e) => {
                e.preventDefault()
                router.push(path.getCart())
              }}
              aria-label={intl.formatMessage({ id: 'ariaLabel.cart' })}
              style={{ textDecoration: 'underline' }}
              data-insights-object-id={cart.data
                ?.map((item) => item.id)
                .join(',')}
            >
              {intl.formatMessage({ id: 'cart.item.add.success.viewCart' })}
            </a>
          </>
        ),
      })
      setQuantity(minQty)
    },
  })
  const getCartFromSession = () => {
    const storedCart = sessionStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  }

  const setCartInSession = (cart: any[]) => {
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }

  const handleClickEventAlgolia = () => {
    const storedProduct = sessionStorage.getItem('selectedProduct')
    const cartProducts = getCartFromSession() || []
    const updatedCart = [...cartProducts, storedProduct]
    setCartInSession(updatedCart)

    if (storedProduct) {
      const productData = JSON.parse(storedProduct)
      addToCartClickAlgolia(productData)
      // Set product data to the state or use it directly in your component
    } else {
      // Handle the scenario when the data is not available
    }
  }
  const handleAddToCart = useCallback(() => {
    if (!sku) {
      return
    }
    const originalDisplayPrice = product?.meta?.original_display_price
    const displayPrice = product?.meta?.display_price
    const originalPrice = product?.meta?.original_price
    const manufacturePartNumber = product?.attributes?.manufacturer_part_num
    const discount =
      (product?.meta?.original_display_price?.without_tax?.amount || 0) -
      (product?.meta?.display_price?.without_tax?.amount || 0)
    const discountFinal = discount < 0 ? 0 : discount

    addCartItem.mutate({
      sku,
      quantity,
      custom_inputs: {
        bundles: bundles,
        main_image: imageGallery[0],
        price: {
          original_display_price: originalDisplayPrice,
          display_price: displayPrice,
          original_price: originalPrice,
        },
        pickerOptions: {
          setQty,
          minQty,
        },
        shipping_upgrade_options: shippingOptions,
        brand: brandName,
        category: categoryName,
        variant: variant,
        manufacturer_part_num: manufacturePartNumber,
      },
    })
    handleClickEventAlgolia()
    addToCart({
      ecommerce: {
        currency: 'USD',
        value: Number(
          (((displayPrice?.without_tax.amount || 0) / 100) * quantity).toFixed(
            2
          )
        ),
        items: [
          {
            quantity: quantity,
            item_id: sku,
            item_name: product?.attributes?.name || '',
            item_brand: brandName,
            price: (displayPrice?.without_tax.amount || 0) / 100,
            item_category: categoryName,
            discount: discountFinal / 100,
          },
        ],
      },
    })
  }, [
    addCartItem,
    quantity,
    sku,
    bundles,
    imageGallery,
    product?.meta,
    setQty,
    minQty,
    shippingOptions,
    brandName,
    categoryName,
    variant,
    product?.attributes,
  ])

  useGtmProductViewed({
    brandName,
    sku,
    name,
    variant,
    categoryName,
    product,
    currency,
    discount:
      (product?.meta?.original_display_price?.without_tax?.amount || 0) -
      (product?.meta?.display_price?.without_tax?.amount || 0),
  })

  const handleBVClick = () => {
    clickEvent({
      event: 'clickEvent',
      category: '',
      subcategory: '',
      page_details: asPath || '',
      section: intl.formatMessage({ id: 'ariaLabel.bvReview' }),
      clicktext: intl.formatMessage({ id: 'ariaLabel.bvReview' }),
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
  }

  return (
    <>
      <Script
        defer
        strategy="lazyOnload"
        type="text/javascript"
        src="https://unpkg.com/default-passive-events"
      />
      <Script
        defer
        strategy="lazyOnload"
        type="text/javascript"
        src={NEXT_PUBLIC_BAZAARVOICE_URL}
      />

      <Seo
        taxonomy={taxonomy}
        host={host ?? ''}
        product={product}
        extendedProductAttributes={extendedProductAttributes}
        quantity={quantity}
      />

      <Grid
        h="100%"
        m="0 auto"
        px={{ base: 5, lg: 24 }}
        maxW={{ base: 'container.max' }}
        templateAreas={{
          base: `"breadcrumbs"
      "header"
      "main"
      "sidebar"`,
          md: ` "breadcrumbs breadcrumbs"
      "main header"
      "main sidebar"`,
        }}
        gridTemplateColumns={{ base: '100%', md: '60% 40%' }}
      >
        <GridItem
          display="flex"
          area={'breadcrumbs'}
          justifyContent="space-between"
          flexDirection={['column', 'row']}
          h={{ sm: '90px', md: '90px' }}
        >
          <Box mt={{ base: 7, lg: 7 }} mb={0}>
            {taxonomy && (
              <BreadcrumbsHierarchy taxonomy={taxonomy} productName={name} />
            )}
          </Box>
        </GridItem>
        <GridItem area={'header'} w="100%">
          <Header
            sku={sku}
            name={name}
            product={product}
            quantity={quantity}
            brandName={brandName}
            manufactureOriginalId={manufactureOriginalId}
          />
        </GridItem>
        <GridItem area={'sidebar'} maxW={{ base: '100%', md: '464px' }}>
          <Box flex="1" pb={9}>
            {pickerOptions && pickerOptions?.length > 0 && (
              <Picker
                options={pickerOptions || []}
                label={productGroupName}
                variantSelector={selectedVariantUrl}
              />
            )}
          </Box>
          {stock &&
            minQty &&
            (stock?.available === 0 || stock?.available < minQty ? (
              <OutOfStock productId={sku} />
            ) : (
              <>
                <Box display="flex" alignItems="center">
                  <Box pb={8} mr={4}>
                    <QuantityPicker
                      value={quantity}
                      onChange={(val) => setQuantity(val)}
                      min={minQty}
                      max={stock?.available}
                      step={setQty}
                      toastStockUnavailable={toastStockUnavailable}
                    />
                  </Box>
                  <Box pb={8}>
                    <LowStockAlert stockAvailable={stock?.available} />
                  </Box>
                </Box>

                {bundles && bundles.length > 0 && (
                  <Box pb={8}>
                    <BundleAccordion
                      items={bundles}
                      borderBottom
                      accordionProps={{
                        defaultIndex: [0],
                      }}
                    />
                  </Box>
                )}
                <Buttons
                  addCartItem={addCartItem}
                  handleAddToCart={handleAddToCart}
                  data-insights-object-id={product?.id}
                />
              </>
            ))}
          {shippingOptions && (
            <Shipping
              shippingDayFrom={shippingDayFrom}
              shippingDayTo={shippingDaysTo}
              shippingOption={shippingOptions?.[0]}
            />
          )}
          <Questions
            productId={sku}
            emailContactUrl={NEXT_PUBLIC_CUSTOMER_SERVICE_EMAIL || ''}
            phoneNumber={NEXT_PUBLIC_CUSTOMER_SERVICE_PHONE || ''}
          />
          <Box
            fontSize="sm"
            lineHeight="150%"
            sx={{
              'ol,ul': { paddingLeft: 4 },
            }}
            dangerouslySetInnerHTML={{
              __html: description as string,
            }}
          />
          <Accordion
            containerProps={{ pr: 0, pt: { base: 4, md: 8 } }}
            fields={{ items: accordionOptions }}
            accordionPanelProps={{
              _hover: {
                background: 'blackAlpha.0',
              },
            }}
            accordionButtonProps={{
              borderBottom: '1px',
              borderColor: 'shading.200',
            }}
            accordionListTextProps={{
              fontSize: { base: 'mobile.body', md: 'desktop.body' },
            }}
            accordionButtonTextProps={{
              fontSize: { base: 'mobile.body', md: 'desktop.body' },
            }}
          />
        </GridItem>
        <GridItem
          area={'main'}
          mr={{ base: 0, md: 14 }}
          pb={{ base: 4, md: 0 }}
        >
          {imageGallery && (
            <ProductImageGallery
              items={imageGallery}
              variantUrl={hoveredPickerUrl}
            />
          )}
        </GridItem>
      </Grid>
      <Carousel
        isPdpPage
        {...{
          name: 'similar-products',
          title: intl.formatMessage({
            id: 'productDetailsPage.similarTitle',
          }),
          titleAlignment: Alignment.Center,
          variant: CarouselVariant.Products,
          products: similarProducts,
        }}
      />
      <Carousel
        isPdpPage
        {...{
          name: 'similar-brand-products',
          title: 'Same Brand prducts',
          titleAlignment: Alignment.Center,
          variant: CarouselVariant.RelatedProducts,
          brand: brandName,
          category: categoryPath,
          pdpProductSKU: sku,
        }}
      />
      <GridItem
        pt={16}
        margin="0 auto"
        px={{ base: 5, lg: 24 }}
        maxW={{ base: 'container.max' }}
      >
        <Box
          data-bv-show="reviews"
          data-bv-product-id={sku}
          onClick={handleBVClick}
        />
      </GridItem>
      <Carousel
        isPdpPage
        {...{
          name: 'recently-viewed-products',
          variant: CarouselVariant.RecentlyViewedProducts,
        }}
      />
    </>
  )
}
