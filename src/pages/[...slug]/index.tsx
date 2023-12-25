/* eslint-disable no-console */

import { ALGOLIA_BASE_INDEX } from '@modules/algolia'
import {
  Breadcrumb,
  ELASTIC_PATH_HEADERS_DEFAULT,
  paths,
  ProductDetailsPage,
  ProductListingPage,
  REVALIDATE_DEFAULT,
  searchClient,
} from '@modules/app'
import { fetchPLPTaxonomy } from '@modules/app/pages/ProductListingPage/utils'
import { GenericPage, GenericPageWithMenu } from '@modules/contentful'
import {
  ContentfulEntry,
  ContentfulPLPPage,
  PAGES_TYPES,
} from '@modules/contentful/pages/types'
import ContentfulHandler from '@modules/contentful/utils/composable-contentful/src'
import { resolveLinks } from '@modules/contentful/utils/composable-contentful/src/utils'
import {
  EpFilterAttribute,
  EpFilterOperator,
  EpFilterParams,
  productsByAttributeFetchService,
} from '@modules/ep'
import { createServerSideApp } from '@modules/ssr'
import { matchRoutePattern } from '@modules/utilities/page'
import {
  EpCollectionResponse,
  EpProductInterface,
  getAuthHeaders,
} from '@myplanetdigital/elasticpath'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import router from 'next/router'
import { FunctionComponent } from 'react'

type PageRootProps = {
  host: string
  slug?: string
  isPDP?: boolean
  isPLP?: boolean
  dehydratedState?: any
  variants?: EpProductInterface[]
  product?: EpProductInterface
  taxonomy?: Breadcrumb[]
  routePattern?: any
  query?: any
  notFound?: boolean
  isPreview?: boolean
  data?: ContentfulEntry<ContentfulPLPPage> | any
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Set cache
  context.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${REVALIDATE_DEFAULT}`
  )
  const slug: string = context.params?.slug
    ? (context.params.slug as string[]).join('/')
    : ''
  const host: string =
    (process.env.NEXT_PUBLIC_PROTOCOL || 'http://') +
    (context.req.headers?.host || '')
  console.log(`INFO: generating page data. slug='${slug}'`)
  const isPreview = context?.preview || false

  // Match URL pattern
  if (isStaticPage(slug)) {
    console.log(
      `TRACE: know static page detected. Skipping [...slug]/index.tsx code`
    )
    return {
      props: {
        notFound: true,
      },
    }
  }

  const routePattern = await matchRoutePattern({ slug })
  if (routePattern != null && routePattern.resolver === 'PLP') {
    // PLP
    console.log(
      `INFO: PLP pattern matched. route_pattern='${JSON.stringify(
        routePattern
      )}'`
    )

    // Check Longtail PLP in contentful.
    let pages = await searchContentfulForSlug(
      context,
      [PAGES_TYPES.LONGTAIL_PLP],
      slug
    )
    let found = false
    if (pages && pages?.items?.length > 0) {
      resolveLinks(pages?.items[0].fields, pages.includes[0], 1)
      console.log(
        `TRACE: Contentul entry found entry_id=${pages?.items[0]?.sys?.id}`
      )
      return {
        props: {
          isPLP: true,
          host,
          slug,
          query: context.query,
          routePattern,
          data: pages.items[0],
          isPreview,
        },
      }
    }
    console.log(
      `TRACE: Contentul entry not found. Try to retrieve taxonomy from algolia.`
    )
    let taxonomy = await fetchPLPTaxonomy({
      searchClient,
      routePattern,
      slug,
    })

    return {
      props: {
        isPLP: true,
        host,
        slug,
        query: context.query,
        routePattern,
        taxonomy,
        isPreview,
      },
    }
  }
  if (routePattern == null) {
    // PDP or Generic page - fetch product data
    console.log(`INFO: PLP pattern not matched, checking EP for PDP`)
    const { serverSideApp, elasticPathClient, elasticPathAccessToken } =
      await createServerSideApp({
        context,
        withElasticPathClient: true,
      })
    const headers = {
      ...ELASTIC_PATH_HEADERS_DEFAULT,
      ...getAuthHeaders({ accessToken: elasticPathAccessToken }),
    }
    let product: any = null
    const { queryClient } = serverSideApp

    try {
      const res = await elasticPathClient?.get<
        EpCollectionResponse<EpProductInterface[]>
      >(`/catalog/products?filter=eq(slug,${slug})`, {
        headers,
      })
      if ((res?.data?.data?.length ?? 0) > 0) {
        product = res?.data?.data?.[0]
      }
    } catch (e: any) {
      const logData = e?.response?.data ? e?.response?.data : e
      console.error(
        `Error: couldn't fetch product from EP. slug=${slug}  headers="${JSON.stringify(
          headers
        )}" `,
        logData
      )
    }

    if (product != null) {
      // PDP
      console.log(`INFO: EP product found. product_id=${product.id}`)
      const severtSideAppProps = (await serverSideApp.getStaticProps()).props

      // Fetch Variants
      const variantsSKUs = (
        product?.attributes?.extensions &&
        (product?.attributes?.extensions['products(extended)']
          ?.product_group_related_cymax_product_ids as string)
      )?.split(',')

      let variants: EpProductInterface[] | string | null = null
      if (variantsSKUs != null && variantsSKUs.length > 0) {
        console.log(
          `INFO: fetching variants from EP. variants_skus='${variantsSKUs}'`
        )
        try {
          if (variantsSKUs && elasticPathAccessToken) {
            const res = await productsByAttributeFetchService({
              params: {
                values: variantsSKUs || [],
                filterAttribute: EpFilterAttribute.SKU,
                filterOperator: EpFilterOperator.IN,
                pagination: {
                  params: EpFilterParams.limit,
                  value: 100,
                },
              },
              httpClient: elasticPathClient!,
              headers: ELASTIC_PATH_HEADERS_DEFAULT,
              accessToken: elasticPathAccessToken,
            })
            if ((res?.length || -1) > 0) {
              variants = res
            }
          }
        } catch (e: any) {
          const logData = e?.response?.data ? e?.response?.data : e
          console.error(
            `Error: couldn't fetch product variants from EP. variants_skus='${variantsSKUs}'  headers="${JSON.stringify(
              headers
            )}" `,
            logData
          )
        }
      }

      // Fetch category data from Algolia
      console.log('TRACE: fetching taxonomy from Algolia.')
      let taxonomy: any = []
      try {
        let algoliaRes = await (
          searchClient.initIndex(ALGOLIA_BASE_INDEX) as any
        ).getObject(product.id, {
          hitsPerPage: 1,
          attributesToRetrieve: ['ep_slug_categories', 'ep_categories'],
        })
        console.log(
          `INFO: Taxonomy fetched from Algolia. product_id=${
            product.id
          }, taxonomy_data=${JSON.stringify(algoliaRes)}`
        )
        Object.keys(algoliaRes.ep_slug_categories).forEach((level, index) => {
          let name = algoliaRes.ep_categories[level]
          const nameIndex = name.lastIndexOf(' > ')
          name = name.substring(nameIndex > 0 ? nameIndex + 3 : 0)
          let slug = algoliaRes.ep_slug_categories[level]
          const slugIndex = slug.lastIndexOf(' > ')
          slug = slug.substring(slugIndex > 0 ? slugIndex + 3 : 0)
          taxonomy.push({
            name,
            slug,
            position: index + 1,
            item: host + '/' + slug,
          })
        })
        console.log(
          `TRACE: parsed taxonomy taxonomy=${JSON.stringify(taxonomy)}`
        )
      } catch (e) {
        console.error(
          `ERROR: An error ocurred when fetching the taxonomy from algolia for product_id=${product.id}`,
          e
        )
      }

      // Render page
      return {
        props: {
          ...severtSideAppProps,
          host,
          isPDP: true,
          variants,
          product,
          taxonomy,
          isPreview,
        },
      }
    }
  }

  console.log(`TRACE:  product not found in EPCC for slug ${slug}`)
  console.log(
    'TRACE: EPCC product not found searching Contentful for generic page'
  )
  // Generic Page
  let pages = await searchContentfulForSlug(
    context,
    Object.values(PAGES_TYPES),
    slug
  )
  let notFound = true
  if (pages && pages?.items?.length > 0) {
    resolveLinks(pages?.items[0].fields, pages.includes[0], 1)
    console.log(
      `TRACE: Contentul entry found entry_id=${pages?.items[0]?.sys?.id}`
    )
  }
  notFound = Boolean(!pages?.items?.length)
  if (notFound) {
    console.log(`TRACE:  page not found for ${context.req.headers?.referer}`)
  }
  const ctfEntry = pages?.items[0] || null
  return {
    props: {
      isPLP: ctfEntry?.sys?.contentType?.sys?.id === 'plp',
      host,
      slug,
      query: context.query,
      routePattern,
      data: pages?.items[0] || null,
      isPreview: isPreview || false,
      notFound,
      revalidate: REVALIDATE_DEFAULT,
    },
  }
}

