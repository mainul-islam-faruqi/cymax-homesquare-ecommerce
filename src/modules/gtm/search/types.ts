export type Items = {
  item_id: string
  item_name: string
  affiliation: string
  coupon: string
  discount: number
  index: number
  item_brand: string
  item_variant: string
  location_id: string
  price: number
  quantity: number
}

/**
 * * viewItemList gtm event
 **/

export type ViewItemListGTM = {
  ecommerce: {
    item_list_id?: string
    item_list_name?: string
    items: Items[]
  }
}


export type SearchGTM = {
  search_term: string,
  page_details:string,
  loginstatus: string
}
