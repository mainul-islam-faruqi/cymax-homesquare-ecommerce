import { ComponentResolver } from '@modules/contentful'
import { FunctionComponent } from 'react'
import { NotFound, NOT_FOUND_PAGE } from '@modules/app/pages'
import { ContentfulGenericPageProps } from '../types'
import { SEO } from '../PageBlocks/SEO'
import { useRouter } from 'next/router'

export const NotFoundPage: FunctionComponent<ContentfulGenericPageProps> = ({
  data,
}) => {
  const { replace, asPath } = useRouter()

  if (asPath !== '/404') {
    typeof window !== 'undefined' && replace(NOT_FOUND_PAGE)
  }

  const pageItems = data?.fields.items
  return (
    <>
      <SEO {...data?.fields?.seo?.fields} title={data?.fields?.title} />
      <NotFound>
        <ComponentResolver items={pageItems} />
      </NotFound>
    </>
  )
}
