import { NEXT_PUBLIC_SITE_IDENTIFIER } from '@modules/app'
import ContentfulHandler from '../utils/composable-contentful/src'
import {
  deepCopy,
  resolveLinks,
} from '../utils/composable-contentful/src/utils'

let FOOTER_METADATA = null

const FOOTER_FIELDS_TO_COPY = [
  'name',
  'copyright',
  'legals',
  'site',
  'socialIcons',
  'linkMenus',
]

// create map function to copy menu entries without going to deep
const copyFooter = (object: any) => {
  if (object?.sys?.contentType?.sys?.id === 'footer') {
    const fields = {
      name: object?.fields?.name ?? null,
      copyright: object?.fields?.copyright ?? null,
      legals: object?.fields?.legals ?? null,
      site: object?.fields?.site ?? null,
      socialIcons: object?.fields?.socialIcons,
      linkMenus: object?.fields?.linkMenus,
    }

    const target = {
      sys: { id: object?.sys?.id ?? null },
      fields,
    }

    return target
  }

  if (object?.sys?.contentType?.sys?.id === 'cta') {
    return deepCopy(object)
  }

  if (object?.sys?.type === 'Asset') {
    return {
      fields: {
        file: {
          url: object?.fields?.file?.url,
        },
      },
    }
  }
  const fields: any = {}
  FOOTER_FIELDS_TO_COPY.forEach((field) => {
    if (field in (object?.fields ?? {})) {
      fields[field] = object.fields[field]
    }
  })

  const target = {
    sys: {
      contentType: object?.sys?.contentType ?? null,
    },
    fields,
  }

  return target
}

export const getFooter = async () => {
  try {
    const client = new ContentfulHandler()

    const globalFooter = await client.getEntriesWithSpecificFields(
      'footer',
      '',
      [],
      [
        { name: 'name', value: 'global-footer' },
        { name: 'site', value: NEXT_PUBLIC_SITE_IDENTIFIER ?? '' },
      ],
      null,
      1
    )

    if ((globalFooter?.total ?? 0) === 0) {
      console.error('Could not retrieve global footer data')
      FOOTER_METADATA = null
    } else {
      FOOTER_METADATA = globalFooter
    }

    resolveLinks(FOOTER_METADATA, FOOTER_METADATA?.includes, 0, 10, copyFooter)

    return FOOTER_METADATA?.items?.[0] || null
  } catch (e) {
    console.error(e)
    return null
  }
}
