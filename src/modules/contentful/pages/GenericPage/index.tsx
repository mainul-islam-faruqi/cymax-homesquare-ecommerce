import { Breadcrumb } from '@modules/components'
import { ComponentResolver } from '@modules/contentful'
import { useGtmPageView } from '@modules/gtm'
import { FunctionComponent } from 'react'
import { PreviewBanner } from '../PageBlocks/PreviewBanner'
import { SEO } from '../PageBlocks/SEO'
import { ContentfulGenericPageProps } from '../types'

export const GenericPage: FunctionComponent<ContentfulGenericPageProps> = ({
  data,
  isPreview,
}) => {
  const pageItems = data?.fields.items
  const pageSlug = data?.fields?.slug

  useGtmPageView({
    ecomm_pagetype: String(pageSlug) === 'homepage' ? 'home-page' : '',
  })

  return (
    <>
      <SEO
        {...data?.fields?.seo?.fields}
        title={data?.fields?.seo?.fields?.title || data?.fields?.title}
      />
      {isPreview && <PreviewBanner />}
      {!['homepage', '404'].includes(pageSlug) && (
        <Breadcrumb
          items={[
            {
              slug: data?.fields?.slug,
              title: data?.fields?.title,
              contentType: data?.sys?.contentType?.sys?.id,
            },
          ]}
        />
      )}
      <ComponentResolver items={pageItems} />
    </>
  )
}
