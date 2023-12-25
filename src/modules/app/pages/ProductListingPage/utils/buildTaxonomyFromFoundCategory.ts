import { Breadcrumb } from '@modules/components/BreadcrumbsHierarchy'
import { findCategoryBySlugReturn } from './findCategoryBySlug'

export function buildTaxonomyFromFoundCategory(
  category: findCategoryBySlugReturn
): Breadcrumb[] {
  const taxonomy = []
  const names = category.name.split(' > ')
  const slugs = category.slug.split(' > ')
  for (let i: number = 0; i < names.length; i++) {
    taxonomy.push({
      name: names[i],
      slug: slugs[i],
    })
  }
  return taxonomy
}
