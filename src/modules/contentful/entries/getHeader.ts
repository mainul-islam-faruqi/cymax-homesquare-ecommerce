import { NEXT_PUBLIC_SITE_IDENTIFIER } from '@modules/app'
import ContentfulHandler from '../utils/composable-contentful/src'
import {
  deepCopy,
  resolveLinks,
} from '../utils/composable-contentful/src/utils'

let HEADER_METADATA = null

const HEADER_FIELDS_TO_COPY = [
  'name',
  'searchText',
  'site',
  'promotionalText',
  'linkMenus',
]

// create map function to copy menu entries without going to deep
const copyHeader = (object: any) => {
  if (object?.sys?.contentType?.sys?.id === 'header') {
    const fields = {
      name: object?.fields?.name ?? null,
      searchText: object?.fields?.searchText ?? null,
      promotionalText: object?.fields?.promotionalText ?? null,
      site: object?.fields?.site ?? null,
    }

    const target = {
      sys: { id: object?.sys?.id ?? null },
      fields,
    }

    return target
  }

  const types = ['cta', 'iconText', 'image']
  if (types.includes(object?.sys?.contentType?.sys?.id)) {
    return deepCopy(object)
  }

  if (
    ['genericPage', 'genericPageWithMenu'].includes(
      object?.sys?.contentType?.sys?.id
    )
  ) {
    return object
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
  HEADER_FIELDS_TO_COPY.forEach((field) => {
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

export const getHeader = async () => {
  try {
    const client = new ContentfulHandler()

    const headerFields = [
      'fields.name',
      'fields.searchText',
      'fields.site',
      'fields.promotionalText',
      'fields.linkMenus',
    ]

    // This will retrieve all the global menus in one call; we're also restricting the fields
    // here to try and reduce transmission and parse time
    const globalHeader = await client.getEntriesWithSpecificFields(
      'header',
      headerFields.join(','),
      [],
      [{ name: 'site', value: NEXT_PUBLIC_SITE_IDENTIFIER || '' }],
      { name: 'name', value: 'global-header' },
      null,
      0,
      '',
      5
    )
    if ((globalHeader?.total ?? 0) === 0) {
      console.error('Could not retrieve global footer data')
      HEADER_METADATA = null
    } else {
      HEADER_METADATA = globalHeader
    }

    resolveLinks(
      HEADER_METADATA?.items[0],
      HEADER_METADATA?.includes,
      0,
      10,
      copyHeader
    )

    return HEADER_METADATA?.items[0] || null
  } catch (e) {
    console.error(e)
    return null
  }
}
