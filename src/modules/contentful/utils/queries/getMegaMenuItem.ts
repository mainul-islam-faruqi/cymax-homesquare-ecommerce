import { megaMenuItemFragment, ctaFragment } from '../fragments'

export const getMegaMenuItemQuery = /* GraphQL */ `
  query getMegaMenuItem($id: String!, $locale: String) {
    megaMenuItem(id: $id) {
      ...megaMenuItem
      childrenCollection {
        items {
          ...megaMenuItem
        }
      }
    }
  }
  ${ctaFragment}
  ${megaMenuItemFragment}
`
