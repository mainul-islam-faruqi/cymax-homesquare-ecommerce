import { ALGOLIA_BASE_INDEX, CymaxAlgoliaProduct } from '@modules/algolia'
import { Breadcrumb } from '@modules/components/BreadcrumbsHierarchy'
import { buildTaxonomyFromFoundCategory } from './buildTaxonomyFromFoundCategory'
import { findCategoryBySlug } from './findCategoryBySlug'

/* eslint-disable no-console */
export async function fetchPLPTaxonomy({
  searchClient,
  routePattern,
  slug,
}: {
  searchClient: any
  routePattern: any
  slug: string
}) {
  if (!searchClient || !routePattern || !slug) {
    return null
  }
  if (routePattern.type === 'collection') {
    console.log('TRACE: fetching PLP Taxonomy from Algolia for collection page')
    // For colection remove the --* from the slug
    const slug2Match = slug.substring(0, slug.indexOf('--'))
    try {
      const algoliaResult = await (
        searchClient.initIndex(ALGOLIA_BASE_INDEX) as any
      ).findObject(
        (hit: any) =>
          (hit[routePattern.slugFacet] || '').indexOf(slug2Match) >= 0,
        {
          query: slug2Match,
          hitsPerPage: 5,
          paginate: false,
          attributesToRetrieve: [
            routePattern.slugFacet,
            routePattern.descriptionFacet,
            'brand',
          ],
        }
      )
      if (algoliaResult?.object != null) {
        // Record found with given collection name
        const taxonomy: Breadcrumb[] = []
        taxonomy.push({
          name: algoliaResult.object.collectionName,
          slug: slug,
        })
        routePattern.facetsToApply = [
          `collectionName:"${algoliaResult.object.collectionName}" AND brand:"${algoliaResult.object.brand}"`,
        ]
        routePattern.title = algoliaResult.object.collectionName
        return taxonomy
      }
    } catch (e) {
      console.error(
        `TRACE: No result found in algolia for collectionSlug="${slug2Match}"`,
        e
      )
    }
    return null
  } else if (routePattern.type === 'category') {
    console.log('TRACE: fetching PLP Taxonomy from Algolia for category page')
    try {
      // const parsedSlug = slug.substring(0, slug.indexOf('--')+2)
      const parsedSlug = slug
      let algoliaResult = await (
        searchClient.initIndex(ALGOLIA_BASE_INDEX) as any
      ).findObject(
        (hit: CymaxAlgoliaProduct) =>
          findCategoryBySlug(hit, parsedSlug) != null,
        {
          query: parsedSlug,
          hitsPerPage: 5,
          paginate: false,
          attributesToRetrieve: [
            routePattern.slugFacet,
            routePattern.descriptionFacet,
          ],
        }
      )
      if (algoliaResult?.object != null) {
        console.log(`TRACE: result found for category`)
        let taxonomy: Breadcrumb[] = []
        algoliaResult = algoliaResult.object
        const category = findCategoryBySlug(algoliaResult, parsedSlug)
        if (category != null) {
          taxonomy = buildTaxonomyFromFoundCategory(category)
          const lastIndex = category.name.lastIndexOf(' > ')
          routePattern.title = category.name.substring(
            lastIndex > 0 ? lastIndex + 3 : 0
          )
          routePattern.facetsToApply = [
            `ep_categories.${category?.levelKey}:"${category.name}"`,
          ]
          return taxonomy
        }
      }
    } catch (e) {
      console.error('ERRROR: when fetching taxonomy for category page', e)
    }
  }
  return []
}
