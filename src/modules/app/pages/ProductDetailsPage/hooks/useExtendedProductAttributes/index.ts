import {
  formatShippingDate,
  formatShippingObject,
  getImageGallery
} from '@modules/app/utils'
import { EpFlowFieldsInterface } from '@myplanetdigital/elasticpath'
import { useMemo } from 'react'

type ExtendedProductAttributesProps = {
  extensions?: {
    [key: string]: EpFlowFieldsInterface
  }
  name?: string
}

export const useExtendedProductAttributes = ({
  extensions,
  name,
}: ExtendedProductAttributesProps) => {
  return useMemo(() => {
    const productsProps = extensions && extensions['products(extended)']
    const imageGallery = getImageGallery(productsProps, name)
    const productSKUs = (
      productsProps?.product_group_related_cymax_product_ids as string
    )?.split(',')

    return {
      productSKUs,
      productGroupName: productsProps?.productgroupname,
      shippingDayFrom: formatShippingDate(productsProps?.shipping_days_from),
      shippingDaysTo: formatShippingDate(productsProps?.shipping_days_to),
      shippingOptions: formatShippingObject(
        productsProps?.shipping_upgrade_options
      ),
      assemblyGuides: (productsProps?.assembly_guides as string)?.split(','),
      finish: productsProps?.finish_name,
      material: productsProps?.primarymaterial,
      style: productsProps?.primarystyle,
      warranty: productsProps?.warranty,
      brandAbout: productsProps?.brand_about,
      height: productsProps?.height,
      width: productsProps?.width,
      length: productsProps?.length,
      productWeight: productsProps?.product_weight,
      imageGallery,
      setQty: productsProps?.setqty
        ? parseInt(String(productsProps?.setqty), 10)
        : 1,
      minQty: productsProps?.minqty
        ? parseInt(String(productsProps?.minqty), 10)
        : 1,
      similarProducts: (productsProps?.similar_products as string)?.split(','),
      brandName: productsProps?.brand_name,
      categoryName: productsProps?.categoryname,
      variant: productsProps?.productgroupvariation,
      categoryPath: productsProps?.categorypath,
      manufactureOriginalId: productsProps?.manufacturer_id,
    }
  }, [extensions, name])
}
