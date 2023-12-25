import { REVALIDATE_DEFAULT } from '@modules/app/public-config'
import { GenericPage } from '@modules/contentful/pages/GenericPage'
import ContentfulHandler from '@modules/contentful/utils/composable-contentful/src'
import { resolveLinks } from '@modules/contentful/utils/composable-contentful/src/utils'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = 'homepage'
  const locale = process.env.LANGUAGE
  const isPreview = context?.preview
  let page
  let notFound = true
  try {
    const client = new ContentfulHandler(isPreview)

    const res = await client.getPage({
      pageContentType: 'genericPage',
      slug: slug,
      locale: locale,
    })
    if (res?.items?.length > 0) {
      page = res.items[0]
      resolveLinks(page.fields, res.includes, 1)
    }
    notFound = Boolean(!page)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching the Home Page: ${e} `)
  }

  const result = {
    props: {
      data: page || null,
      isPreview: isPreview || false,
    },
    notFound,
    revalidate: REVALIDATE_DEFAULT,
  }

  return result
}

export default GenericPage
