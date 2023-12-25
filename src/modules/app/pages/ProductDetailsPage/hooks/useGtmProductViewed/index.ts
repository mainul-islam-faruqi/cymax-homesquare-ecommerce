import { EpFlowFieldValue, EpProductInterface } from '@modules/ep'
import { productDetailsPageView, productViewed } from '@modules/gtm'
import { useEffect } from 'react'

type useGtmProductViewedProps = {
  brandName?: EpFlowFieldValue
  sku?: string
  name?: string
  variant?: EpFlowFieldValue
  categoryName?: EpFlowFieldValue
  product?: EpProductInterface
  currency?:string
  discount:number
}

export const useGtmProductViewed = ({
  brandName,
  sku,
  name,
  variant,
  categoryName,
  product,
  discount
}: useGtmProductViewedProps) => {
  useEffect(() => {
    const price =
      product?.meta?.display_price?.with_tax?.amount ||
      product?.meta?.display_price?.without_tax?.amount
    if (
      sku &&
      name &&
      price &&
      variant !== undefined &&
      categoryName !== undefined &&
      brandName !== undefined
    ) {
      productViewed({
        ecommerce: {
          currency: product?.meta?.display_price?.without_tax?.currency as string,
          value: parseFloat((price! / 100)?.toFixed(2)),
            items: [
              {
                item_id: sku,
                item_name: name,
                price: parseFloat((price! / 100)?.toFixed(2)),
                item_brand: brandName as string,
                item_category: categoryName as string,
                discount : discount < 0 ? 0 : discount / 100
              },
            ],
          
        },
      })
      productDetailsPageView({
        ecomm_pagetype: 'product',
        ecomm_prodid: sku,
        ecomm_pname: name,
        ecomm_pvalue: parseFloat((price! / 100)?.toFixed(2)),
      })
    }
  }, [brandName, sku, name, , variant, categoryName, product])
}
