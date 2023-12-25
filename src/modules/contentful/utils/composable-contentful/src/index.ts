import * as contentful from 'contentful'

const DEFAULT_LANGUAGE = 'en-US'

export type ContentfulClientOptions = {
  space: string
  environment: string
  resolveLinks: boolean
  accessToken: string
  host?: string
  headers?: string
}
/*
content_type - To search for entries with a specific content type, set the content_type URI query parameter to the ID you want to search for. You can only specify one value for content_type at a time.
locale - The locale parameter must be the code of a locale in the space you're querying, or the wildcard value *. If you don't specify a locale, the default locale of the space is used.
include - When applied to an array value there must be at least one matching item.
'field.slug' - Filter on slug (exact match)
select - The select operator allows you to choose what fields to return from an entity. You can choose multiple values by combining comma separated operators.
limit - You can specify the maximum number of results as a limit search parameter.
order - If you don't pass an explicit order value the returned collection items will be ordered descending by publication timestamp (sys.updatedAt) and ascending by id (sys.id). This means that recently published items will appear closer to the top and for those with the same publication timestamp the order will be based on the items' ids.
skip - You can specify an offset with the skip search parameter. By combining skip and limit you can paginate through results

*/
export type ContentfulQuery = {
  content_type?: string
  locale?: string
  include?: number
  'field.slug'?: string
  select?: string
  limit?: number
  skip?: number
  order?: string
  query?: string
  [key: string]: any
}

export type ContentfulQueryReferenceFilter = {
  mainField: string
  contentTypeId: string
  linkField: string
  linkValue: string
}
export type ContentfulQueryDefaultFilter = {
  name: string
  value: string
}
export type GetPageParams = {
  pageContentType: string
  slug?: string
  locale?: any
  preview?: boolean
  limit?: number
}

export default class ContentfulHandler {
  client: contentful.ContentfulClientApi

  language: string

  constructor(isPreview = false) {
    const isPreviewMode =
      isPreview || process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_MODE === 'true'

    const clientOptions: ContentfulClientOptions = {
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
      environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? 'master',
      resolveLinks: false,
      accessToken: isPreviewMode
        ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN || ''
        : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
    }

    if (isPreviewMode) {
      clientOptions.host = 'preview.contentful.com'
      // clientOptions.headers =
      //   'Cache-Control: max-age=0, s-maxage=0, no-store, x-0-debug=1'
    }

    this.client = contentful?.createClient(clientOptions)
    this.language = process.env.LANGUAGE || DEFAULT_LANGUAGE
  }

  async getPage(
    params: GetPageParams
  ): Promise<contentful.EntryCollection<any>> {
    const query: { [key: string]: any } = {
      limit: params?.limit || 1,
      include: 10,
      locale: params?.locale || process.env.LANGUAGE,
      content_type: params.pageContentType,
      'fields.site': process.env.NEXT_PUBLIC_SITE_IDENTIFIER,
    }
    if (params?.slug) {
      query['fields.slug[match]'] = params.slug
    }
    return await this.client.getEntries(query)
  }

  async getEntries(
    contentType: string,
    field: any = {},
    levels = 10
  ): Promise<contentful.EntryCollection<any>> {
    const query: ContentfulQuery = {
      content_type: contentType,
      locale: this.language,
    }

    if (Object.keys(field).length) {
      query[`fields.${field.name}[in]`] = field.value
    }

    if (levels) {
      query.include = levels
    }
    return this.client.getEntries(query)
  }

  async getEntryBySlug(
    contentType: string,
    slug: string,
    select: string[] = [],
    levels = 2
  ): Promise<contentful.EntryCollection<any>> {
    const query: ContentfulQuery = {
      content_type: contentType,
      'field.slug': slug,
      include: levels,
      locale: this.language,
    }

    if (select.length > 0) {
      query.select = select.join(',')
    }

    return this.client.getEntries(query)
  }

