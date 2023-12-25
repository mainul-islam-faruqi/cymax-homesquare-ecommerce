/* eslint-disable no-console */
import {
  ELASTIC_PATH_DEFAULT_CATALOG_ID,
  ELASTIC_PATH_HEADERS_DEFAULT,
} from '@modules/app'
import {
  EpFilterParams,
  EpStockInterface,
  getProductStockById,
  getUseProductBySlugKey,
  getUseProductsByAttributeKey,
  productsByAttributeFetchService,
  stockFetchService,
} from '@modules/ep'
import { createServerSideApp, ServerSideAppParams } from '@modules/ssr'
import {
  EpCollectionResponse,
  EpFilterAttribute,
  EpFilterOperator,
  EpProductInterface,
  getAuthHeaders,
} from '@myplanetdigital/elasticpath'

export const serverSideProductDetailsPage = async ({
  context,
}: ServerSideAppParams) => {
  const { serverSideApp, elasticPathClient, elasticPathAccessToken } =
    await createServerSideApp({
      context,
      withElasticPathClient: true,
    })

  const { queryClient } = serverSideApp
  const slug = context.query.slug?.toString()

  let product: EpProductInterface | null = null
  try {
    // Rewriting the Composable code to include the "default_catalog_id" param. A PR to include this option will be added to Composable
    if (slug && elasticPathClient) {
      const res = await elasticPathClient.get<
        EpCollectionResponse<EpProductInterface[]>
      >(
        `/pcm/catalog/products?filter=eq(slug,${slug})&default_catalog_id=${ELASTIC_PATH_DEFAULT_CATALOG_ID}`,
        {
          headers: {
            ...ELASTIC_PATH_HEADERS_DEFAULT,
            ...getAuthHeaders({ accessToken: elasticPathAccessToken }),
          },
        }
      )
      if (res?.data?.data?.length > 0) {
        product = res.data.data[0]
      }
    }
    // Original code. To be enabled once a new version is published
    // [product] = await Promise.all([
    //   productBySlugFetchService({
    //     httpClient: elasticPathClient!,
    //     params: { slug , default_catalog_id: 'b26c70a6-f85b-4fb3-a7be-e4849f7f0bcb'},
    //     headers: ELASTIC_PATH_HEADERS_DEFAULT,
    //     accessToken: elasticPathAccessToken,
    //   }),
    // ])
  } catch (e: any) {
    if (e?.response?.data) {
      console.error(e.response.data)
    } else {
      console.error(e)
    }
  }

  let stock: EpStockInterface

  try {
    if (product?.id && elasticPathAccessToken) {
      const res = await stockFetchService({
        params: {
          productId: product?.id,
        },
        httpClient: elasticPathClient!,
        headers: ELASTIC_PATH_HEADERS_DEFAULT,
        accessToken: elasticPathAccessToken,
      })
      if (res?.data) {
        stock = res
      }
    }
  } catch (e: any) {
    if (e?.response?.data) {
      console.error(e.response.data)
    } else {
      console.error(e)
    }
  }

  const productValues = (
    product?.attributes?.extensions &&
    (product?.attributes?.extensions['products(extended)']
      ?.product_group_related_cymax_product_ids as string)
  )?.split(',')

  let productSKUs: EpProductInterface[] | null | string = null

  try {
    if (productValues && elasticPathAccessToken) {
      const res = await productsByAttributeFetchService({
        params: {
          values: productValues || [],
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
      if (res && res?.length > 0) {
        productSKUs = res
      }
    }
  } catch (e: any) {
    if (e?.response?.data) {
      console.error(e.response.data)
    } else {
      console.error(e)
    }
  }

  await Promise.all([
    queryClient.prefetchQuery(
      getUseProductBySlugKey({ slug, headers: ELASTIC_PATH_HEADERS_DEFAULT }),
      () => product
    ),
    queryClient.prefetchQuery(
      getProductStockById({
        headers: ELASTIC_PATH_HEADERS_DEFAULT,
        productId: product?.id,
      }),
      () => stock
    ),
    queryClient.prefetchQuery(
      getUseProductsByAttributeKey({
        headers: ELASTIC_PATH_HEADERS_DEFAULT,
        values: productValues || [],
        filterAttribute: EpFilterAttribute.SKU,
        filterOperator: EpFilterOperator.IN,
        pagination: {
          params: EpFilterParams.limit,
          value: 100,
        },
      }),
      () => productSKUs
    ),
  ])

  const notFound = Boolean(!product)

  return {
    getServerSidePropsValue: async () => {
      const staticProps = await serverSideApp.getStaticProps()
      return {
        props: staticProps.props,
        notFound,
      }
    },
  }
}
