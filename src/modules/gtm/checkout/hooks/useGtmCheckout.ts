import { orderSummaryData } from '@modules/app/utils'
import { EpCartItemInterface } from '@modules/ep'
import { useCart } from '@myplanetdigital/elasticpath'
import { checkoutStarted } from '..'


export const useGtmCheckoutStarted = () => {
  const { cart } = useCart()
  const handleGTMCheckoutStarted = () => {
    const products = cart.data?.filter(
      (item) => (item.type as string) === 'cart_item'
    )
    const {total, total_without_tax , shipping } = orderSummaryData(cart)
    if (!products) {
      return
    }
    const promotions = cart?.data?.filter(item => item.type === 'promotion_item') || [];
if (promotions.length > 0) {
     var promoSKU = promotions[0].sku;
}

const items = products?.map((item: EpCartItemInterface) => {
  const discounts = Object.keys(item?.meta?.display_price?.discounts || {});
  const couponValue = discounts.length == 0 ? promoSKU : discounts[0];
  return {
      item_name: item.name,
      item_id: item.sku,
      quantity: item.quantity,
      item_brand: item?.custom_inputs?.brand,
      item_category: item?.custom_inputs?.category?.valueOf() as string,
      coupon: couponValue,
      discount: (
          (item.custom_inputs?.price?.original_display_price?.without_tax?.amount ?? 0) === 0
              ? 0
              : ((item.custom_inputs?.price?.original_display_price?.without_tax?.amount ?? 0) -
                 (item.custom_inputs?.price?.display_price?.without_tax?.amount ?? 0)) / 100
      ),
      price: parseFloat((item?.unit_price?.amount / 100)?.toFixed(2))
  };
});


    checkoutStarted({
      ecommerce : {
        couponDiscount: Math.abs((cart?.meta?.display_price.discount.amount || 0)/100),
        coupon: items[0]?.coupon || '',
         value:  (total?.amount || 0)/100 ,
          currency: total_without_tax?.currency || "",
          items:items,
          shipping:(shipping?.amount || 0)/100
           
      },
    })
  }

  return { handleGTMCheckoutStarted } 
}