  async searchEntries(
    contentType: string,
    field: string,
    search: string,
    select: string[] = [],
    levels = 2
  ): Promise<contentful.EntryCollection<any>> {
    const query: ContentfulQuery = {
      content_type: contentType,
      [`fields.${field}[match]`]: search,
      include: levels,
      locale: this.language,
    }

    if (select.length > 0) {
      query.select = select.join(',')
    }

    return this.client.getEntries(query)
  }

  async getEntry(entryId: string): Promise<contentful.Entry<any>> {
    return this.client.getEntry(entryId, { locale: this.language, include: 5 })
  }

  async getAsset(assetId: string): Promise<contentful.Asset> {
    return this.client.getAsset(assetId, { locale: this.language })
  }

  async getEntriesWithSpecificFields(
    contentType: string,
    select = '',
    exclude: ContentfulQueryDefaultFilter[] = [],
    include: ContentfulQueryDefaultFilter[] = [],
    type: ContentfulQueryDefaultFilter | null = null,
    limit: number | null = null,
    skip = 0,
    orderBy = '',
    levels = 5,
    fullTextSearch = '',
    matchesLink: ContentfulQueryReferenceFilter[] = []
  ): Promise<contentful.EntryCollection<any>> {
    const query: ContentfulQuery = {
      content_type: contentType,
      locale: this.language,
    }
    if (select) {
      // ensure that the data entered between '' have no space Ex: 'fields.title,fields.slug' instead of 'fields.title, fields.slug'
      query.select = select.replace(/ /g, '')
    }
    // You can filter a field by multiple values with the [nin] operator. When applied to an array value there must be at least one not matching item
    if (exclude && exclude.length > 0) {
      exclude.forEach((i) => {
        query[`fields.${i.name}[nin]`] = i.value
      })
    }
    // When applied to an array value there must be at least one matching item.
    if (include && include.length > 0) {
      include.forEach((i) => {
        query[`fields.${i.name}[in]`] = i.value
      })
    }
    // When applied to an array value there must be at least one matching item.
    if (type) {
      query[`fields.${type.name}[in]`] = type.value
    }

    if (limit) {
      query.limit = limit
    }

    if (skip) {
      query.skip = skip
    }

    if (orderBy) {
      query.order = orderBy
    }

    query.include = levels

    // There are cases where you want to find all the content resources which contain some particular words (search terms) but you don't know from which content type (for entries) or on which field those terms can be, so you can't use any of the field filters.
    if (fullTextSearch) {
      query.query = fullTextSearch
    }
    // With the [match] operator you can do a full-text search restricted to the content of a specific field
    // To search for entries which have a field linking to a specific entry, set the links_to_entry URI query parameter to the ID you want to search for.
    if (matchesLink.length > 0) {
      matchesLink.forEach((i) => {
        query[`fields.${i.mainField}.sys.contentType.sys.id`] = i.contentTypeId
        query[`fields.${i.contentTypeId}.fields.${i.linkField}[match]`] =
          i.linkValue
      })
    }
    return this.client.getEntries(query)
  }

  async getIncomingEntriesLink(id: string): Promise<any[]> {
    const query = { links_to_entry: id, locale: this.language }
    const data = await this.client.getEntries(query)
    return data != null ? data?.items : []
  }

  async getEntriesWithQuery(
    contentType: string,
    _query: ContentfulQuery
  ): Promise<contentful.EntryCollection<any>> {
    const query: ContentfulQuery = {
      content_type: contentType,
      ..._query,
    }
    return this.client.getEntries(query)
  }

  // Contentful search
  async fullTextSearch(
    contentType: string,
    query: string,
    limit = 10,
    skip = 0
  ): Promise<contentful.EntryCollection<any>> {
    const params: ContentfulQuery = {
      locale: this.language,
      query,
      limit,
      skip,
    }
    if (contentType != null) {
      params.content_type = contentType
    }

    return this.client.getEntries(params)
  }
}
