import { gtmPush, QueryItem } from '..'

export const CheckoutClickAlgolia = (payload: QueryItem[]) => {
  gtmPush('algoliaItemCartAdd', payload)
}

