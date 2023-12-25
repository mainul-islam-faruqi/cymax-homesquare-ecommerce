export type BreadcrumbItemType = {
  slug: string
  title: string
  contentType?: string
}

export type BreadcrumbListType = Pick<BreadcrumbItemType, 'title'> & {
  url: string
}

export type BreadcrumbType = {
  items: BreadcrumbItemType[]
  basePath?: BreadcrumbListType
  ml?: string | number | {}
  mt?: string | number | {}
  mb?: string | number | {}
  my?: string | number | {}
}
