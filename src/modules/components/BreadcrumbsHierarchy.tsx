import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { getLinkTarget } from '@modules/app/utils'
import { ContentfulCTA, ContentfulEntry } from '@modules/contentful/pages/types'
import NextLink from 'next/link'
import { useMemo } from 'react'

export interface BreadcrumbProps {
  taxonomy?: any
  productName?: string
  ctfBreadcrumbs?: ContentfulEntry<ContentfulCTA>[]
}

export interface Breadcrumb {
  name: string
  slug: string
}

export const BreadcrumbsHierarchy = ({
  taxonomy,
  ctfBreadcrumbs,
}: BreadcrumbProps) => {
  const breadCrumbArray: Breadcrumb[] = useMemo(() => {
    if (ctfBreadcrumbs != null) {
      return ctfBreadcrumbs.map((cta: ContentfulEntry<ContentfulCTA>) => ({
        name: cta.fields.label,
        slug: getLinkTarget(cta.fields)?.href,
      }))
    }
    return taxonomy
  }, [taxonomy, ctfBreadcrumbs])
  return (
    <ChakraBreadcrumb
      color="theme.textMuted"
      fontSize={{ base: 'sm', md: 'base' }}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      {breadCrumbArray?.map(
        (breadcrumb: Breadcrumb, idx: number) =>
          !!breadcrumb?.slug && (
            <BreadcrumbItem
              key={breadcrumb.name}
              isCurrentPage={idx >= breadCrumbArray.length - 1}
            >
              <NextLink href={breadcrumb?.slug}>
                <BreadcrumbLink href={breadcrumb?.slug}>
                  {breadcrumb.name}
                </BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          )
      )}
    </ChakraBreadcrumb>
  )
}
