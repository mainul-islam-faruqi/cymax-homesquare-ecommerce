import {
  EpFilterParams,
  useGetMultipleStocks,
  useProductsByAttribute,
} from '@modules/ep'
import {
  EpFilterAttribute,
  EpFilterOperator,
} from '@myplanetdigital/elasticpath'
import { useMemo } from 'react'

type PickerOptionsProps = {
  productSKUs?: string[]
}

export const usePickerOptions = ({ productSKUs }: PickerOptionsProps) => {
  const { products: productsByAttribute } = useProductsByAttribute({
    values: productSKUs || [],
    filterAttribute: EpFilterAttribute.SKU,
    filterOperator: EpFilterOperator.IN,
    pagination: {
      params: EpFilterParams.limit,
      value: 100,
    },
  })

  const productsId = useMemo(() => {
    return productsByAttribute?.map((item) => ({ id: item.id })) || []
  }, [productsByAttribute])

  const { stocks, isLoading } = useGetMultipleStocks(productsId)

  const pickerOptions = useMemo(() => {
    return productsByAttribute
      ?.map((item) => {
        const productsProps =
          item?.attributes?.extensions?.['products(extended)']
        const stock_available =
          stocks?.find((st) => st?.id === item?.id)?.available || 0

        return {
          id: item?.id,
          slug: item?.attributes?.slug,
          label: String(productsProps?.productgroupvariation),
          image_url: (productsProps?.image_list as string)?.split(',')[0],
          stock_available,
        }
      })
      ?.sort((a, b) => b?.stock_available - a?.stock_available)
  }, [productsByAttribute, stocks])

  return { pickerOptions: !isLoading ? pickerOptions : [] }
}
