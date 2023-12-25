import { Cache } from '@modules/cache'
import { getFacetsNames } from 'pages/api/algolia/facets-names'

export const brandsCache = new Cache()

export async function addBrandNamesCacheEntry() {
  await brandsCache.addEntry('brandNames', getFacetsNames)
}
