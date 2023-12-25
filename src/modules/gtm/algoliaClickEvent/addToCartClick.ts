import { cartQuery, gtmPush } from '..'

export const addToCartClickAlgolia = (payload: cartQuery) => {
  gtmPush('algoliaItemCartAdd', payload)
}

