import { Box, chakra, Divider, Flex, Text } from '@chakra-ui/react'
import { Price } from '@modules/app/components'
import { NEXT_PUBLIC_PAYMENT_TOGGLE_AFFIRM } from '@modules/app/constants'
import { EpProductInterface } from '@myplanetdigital/elasticpath'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { AffirmMessage } from '../AffirmMessage'

interface HeaderType {
  sku?: string
  name?: string
  product?: EpProductInterface
  quantity?: number
  brandName?: string
  manufactureOriginalId?: string
}

export const Header = ({
  sku,
  name,
  product,
  quantity,
  brandName,
  manufactureOriginalId,
}: HeaderType) => {
  const intl = useIntl()
  const router = useRouter()
  const formatBrandNameForUrl = (brandName: string) => {
    return (
      brandName
        // Replacing any sequence of non-alphanumeric characters with a single hyphen
        .replace(/[^a-zA-Z0-9]+/g, '-')
        // Trim hyphens from the start or end of the string
        .replace(/^-+|-+$/g, '')
    )
  }
  const navigateToBrand = (
    brandName: string,
    manufactureOriginalId: string
  ) => {
    if (brandName && manufactureOriginalId) {
      const url = `/${formatBrandNameForUrl(
        brandName
      )}--B${manufactureOriginalId}.htm`
      return url
    } else {
      return '/'
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault() // Prevent the default anchor behavior
    const path = navigateToBrand(brandName || '', manufactureOriginalId || '')
    if (path === '/') {
      return
    }
    router.push(path) // Programmatic navigation
  }

  const StyledAnchor = chakra('a', {
    baseStyle: {
      fontWeight: 'semibold',
      lineHeight: '18px',
      fontSize: { base: 'sm', md: 'desktop.body' },
      cursor: 'pointer',
      pb: 1,
    },
  })

  return (
    <Flex direction="column" pb={4}>
      <Text
        as="span"
        fontWeight="semibold"
        lineHeight="18px"
        color="shading.400"
        fontSize={{ base: 'sm', md: 'desktop.body' }}
      >
        {intl.formatMessage(
          { id: 'productDetailsPageHeader.item' },
          {
            sku: sku,
          }
        )}
      </Text>
      <Text
        as="h1"
        fontWeight="bold"
        color="shading.900"
        fontSize={{ base: 'mobile.md', md: 'desktop.sm' }}
        pb={1}
      >
        {name}
      </Text>
      <Link
        href={navigateToBrand(brandName || '', manufactureOriginalId || '')}
        passHref
      >
        <StyledAnchor onClick={handleClick}>
          Brand:{' '}
          <span style={{ textDecoration: 'underline' }}>{brandName}</span>
        </StyledAnchor>
      </Link>

      <Box minH={8} data-bv-show="rating_summary" data-bv-product-id={sku} />
      <Price
        rootProps={{ pt: 6 }}
        priceProps={{
          fontWeight: 'bold',
          fontSize: { base: 'mobile.lg', md: 'desktop.md' },
        }}
        salePriceProps={{
          fontWeight: 'bold',
          fontSize: { base: 'mobile.lg', md: 'desktop.md' },
        }}
        originalPriceProps={{
          fontWeight: 'normal',
          fontSize: { base: 'mobile.sm', md: 'desktop.xs' },
        }}
        displayPrice={product?.meta?.display_price}
        originalDisplayPrice={product?.meta?.original_display_price}
        quantity={quantity}
      />
      {NEXT_PUBLIC_PAYMENT_TOGGLE_AFFIRM && (
        <AffirmMessage
          displayPrice={product?.meta?.display_price}
          originalDisplayPrice={product?.meta?.original_display_price}
          quantity={quantity}
        />
      )}
      <Divider mt={6} />
    </Flex>
  )
}
