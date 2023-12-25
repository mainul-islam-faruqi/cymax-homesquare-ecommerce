export const ctaFragment = /* GraphQL */ `
  fragment cta on Cta {
    sys {
      id
    }
    name(locale: $locale)
    label(locale: $locale)
    linkToEntry {
      ... on GenericPage {
        slug
      }
      ... on GenericPageWithMenu {
        slug
      }
      __typename
    }
    url(locale: $locale)
    params(locale: $locale)
    variant(locale: $locale)
  }
`