function isStaticPage(slug: string): boolean {
  const staticPagesStarts: string[] = ['favicon.ico']
  if (!slug) {
    return false
  }
  // All sitemap.xml variants
  if (staticPagesStarts.find((str) => slug.indexOf(str) === 0)) {
    return true
  }
  return false
}

const Page: FunctionComponent<PageRootProps> = (props) => {
  const {
    data,
    isPreview,
    query,
    slug,
    routePattern,
    isPLP,
    isPDP,
    product,
    host,
    taxonomy,
    variants,
    notFound,
  } = props
  if (!global.window) {
    return <></>
  }

  if (isPLP) {
    return (
      <ProductListingPage
        isSearchPage={false}
        host={host}
        slug={slug}
        query={query}
        routePattern={routePattern}
        taxonomy={taxonomy}
        ctfEntry={data}
        isPreview={isPreview}
      />
    )
  }

  if (isPDP) {
    return (
      <ProductDetailsPage
        product={product}
        host={host}
        taxonomy={taxonomy}
        variants={variants}
      />
    )
  }

  if (notFound) {
    router.push(paths.HOME)
  }

  // Generic Page
  const pageType = data?.sys?.contentType?.sys?.id

  return (
    <>
      {pageType === PAGES_TYPES.GENERIC ? (
        <GenericPage data={data} isPreview={isPreview} />
      ) : (
        <GenericPageWithMenu data={data} isPreview={isPreview} />
      )}
    </>
  )
}

async function searchContentfulForSlug(
  context: GetServerSidePropsContext,
  pageTypes: Array<string>,
  slug?: string
) {
  const isPreview = context?.preview
  const client = new ContentfulHandler(isPreview)

  let pages

  try {
    // have to do this since Contentful REST API doesn't allow to filter both on content type, site and slug https://github.com/contentful/contentful.js/issues/424
    const res = await Promise.all(
      pageTypes.map((type: string) =>
        client.getPage({
          pageContentType: type,
          slug: slug,
          locale: context?.locale,
          limit: 1,
        })
      )
    )
    pages = {
      items: res.flatMap((i) => i?.items),
      includes: res.flatMap((i) => i?.includes).filter((i) => i),
    }
  } catch (e) {
    console.error(
      `Error fetching the page for slug="${context?.params?.slug}"`,
      e
    )
  }

  return pages
}

export default Page
