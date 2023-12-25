export const megaMenuItemFragment = /* GraphQL */ `
  fragment megaMenuItem on MegaMenuItem {
    sys {
      id
    }
    name
    link {
      ... on Cta {
        ...cta
      }
    }
    variant(locale: $locale)
    description(locale: $locale)
    imagesCollection(locale: $locale) {
      items {
        title(locale: $locale)
        description(locale: $locale)
        url(locale: $locale)
      }
    }
  }
`
