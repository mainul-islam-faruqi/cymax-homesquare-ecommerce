import { Bundle, BundleComponents } from '@modules/app'
import { useProductsById } from '@modules/ep'
import {
  EpProductAttributes,
  EpProductInterface,
} from '@myplanetdigital/elasticpath'
import { useMemo } from 'react'

export const useBundles = (product?: EpProductInterface) => {
  const bundles = useMemo(() => {
    const attributes = product?.attributes as EpProductAttributes & {
      components?: BundleComponents
    }
    const list = attributes?.components?.IncludedItems?.options || []

    const ids = list?.map((item) => item.id) || []

    return { list, ids }
  }, [product?.attributes])

  const { products: productsBundleList } = useProductsById(bundles.ids)

  const bundleOptions: Bundle[] = useMemo(() => {
    const links =
      productsBundleList?.map((item) => {
        const { extensions } = item?.attributes ?? {}
        const productExtended = extensions?.['products(extended)']

        const quantity = bundles?.list?.find(
          (bundle) => bundle?.id === item?.id
        )?.quantity
        const imageUrl = (productExtended?.image_list as string)?.split(',')[0]
        const brand = (productExtended?.brand_name ?? '') as string
        const category = (productExtended?.categoryname ?? '') as string
        const variant = (productExtended?.productgroupvariation ?? '') as string
        const price =
          item?.meta?.display_price?.without_tax?.amount ??
          (item?.meta?.display_price as any)?.with_tax?.amount

        return {
          id: item?.attributes?.sku,
          name: item?.attributes?.name,
          slug: item?.attributes?.slug,
          url: imageUrl,
          brand,
          category,
          variant,
          price: parseFloat((price! / 100).toFixed(2)),
          quantity: (quantity as number) || 0,
        }
      }) || []

    return links
  }, [productsBundleList, bundles])

  const data =
    bundleOptions?.length > 0 &&
    bundleOptions?.every((item) => item?.id) &&
    bundleOptions

  return {
    bundles: data || [],
  }
}
