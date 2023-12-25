import {
  BreadcrumbJsonLd,
  LocalBusinessJsonLd,
  NextSeo,
  OrganizationJsonLd,
  ProductJsonLd,
  SocialProfileJsonLd,
} from 'next-seo'

import { EpFlowFieldsInterface, EpProductInterface } from '@modules/ep'

import {
  NEXT_PUBLIC_ORGANIZATION_NAME,
  NEXT_PUBLIC_SITE_IDENTIFIER,
  NEXT_PUBLIC_STORE_ADDRESS_LOCALITY,
  NEXT_PUBLIC_STORE_ADDRESS_REGION,
  NEXT_PUBLIC_STORE_CLOSE_HOURS,
  NEXT_PUBLIC_STORE_COUNTRY,
  NEXT_PUBLIC_STORE_DESCRIPTION,
  NEXT_PUBLIC_STORE_LOGO,
  NEXT_PUBLIC_STORE_NAME,
  NEXT_PUBLIC_STORE_OPEN_HOURS,
  NEXT_PUBLIC_STORE_POSTAL_CODE,
  NEXT_PUBLIC_STORE_STREET_ADDRESS,
  NEXT_PUBLIC_STORE_TELEPHONE,
} from '@modules/app/constants'
import { ItemListElements } from 'next-seo/lib/types'
import { IntlShape, useIntl } from 'react-intl'

export interface ProductDetailsPageSeo {
  product?: EpProductInterface | undefined
  taxonomy: taxonomyType
  host: string
  extendedProductAttributes?: { [key: string]: EpFlowFieldsInterface }
  quantity: number
}

interface MetaTag {
  property: string
  content: string
}

interface taxonomyType {
  name: string
  slug: string
  children?: taxonomyType | { attributes: taxonomyType }
}

export interface BreadcrumbItem {
  position: number
  name: string
  item: string
}

export const generateSEOTagsFromProduct = (
  product: EpProductInterface,
  categoryName: String,
  intl: IntlShape
): MetaTag[] => {
  return [
    {
      property: 'title',
      content: `${product.attributes.name} | ${NEXT_PUBLIC_STORE_NAME}`,
    },
    {
      property: 'description',
      content: String(
        intl.formatMessage(
          {
            id: 'productDetailsPage.seo.description',
          },
          {
            storeLiteral: NEXT_PUBLIC_SITE_IDENTIFIER,
            categoryName: categoryName,
            productName: product.attributes.name,
          }
        )
      ),
    },
  ]
}

const taxonomyToBreadcrumbs = (
  breadcrumbs: BreadcrumbItem[] = [],
  taxonomy: any,
  level: number = 1,
  host: string
): BreadcrumbItem[] => {
  const children = taxonomy?.children
  if (children) {
    const { name, slug } = children

    if (name && slug) {
      breadcrumbs?.push({
        name,
        item: `${host}/${slug}`,
        position: level,
      })
    }
    return taxonomyToBreadcrumbs(breadcrumbs, children, level + 1, host)
  } else {
    const { name, slug } = taxonomy.attributes || {}
    breadcrumbs?.push({
      name,
      item: `${host}/${slug}`,
      position: level - 1,
    })
    return breadcrumbs
  }
}

export function Seo({
  product,
  taxonomy,
  extendedProductAttributes,
  host,
  quantity,
}: ProductDetailsPageSeo) {
  const intl = useIntl()
  const { categoryName } = extendedProductAttributes ?? {}
  const { name, slug } = product?.attributes ?? {}
  const seoMeta = product
    ? generateSEOTagsFromProduct(
        product,
        String(categoryName) || 'furniture and accessories',
        intl
      )
    : undefined

  const breadcrumbList = taxonomy
    ? taxonomyToBreadcrumbs([], taxonomy, 1, host)
    : []

  return (
    <>
      <NextSeo
        title={name}
        description={String(
          intl.formatMessage(
            {
              id: 'productDetailsPage.seo.description',
            },
            {
              storeLiteral: NEXT_PUBLIC_SITE_IDENTIFIER,
              categoryName: String(categoryName),
              productName: product?.attributes.name,
            }
          )
        )}
        // removed this as it is printing duplicate meta description tag
        // additionalMetaTags={seoMeta ?? undefined}
        canonical={host + '/' + slug}
      />

      <ProductJsonLd
        productName={product?.attributes.name || ''}
        images={String(
          product?.attributes?.extensions?.['products(extended)']?.image_list
        )?.split(',')}
        description={product?.attributes.description}
        brand={
          String(
            product?.attributes?.extensions?.['products(extended)']?.brand_name
          ) || ''
        }
        color={String(
          product?.attributes?.extensions?.['products(extended)']?.primarycolor
        )}
        manufacturerName={String(
          product?.attributes?.extensions?.['products(extended)']
            ?.manufacturername
        )}
        material={String(
          product?.attributes?.extensions?.['products(extended)']
            ?.primarymaterial
        )}
        sku={product?.attributes.sku}
        id={`${host}/${slug}`}
        offers={[
          {
            price: ((product?.meta?.display_price?.without_tax?.amount || 0) / 100) * quantity,
            priceCurrency: product?.meta?.display_price?.without_tax?.currency,
            availability: 'https://schema.org/InStock',
            url: `${host}/${slug}`,
          },
        ]}
      />

      <LocalBusinessJsonLd
        type="LocalBusiness"
        id={host}
        name={String(NEXT_PUBLIC_STORE_NAME) || ''}
        description={String(NEXT_PUBLIC_STORE_DESCRIPTION) || ''}
        url={host}
        telephone={NEXT_PUBLIC_STORE_TELEPHONE}
        address={{
          streetAddress: NEXT_PUBLIC_STORE_STREET_ADDRESS,
          addressLocality: NEXT_PUBLIC_STORE_ADDRESS_LOCALITY,
          addressRegion: NEXT_PUBLIC_STORE_ADDRESS_REGION,
          postalCode: NEXT_PUBLIC_STORE_POSTAL_CODE,
          addressCountry: NEXT_PUBLIC_STORE_COUNTRY,
        }}
        images={[String(NEXT_PUBLIC_STORE_LOGO) || '']}
        openingHours={[
          {
            opens: NEXT_PUBLIC_STORE_OPEN_HOURS,
            closes: NEXT_PUBLIC_STORE_CLOSE_HOURS,
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
          },
        ]}
      />

      <OrganizationJsonLd
        type="Organization"
        name={NEXT_PUBLIC_ORGANIZATION_NAME}
        logo={NEXT_PUBLIC_STORE_LOGO}
        url={host}
      />

      <SocialProfileJsonLd
        type="Person"
        name={String(NEXT_PUBLIC_STORE_NAME) || ''}
        url={host}
        sameAs={[
          String(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL) || '',
          String(process.env.NEXT_PUBLIC_SOCIAL_PINTEREST_URL) || '',
          String(process.env.NEXT_PUBLIC_SOCIAL_TWITTER_URL) || '',
          String(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL) || '',
        ]}
      />
      <BreadcrumbJsonLd
        itemListElements={taxonomy as any as ItemListElements[]}
      />
    </>
  )
}
