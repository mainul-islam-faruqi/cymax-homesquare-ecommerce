import { NextSeo } from 'next-seo'
import { FunctionComponent } from 'react'
import { MetaTag, PageSEO } from '../../types'

export const SEO: FunctionComponent<PageSEO> = ({
  title,
  description,
  keywords,
  no_index,
  no_follow,
  metaTags,
}) => {
  const metaTagsData: MetaTag[] = metaTags?.map((tag) => {
    return {
      name: tag.fields.name,
      content: tag.fields.content,
    }
  })

  if (keywords && keywords.length) {
    const keyWordsAsString = keywords.join(', ')

    metaTagsData.push({ name: 'keywords', content: keyWordsAsString })
  }

  return (
    <NextSeo
      title={title || undefined}
      description={description || undefined}
      additionalMetaTags={metaTagsData}
      noindex={no_index}
      nofollow={no_follow}
    />
  )
}
