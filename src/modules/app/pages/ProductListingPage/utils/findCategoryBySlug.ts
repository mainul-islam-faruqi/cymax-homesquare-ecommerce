/* eslint-disable no-console */
import { CymaxAlgoliaProduct } from '@modules/algolia'
import { strIndexOfLowercase } from '@modules/app/utils/strIndexOfLowercase'

export type findCategoryBySlugReturn = {
  name: string
  slug: string
  levelKey: string
}

export function findCategoryBySlug(
  record: CymaxAlgoliaProduct,
  slug: string
): findCategoryBySlugReturn | null {
  // Iterate all categories
  const levels = Object.keys(record.ep_slug_categories)
  for (let i: number = 0; i < levels.length; i++) {
    const names = record.ep_categories[levels[i]]
    const slugs = record.ep_slug_categories[levels[i]]
    if (Array.isArray(slugs)) {
      for (let i2 = 0; i2 < slugs.length; i2++) {
        let slugStr = slugs[i2]
        if (strIndexOfLowercase(slugStr, slug) >= 0) {
          return {
            name: names[i2],
            slug: slugStr,
            levelKey: levels[i],
          }
        }
      }
    } else if (strIndexOfLowercase(slugs as string, slug) >= 0) {
      return {
        name: names as string,
        slug: slugs as string,
        levelKey: levels[i],
      }
    }
  }
  return null
}
