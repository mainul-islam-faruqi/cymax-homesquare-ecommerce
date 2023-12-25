import { ctaFragment, megaMenuItemFragment } from '../fragments'

/* The 'limit' param in megaMenuCollection() should be the number of megaMenu
entries in Contentful. In most case this will be 2 - 1 for the header menu
and one for the footer menu. */
export const getMegaMenuQuery = /* GraphQL */ `
  query getMegaMenu($locale: String, $site: String) {
    megaMenuCollection(where: { site: $site }, limit: 4) {
      items {
        name
        site
        itemsCollection(limit: 11) {
          items {
            ...megaMenuItem
          }
        }
      }
    }
  }
  ${ctaFragment}
  ${megaMenuItemFragment}
`
