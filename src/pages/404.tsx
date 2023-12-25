import ContentfulHandler from '@modules/contentful/utils/composable-contentful/src'
import { resolveLinks } from '@modules/contentful/utils/composable-contentful/src/utils'
import { GetStaticProps } from 'next'
import { REVALIDATE_DEFAULT } from '@modules/app/public-config'
import { NOT_FOUND_PAGE } from '@modules/app'
import { NotFoundPage } from '@modules/contentful/pages/NotFoundPage'

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = process.env.LANGUAGE
  const isPreview = context?.preview
  let page
  try {
    const client = new ContentfulHandler(isPreview)
    const res = await client.getPage({
      pageContentType: 'genericPage',
      slug: NOT_FOUND_PAGE,
      locale: locale,
    })
    if (res?.items?.length > 0) {
      page = res.items[0]
      resolveLinks(page.fields, res.includes, 1)
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching the Home Page: ${e} `)
  }
  return {
    props: {
      data: page || null,
      isPreview: isPreview || false,
    },
    revalidate: REVALIDATE_DEFAULT,
  }
}

export default NotFoundPage
