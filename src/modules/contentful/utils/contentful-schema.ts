export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any
}

/** Accordion [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/accordion) */
export type Accordion = Entry & {
  __typename?: 'Accordion'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<AccordionLinkingCollections>
  name?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  itemsCollection?: Maybe<AccordionItemsCollection>
}

/** Accordion [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/accordion) */
export type AccordionLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Accordion [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/accordion) */
export type AccordionNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Accordion [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/accordion) */
export type AccordionTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Accordion [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/accordion) */
export type AccordionItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type AccordionCollection = {
  __typename?: 'AccordionCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Accordion>>
}

export type AccordionFilter = {
  items?: Maybe<CfTitleAndLinkNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  itemsCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<AccordionFilter>>>
  AND?: Maybe<Array<Maybe<AccordionFilter>>>
}

export type AccordionItemsCollection = {
  __typename?: 'AccordionItemsCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<TitleAndLink>>
}

export type AccordionLinkingCollections = {
  __typename?: 'AccordionLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  genericPageWithMenuCollection?: Maybe<GenericPageWithMenuCollection>
}

export type AccordionLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type AccordionLinkingCollectionsGenericPageWithMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum AccordionOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  contentType?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Int']>
  url?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  linkedFrom?: Maybe<AssetLinkingCollections>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  transform?: Maybe<ImageTransformOptions>
  locale?: Maybe<Scalars['String']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type AssetCollection = {
  __typename?: 'AssetCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Asset>>
}

export type AssetFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  description_exists?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
  description_not?: Maybe<Scalars['String']>
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  description_contains?: Maybe<Scalars['String']>
  description_not_contains?: Maybe<Scalars['String']>
  url_exists?: Maybe<Scalars['Boolean']>
  url?: Maybe<Scalars['String']>
  url_not?: Maybe<Scalars['String']>
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  url_contains?: Maybe<Scalars['String']>
  url_not_contains?: Maybe<Scalars['String']>
  size_exists?: Maybe<Scalars['Boolean']>
  size?: Maybe<Scalars['Int']>
  size_not?: Maybe<Scalars['Int']>
  size_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  size_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  size_gt?: Maybe<Scalars['Int']>
  size_gte?: Maybe<Scalars['Int']>
  size_lt?: Maybe<Scalars['Int']>
  size_lte?: Maybe<Scalars['Int']>
  contentType_exists?: Maybe<Scalars['Boolean']>
  contentType?: Maybe<Scalars['String']>
  contentType_not?: Maybe<Scalars['String']>
  contentType_in?: Maybe<Array<Maybe<Scalars['String']>>>
  contentType_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  contentType_contains?: Maybe<Scalars['String']>
  contentType_not_contains?: Maybe<Scalars['String']>
  fileName_exists?: Maybe<Scalars['Boolean']>
  fileName?: Maybe<Scalars['String']>
  fileName_not?: Maybe<Scalars['String']>
  fileName_in?: Maybe<Array<Maybe<Scalars['String']>>>
  fileName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  fileName_contains?: Maybe<Scalars['String']>
  fileName_not_contains?: Maybe<Scalars['String']>
  width_exists?: Maybe<Scalars['Boolean']>
  width?: Maybe<Scalars['Int']>
  width_not?: Maybe<Scalars['Int']>
  width_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  width_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  width_gt?: Maybe<Scalars['Int']>
  width_gte?: Maybe<Scalars['Int']>
  width_lt?: Maybe<Scalars['Int']>
  width_lte?: Maybe<Scalars['Int']>
  height_exists?: Maybe<Scalars['Boolean']>
  height?: Maybe<Scalars['Int']>
  height_not?: Maybe<Scalars['Int']>
  height_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  height_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  height_gt?: Maybe<Scalars['Int']>
  height_gte?: Maybe<Scalars['Int']>
  height_lt?: Maybe<Scalars['Int']>
  height_lte?: Maybe<Scalars['Int']>
  OR?: Maybe<Array<Maybe<AssetFilter>>>
  AND?: Maybe<Array<Maybe<AssetFilter>>>
}

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  sitemapPageCollection?: Maybe<SitemapPageCollection>
  imageCollection?: Maybe<ImageCollection>
  themeCollection?: Maybe<ThemeCollection>
  megaMenuItemCollection?: Maybe<MegaMenuItemCollection>
}

export type AssetLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type AssetLinkingCollectionsSitemapPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type AssetLinkingCollectionsImageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type AssetLinkingCollectionsThemeCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type AssetLinkingCollectionsMegaMenuItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum AssetOrder {
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/banner) */
export type Banner = Entry & {
  __typename?: 'Banner'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<BannerLinkingCollections>
  name?: Maybe<Scalars['String']>
  eyebrow?: Maybe<Scalars['String']>
  content?: Maybe<BannerContent>
  bgImage?: Maybe<Image>
  style?: Maybe<Scalars['String']>
  theme?: Maybe<Scalars['String']>
  spacing?: Maybe<Scalars['String']>
  fullWidth?: Maybe<Scalars['Boolean']>
}

/** Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/banner) */
export type BannerLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/banner) */
export type BannerNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/banner) */
export type BannerEyebrowArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/banner) */
export type BannerContentArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/banner) */
export type BannerBgImageArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/banner) */
export type BannerStyleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/banner) */
export type BannerThemeArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/banner) */
export type BannerSpacingArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/banner) */
export type BannerFullWidthArgs = {
  locale?: Maybe<Scalars['String']>
}

export type BannerCollection = {
  __typename?: 'BannerCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Banner>>
}

export type BannerContent = {
  __typename?: 'BannerContent'
  json: Scalars['JSON']
  links: BannerContentLinks
}

export type BannerContentAssets = {
  __typename?: 'BannerContentAssets'
  hyperlink: Array<Maybe<Asset>>
  block: Array<Maybe<Asset>>
}

export type BannerContentEntries = {
  __typename?: 'BannerContentEntries'
  inline: Array<Maybe<Entry>>
  hyperlink: Array<Maybe<Entry>>
  block: Array<Maybe<Entry>>
}

export type BannerContentLinks = {
  __typename?: 'BannerContentLinks'
  entries: BannerContentEntries
  assets: BannerContentAssets
}

export type BannerFilter = {
  bgImage?: Maybe<CfImageNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  eyebrow_exists?: Maybe<Scalars['Boolean']>
  eyebrow?: Maybe<Scalars['String']>
  eyebrow_not?: Maybe<Scalars['String']>
  eyebrow_in?: Maybe<Array<Maybe<Scalars['String']>>>
  eyebrow_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  eyebrow_contains?: Maybe<Scalars['String']>
  eyebrow_not_contains?: Maybe<Scalars['String']>
  content_exists?: Maybe<Scalars['Boolean']>
  content_contains?: Maybe<Scalars['String']>
  content_not_contains?: Maybe<Scalars['String']>
  bgImage_exists?: Maybe<Scalars['Boolean']>
  style_exists?: Maybe<Scalars['Boolean']>
  style?: Maybe<Scalars['String']>
  style_not?: Maybe<Scalars['String']>
  style_in?: Maybe<Array<Maybe<Scalars['String']>>>
  style_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  style_contains?: Maybe<Scalars['String']>
  style_not_contains?: Maybe<Scalars['String']>
  theme_exists?: Maybe<Scalars['Boolean']>
  theme?: Maybe<Scalars['String']>
  theme_not?: Maybe<Scalars['String']>
  theme_in?: Maybe<Array<Maybe<Scalars['String']>>>
  theme_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  theme_contains?: Maybe<Scalars['String']>
  theme_not_contains?: Maybe<Scalars['String']>
  spacing_exists?: Maybe<Scalars['Boolean']>
  spacing?: Maybe<Scalars['String']>
  spacing_not?: Maybe<Scalars['String']>
  spacing_in?: Maybe<Array<Maybe<Scalars['String']>>>
  spacing_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  spacing_contains?: Maybe<Scalars['String']>
  spacing_not_contains?: Maybe<Scalars['String']>
  fullWidth_exists?: Maybe<Scalars['Boolean']>
  fullWidth?: Maybe<Scalars['Boolean']>
  fullWidth_not?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<BannerFilter>>>
  AND?: Maybe<Array<Maybe<BannerFilter>>>
}

/** banner image Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/bannerImageCarousel) */
export type BannerImageCarousel = Entry & {
  __typename?: 'BannerImageCarousel'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<BannerImageCarouselLinkingCollections>
  internalName?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  titleAlignment?: Maybe<Scalars['String']>
  products?: Maybe<Array<Maybe<Scalars['String']>>>
  childrenComponentsCollection?: Maybe<BannerImageCarouselChildrenComponentsCollection>
}

/** banner image Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/bannerImageCarousel) */
export type BannerImageCarouselLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** banner image Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/bannerImageCarousel) */
export type BannerImageCarouselInternalNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** banner image Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/bannerImageCarousel) */
export type BannerImageCarouselTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** banner image Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/bannerImageCarousel) */
export type BannerImageCarouselTitleAlignmentArgs = {
  locale?: Maybe<Scalars['String']>
}

/** banner image Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/bannerImageCarousel) */
export type BannerImageCarouselProductsArgs = {
  locale?: Maybe<Scalars['String']>
}

/** banner image Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/bannerImageCarousel) */
export type BannerImageCarouselChildrenComponentsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type BannerImageCarouselChildrenComponentsCollection = {
  __typename?: 'BannerImageCarouselChildrenComponentsCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Card>>
}

export type BannerImageCarouselCollection = {
  __typename?: 'BannerImageCarouselCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<BannerImageCarousel>>
}

export type BannerImageCarouselFilter = {
  childrenComponents?: Maybe<CfCardNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  internalName_exists?: Maybe<Scalars['Boolean']>
  internalName?: Maybe<Scalars['String']>
  internalName_not?: Maybe<Scalars['String']>
  internalName_in?: Maybe<Array<Maybe<Scalars['String']>>>
  internalName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  internalName_contains?: Maybe<Scalars['String']>
  internalName_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  titleAlignment_exists?: Maybe<Scalars['Boolean']>
  titleAlignment?: Maybe<Scalars['String']>
  titleAlignment_not?: Maybe<Scalars['String']>
  titleAlignment_in?: Maybe<Array<Maybe<Scalars['String']>>>
  titleAlignment_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  titleAlignment_contains?: Maybe<Scalars['String']>
  titleAlignment_not_contains?: Maybe<Scalars['String']>
  Products_exists?: Maybe<Scalars['Boolean']>
  Products_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>
  Products_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>
  Products_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>
  childrenComponentsCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<BannerImageCarouselFilter>>>
  AND?: Maybe<Array<Maybe<BannerImageCarouselFilter>>>
}

export type BannerImageCarouselLinkingCollections = {
  __typename?: 'BannerImageCarouselLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  genericPageCollection?: Maybe<GenericPageCollection>
}

export type BannerImageCarouselLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type BannerImageCarouselLinkingCollectionsGenericPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum BannerImageCarouselOrder {
  InternalNameAsc = 'internalName_ASC',
  InternalNameDesc = 'internalName_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TitleAlignmentAsc = 'titleAlignment_ASC',
  TitleAlignmentDesc = 'titleAlignment_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type BannerLinkingCollections = {
  __typename?: 'BannerLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  genericPageCollection?: Maybe<GenericPageCollection>
  genericPageWithMenuCollection?: Maybe<GenericPageWithMenuCollection>
}

export type BannerLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type BannerLinkingCollectionsGenericPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type BannerLinkingCollectionsGenericPageWithMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum BannerOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  EyebrowAsc = 'eyebrow_ASC',
  EyebrowDesc = 'eyebrow_DESC',
  StyleAsc = 'style_ASC',
  StyleDesc = 'style_DESC',
  ThemeAsc = 'theme_ASC',
  ThemeDesc = 'theme_DESC',
  SpacingAsc = 'spacing_ASC',
  SpacingDesc = 'spacing_DESC',
  FullWidthAsc = 'fullWidth_ASC',
  FullWidthDesc = 'fullWidth_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type Card = Entry & {
  __typename?: 'Card'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<CardLinkingCollections>
  name?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  cardLink?: Maybe<Cta>
  eyebrow?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<CardDescription>
  variant?: Maybe<Scalars['String']>
  horizontalAlignment?: Maybe<Scalars['String']>
  verticalAlignment?: Maybe<Scalars['String']>
  theme?: Maybe<Scalars['String']>
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type CardLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type CardNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type CardImageArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type CardCardLinkArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type CardEyebrowArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type CardTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type CardDescriptionArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type CardVariantArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type CardHorizontalAlignmentArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type CardVerticalAlignmentArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/card) */
export type CardThemeArgs = {
  locale?: Maybe<Scalars['String']>
}

export type CardCollection = {
  __typename?: 'CardCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Card>>
}

export type CardDescription = {
  __typename?: 'CardDescription'
  json: Scalars['JSON']
  links: CardDescriptionLinks
}

export type CardDescriptionAssets = {
  __typename?: 'CardDescriptionAssets'
  hyperlink: Array<Maybe<Asset>>
  block: Array<Maybe<Asset>>
}

export type CardDescriptionEntries = {
  __typename?: 'CardDescriptionEntries'
  inline: Array<Maybe<Entry>>
  hyperlink: Array<Maybe<Entry>>
  block: Array<Maybe<Entry>>
}

export type CardDescriptionLinks = {
  __typename?: 'CardDescriptionLinks'
  entries: CardDescriptionEntries
  assets: CardDescriptionAssets
}

export type CardFilter = {
  image?: Maybe<CfImageNestedFilter>
  cardLink?: Maybe<CfCtaNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  image_exists?: Maybe<Scalars['Boolean']>
  cardLink_exists?: Maybe<Scalars['Boolean']>
  eyebrow_exists?: Maybe<Scalars['Boolean']>
  eyebrow?: Maybe<Scalars['String']>
  eyebrow_not?: Maybe<Scalars['String']>
  eyebrow_in?: Maybe<Array<Maybe<Scalars['String']>>>
  eyebrow_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  eyebrow_contains?: Maybe<Scalars['String']>
  eyebrow_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  description_exists?: Maybe<Scalars['Boolean']>
  description_contains?: Maybe<Scalars['String']>
  description_not_contains?: Maybe<Scalars['String']>
  variant_exists?: Maybe<Scalars['Boolean']>
  variant?: Maybe<Scalars['String']>
  variant_not?: Maybe<Scalars['String']>
  variant_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_contains?: Maybe<Scalars['String']>
  variant_not_contains?: Maybe<Scalars['String']>
  horizontalAlignment_exists?: Maybe<Scalars['Boolean']>
  horizontalAlignment?: Maybe<Scalars['String']>
  horizontalAlignment_not?: Maybe<Scalars['String']>
  horizontalAlignment_in?: Maybe<Array<Maybe<Scalars['String']>>>
  horizontalAlignment_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  horizontalAlignment_contains?: Maybe<Scalars['String']>
  horizontalAlignment_not_contains?: Maybe<Scalars['String']>
  verticalAlignment_exists?: Maybe<Scalars['Boolean']>
  verticalAlignment?: Maybe<Scalars['String']>
  verticalAlignment_not?: Maybe<Scalars['String']>
  verticalAlignment_in?: Maybe<Array<Maybe<Scalars['String']>>>
  verticalAlignment_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  verticalAlignment_contains?: Maybe<Scalars['String']>
  verticalAlignment_not_contains?: Maybe<Scalars['String']>
  theme_exists?: Maybe<Scalars['Boolean']>
  theme?: Maybe<Scalars['String']>
  theme_not?: Maybe<Scalars['String']>
  theme_in?: Maybe<Array<Maybe<Scalars['String']>>>
  theme_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  theme_contains?: Maybe<Scalars['String']>
  theme_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<CardFilter>>>
  AND?: Maybe<Array<Maybe<CardFilter>>>
}

export type CardLinkingCollections = {
  __typename?: 'CardLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  carouselCollection?: Maybe<CarouselCollection>
  bannerImageCarouselCollection?: Maybe<BannerImageCarouselCollection>
  gridCollection?: Maybe<GridCollection>
}

export type CardLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CardLinkingCollectionsCarouselCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CardLinkingCollectionsBannerImageCarouselCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CardLinkingCollectionsGridCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum CardOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  EyebrowAsc = 'eyebrow_ASC',
  EyebrowDesc = 'eyebrow_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  VariantAsc = 'variant_ASC',
  VariantDesc = 'variant_DESC',
  HorizontalAlignmentAsc = 'horizontalAlignment_ASC',
  HorizontalAlignmentDesc = 'horizontalAlignment_DESC',
  VerticalAlignmentAsc = 'verticalAlignment_ASC',
  VerticalAlignmentDesc = 'verticalAlignment_DESC',
  ThemeAsc = 'theme_ASC',
  ThemeDesc = 'theme_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Component Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/carousel) */
export type Carousel = Entry & {
  __typename?: 'Carousel'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<CarouselLinkingCollections>
  name?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  titleAlignment?: Maybe<Scalars['String']>
  variant?: Maybe<Scalars['String']>
  childrenCollection?: Maybe<CarouselChildrenCollection>
}

/** Component Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/carousel) */
export type CarouselLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Component Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/carousel) */
export type CarouselNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/carousel) */
export type CarouselTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/carousel) */
export type CarouselTitleAlignmentArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/carousel) */
export type CarouselVariantArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Carousel [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/carousel) */
export type CarouselChildrenCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CarouselChildrenCollection = {
  __typename?: 'CarouselChildrenCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Card>>
}

export type CarouselCollection = {
  __typename?: 'CarouselCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Carousel>>
}

export type CarouselFilter = {
  children?: Maybe<CfCardNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  titleAlignment_exists?: Maybe<Scalars['Boolean']>
  titleAlignment?: Maybe<Scalars['String']>
  titleAlignment_not?: Maybe<Scalars['String']>
  titleAlignment_in?: Maybe<Array<Maybe<Scalars['String']>>>
  titleAlignment_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  titleAlignment_contains?: Maybe<Scalars['String']>
  titleAlignment_not_contains?: Maybe<Scalars['String']>
  variant_exists?: Maybe<Scalars['Boolean']>
  variant?: Maybe<Scalars['String']>
  variant_not?: Maybe<Scalars['String']>
  variant_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_contains?: Maybe<Scalars['String']>
  variant_not_contains?: Maybe<Scalars['String']>
  childrenCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<CarouselFilter>>>
  AND?: Maybe<Array<Maybe<CarouselFilter>>>
}

export type CarouselLinkingCollections = {
  __typename?: 'CarouselLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  genericPageCollection?: Maybe<GenericPageCollection>
  genericPageWithMenuCollection?: Maybe<GenericPageWithMenuCollection>
}

export type CarouselLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CarouselLinkingCollectionsGenericPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CarouselLinkingCollectionsGenericPageWithMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum CarouselOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TitleAlignmentAsc = 'titleAlignment_ASC',
  TitleAlignmentDesc = 'titleAlignment_DESC',
  VariantAsc = 'variant_ASC',
  VariantDesc = 'variant_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata'
  tags: Array<Maybe<ContentfulTag>>
}

export type ContentfulMetadataFilter = {
  tags_exists?: Maybe<Scalars['Boolean']>
  tags?: Maybe<ContentfulMetadataTagsFilter>
}

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>
  id_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>
  id_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>
}

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

/** Call to Action component [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/cta) */
export type Cta = Entry & {
  __typename?: 'Cta'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<CtaLinkingCollections>
  name?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  linkToEntry?: Maybe<CtaLinkToEntry>
  url?: Maybe<Scalars['String']>
  params?: Maybe<Scalars['String']>
  variant?: Maybe<Scalars['String']>
}

/** Call to Action component [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/cta) */
export type CtaLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Call to Action component [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/cta) */
export type CtaNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Call to Action component [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/cta) */
export type CtaLabelArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Call to Action component [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/cta) */
export type CtaLinkToEntryArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Call to Action component [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/cta) */
export type CtaUrlArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Call to Action component [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/cta) */
export type CtaParamsArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Call to Action component [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/cta) */
export type CtaVariantArgs = {
  locale?: Maybe<Scalars['String']>
}

export type CtaCollection = {
  __typename?: 'CtaCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Cta>>
}

export type CtaFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  label_exists?: Maybe<Scalars['Boolean']>
  label?: Maybe<Scalars['String']>
  label_not?: Maybe<Scalars['String']>
  label_in?: Maybe<Array<Maybe<Scalars['String']>>>
  label_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  label_contains?: Maybe<Scalars['String']>
  label_not_contains?: Maybe<Scalars['String']>
  linkToEntry_exists?: Maybe<Scalars['Boolean']>
  url_exists?: Maybe<Scalars['Boolean']>
  url?: Maybe<Scalars['String']>
  url_not?: Maybe<Scalars['String']>
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  url_contains?: Maybe<Scalars['String']>
  url_not_contains?: Maybe<Scalars['String']>
  params_exists?: Maybe<Scalars['Boolean']>
  params?: Maybe<Scalars['String']>
  params_not?: Maybe<Scalars['String']>
  params_in?: Maybe<Array<Maybe<Scalars['String']>>>
  params_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  params_contains?: Maybe<Scalars['String']>
  params_not_contains?: Maybe<Scalars['String']>
  variant_exists?: Maybe<Scalars['Boolean']>
  variant?: Maybe<Scalars['String']>
  variant_not?: Maybe<Scalars['String']>
  variant_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_contains?: Maybe<Scalars['String']>
  variant_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<CtaFilter>>>
  AND?: Maybe<Array<Maybe<CtaFilter>>>
}

export type CtaLinkToEntry = GenericPage | GenericPageWithMenu | Plp

export type CtaLinkingCollections = {
  __typename?: 'CtaLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  plpCollection?: Maybe<PlpCollection>
  footerCollection?: Maybe<FooterCollection>
  cardCollection?: Maybe<CardCollection>
  iconCardCollection?: Maybe<IconCardCollection>
  titleAndLinkCollection?: Maybe<TitleAndLinkCollection>
  megaMenuItemCollection?: Maybe<MegaMenuItemCollection>
}

export type CtaLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CtaLinkingCollectionsPlpCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CtaLinkingCollectionsFooterCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CtaLinkingCollectionsCardCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CtaLinkingCollectionsIconCardCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CtaLinkingCollectionsTitleAndLinkCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CtaLinkingCollectionsMegaMenuItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum CtaOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  ParamsAsc = 'params_ASC',
  ParamsDesc = 'params_DESC',
  VariantAsc = 'variant_ASC',
  VariantDesc = 'variant_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type Entry = {
  sys: Sys
  contentfulMetadata: ContentfulMetadata
}

export type EntryCollection = {
  __typename?: 'EntryCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Entry>>
}

export type EntryFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  OR?: Maybe<Array<Maybe<EntryFilter>>>
  AND?: Maybe<Array<Maybe<EntryFilter>>>
}

export enum EntryOrder {
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** The global footer [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/footer) */
export type Footer = Entry & {
  __typename?: 'Footer'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<FooterLinkingCollections>
  name?: Maybe<Scalars['String']>
  copyright?: Maybe<Scalars['String']>
  legalsCollection?: Maybe<FooterLegalsCollection>
  linkMenus?: Maybe<MegaMenu>
  site?: Maybe<Scalars['String']>
  socialIcons?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** The global footer [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/footer) */
export type FooterLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** The global footer [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/footer) */
export type FooterNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** The global footer [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/footer) */
export type FooterCopyrightArgs = {
  locale?: Maybe<Scalars['String']>
}

/** The global footer [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/footer) */
export type FooterLegalsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** The global footer [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/footer) */
export type FooterLinkMenusArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** The global footer [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/footer) */
export type FooterSiteArgs = {
  locale?: Maybe<Scalars['String']>
}

/** The global footer [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/footer) */
export type FooterSocialIconsArgs = {
  locale?: Maybe<Scalars['String']>
}

export type FooterCollection = {
  __typename?: 'FooterCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Footer>>
}

export type FooterFilter = {
  legals?: Maybe<CfCtaNestedFilter>
  linkMenus?: Maybe<CfMegaMenuNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  copyright_exists?: Maybe<Scalars['Boolean']>
  copyright?: Maybe<Scalars['String']>
  copyright_not?: Maybe<Scalars['String']>
  copyright_in?: Maybe<Array<Maybe<Scalars['String']>>>
  copyright_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  copyright_contains?: Maybe<Scalars['String']>
  copyright_not_contains?: Maybe<Scalars['String']>
  legalsCollection_exists?: Maybe<Scalars['Boolean']>
  linkMenus_exists?: Maybe<Scalars['Boolean']>
  site_exists?: Maybe<Scalars['Boolean']>
  site?: Maybe<Scalars['String']>
  site_not?: Maybe<Scalars['String']>
  site_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_contains?: Maybe<Scalars['String']>
  site_not_contains?: Maybe<Scalars['String']>
  socialIcons_exists?: Maybe<Scalars['Boolean']>
  socialIcons_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>
  socialIcons_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>
  socialIcons_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>
  OR?: Maybe<Array<Maybe<FooterFilter>>>
  AND?: Maybe<Array<Maybe<FooterFilter>>>
}

export type FooterLegalsCollection = {
  __typename?: 'FooterLegalsCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Cta>>
}

export type FooterLinkingCollections = {
  __typename?: 'FooterLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
}

export type FooterLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum FooterOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  CopyrightAsc = 'copyright_ASC',
  CopyrightDesc = 'copyright_DESC',
  SiteAsc = 'site_ASC',
  SiteDesc = 'site_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Generic Page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPage) */
export type GenericPage = Entry & {
  __typename?: 'GenericPage'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<GenericPageLinkingCollections>
  name?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  site?: Maybe<Scalars['String']>
  seo?: Maybe<Seo>
  itemsCollection?: Maybe<GenericPageItemsCollection>
}

/** Generic Page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPage) */
export type GenericPageLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Generic Page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPage) */
export type GenericPageNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Generic Page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPage) */
export type GenericPageTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Generic Page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPage) */
export type GenericPageSlugArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Generic Page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPage) */
export type GenericPageSiteArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Generic Page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPage) */
export type GenericPageSeoArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Generic Page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPage) */
export type GenericPageItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type GenericPageCollection = {
  __typename?: 'GenericPageCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<GenericPage>>
}

export type GenericPageFilter = {
  seo?: Maybe<CfSeoNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  slug_exists?: Maybe<Scalars['Boolean']>
  slug?: Maybe<Scalars['String']>
  slug_not?: Maybe<Scalars['String']>
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  slug_contains?: Maybe<Scalars['String']>
  slug_not_contains?: Maybe<Scalars['String']>
  site_exists?: Maybe<Scalars['Boolean']>
  site?: Maybe<Scalars['String']>
  site_not?: Maybe<Scalars['String']>
  site_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_contains?: Maybe<Scalars['String']>
  site_not_contains?: Maybe<Scalars['String']>
  seo_exists?: Maybe<Scalars['Boolean']>
  itemsCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<GenericPageFilter>>>
  AND?: Maybe<Array<Maybe<GenericPageFilter>>>
}

export type GenericPageItemsCollection = {
  __typename?: 'GenericPageItemsCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<GenericPageItemsItem>>
}

export type GenericPageItemsItem =
  | Banner
  | BannerImageCarousel
  | Carousel
  | Grid
  | Image
  | SplitBanner
  | TextComponent

export type GenericPageLinkingCollections = {
  __typename?: 'GenericPageLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  ctaCollection?: Maybe<CtaCollection>
}

export type GenericPageLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type GenericPageLinkingCollectionsCtaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum GenericPageOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SiteAsc = 'site_ASC',
  SiteDesc = 'site_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Component Generic Page with side Menu [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPageWithMenu) */
export type GenericPageWithMenu = Entry & {
  __typename?: 'GenericPageWithMenu'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<GenericPageWithMenuLinkingCollections>
  name?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  site?: Maybe<Scalars['String']>
  seo?: Maybe<Seo>
  sideMenu?: Maybe<Accordion>
  itemsCollection?: Maybe<GenericPageWithMenuItemsCollection>
}

/** Component Generic Page with side Menu [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPageWithMenu) */
export type GenericPageWithMenuLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Component Generic Page with side Menu [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPageWithMenu) */
export type GenericPageWithMenuNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Generic Page with side Menu [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPageWithMenu) */
export type GenericPageWithMenuTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Generic Page with side Menu [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPageWithMenu) */
export type GenericPageWithMenuSlugArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Generic Page with side Menu [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPageWithMenu) */
export type GenericPageWithMenuSiteArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component Generic Page with side Menu [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPageWithMenu) */
export type GenericPageWithMenuSeoArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Component Generic Page with side Menu [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPageWithMenu) */
export type GenericPageWithMenuSideMenuArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Component Generic Page with side Menu [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/genericPageWithMenu) */
export type GenericPageWithMenuItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type GenericPageWithMenuCollection = {
  __typename?: 'GenericPageWithMenuCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<GenericPageWithMenu>>
}

export type GenericPageWithMenuFilter = {
  seo?: Maybe<CfSeoNestedFilter>
  sideMenu?: Maybe<CfAccordionNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  slug_exists?: Maybe<Scalars['Boolean']>
  slug?: Maybe<Scalars['String']>
  slug_not?: Maybe<Scalars['String']>
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  slug_contains?: Maybe<Scalars['String']>
  slug_not_contains?: Maybe<Scalars['String']>
  site_exists?: Maybe<Scalars['Boolean']>
  site?: Maybe<Scalars['String']>
  site_not?: Maybe<Scalars['String']>
  site_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_contains?: Maybe<Scalars['String']>
  site_not_contains?: Maybe<Scalars['String']>
  seo_exists?: Maybe<Scalars['Boolean']>
  sideMenu_exists?: Maybe<Scalars['Boolean']>
  itemsCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<GenericPageWithMenuFilter>>>
  AND?: Maybe<Array<Maybe<GenericPageWithMenuFilter>>>
}

export type GenericPageWithMenuItemsCollection = {
  __typename?: 'GenericPageWithMenuItemsCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<GenericPageWithMenuItemsItem>>
}

export type GenericPageWithMenuItemsItem =
  | Banner
  | Carousel
  | Grid
  | Image
  | SplitBanner
  | TextComponent

export type GenericPageWithMenuLinkingCollections = {
  __typename?: 'GenericPageWithMenuLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  ctaCollection?: Maybe<CtaCollection>
}

export type GenericPageWithMenuLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type GenericPageWithMenuLinkingCollectionsCtaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum GenericPageWithMenuOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SiteAsc = 'site_ASC',
  SiteDesc = 'site_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Grid [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/grid) */
export type Grid = Entry & {
  __typename?: 'Grid'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<GridLinkingCollections>
  name?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  style?: Maybe<Scalars['String']>
  columnsCollection?: Maybe<GridColumnsCollection>
  alignment?: Maybe<Scalars['String']>
  cardBackgroundColor?: Maybe<Scalars['String']>
}

/** Grid [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/grid) */
export type GridLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Grid [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/grid) */
export type GridNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Grid [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/grid) */
export type GridTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Grid [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/grid) */
export type GridStyleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Grid [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/grid) */
export type GridColumnsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Grid [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/grid) */
export type GridAlignmentArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Grid [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/grid) */
export type GridCardBackgroundColorArgs = {
  locale?: Maybe<Scalars['String']>
}

export type GridCollection = {
  __typename?: 'GridCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Grid>>
}

export type GridColumnsCollection = {
  __typename?: 'GridColumnsCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<GridColumnsItem>>
}

export type GridColumnsItem = Card | IconCard | Image

export type GridFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  style_exists?: Maybe<Scalars['Boolean']>
  style?: Maybe<Scalars['String']>
  style_not?: Maybe<Scalars['String']>
  style_in?: Maybe<Array<Maybe<Scalars['String']>>>
  style_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  style_contains?: Maybe<Scalars['String']>
  style_not_contains?: Maybe<Scalars['String']>
  columnsCollection_exists?: Maybe<Scalars['Boolean']>
  alignment_exists?: Maybe<Scalars['Boolean']>
  alignment?: Maybe<Scalars['String']>
  alignment_not?: Maybe<Scalars['String']>
  alignment_in?: Maybe<Array<Maybe<Scalars['String']>>>
  alignment_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  alignment_contains?: Maybe<Scalars['String']>
  alignment_not_contains?: Maybe<Scalars['String']>
  cardBackgroundColor_exists?: Maybe<Scalars['Boolean']>
  cardBackgroundColor?: Maybe<Scalars['String']>
  cardBackgroundColor_not?: Maybe<Scalars['String']>
  cardBackgroundColor_in?: Maybe<Array<Maybe<Scalars['String']>>>
  cardBackgroundColor_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  cardBackgroundColor_contains?: Maybe<Scalars['String']>
  cardBackgroundColor_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<GridFilter>>>
  AND?: Maybe<Array<Maybe<GridFilter>>>
}

export type GridLinkingCollections = {
  __typename?: 'GridLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  genericPageCollection?: Maybe<GenericPageCollection>
  genericPageWithMenuCollection?: Maybe<GenericPageWithMenuCollection>
}

export type GridLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type GridLinkingCollectionsGenericPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type GridLinkingCollectionsGenericPageWithMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum GridOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  StyleAsc = 'style_ASC',
  StyleDesc = 'style_DESC',
  AlignmentAsc = 'alignment_ASC',
  AlignmentDesc = 'alignment_DESC',
  CardBackgroundColorAsc = 'cardBackgroundColor_ASC',
  CardBackgroundColorDesc = 'cardBackgroundColor_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** The global header [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/header) */
export type Header = Entry & {
  __typename?: 'Header'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<HeaderLinkingCollections>
  name?: Maybe<Scalars['String']>
  searchText?: Maybe<Scalars['String']>
  linkMenus?: Maybe<MegaMenu>
  site?: Maybe<Scalars['String']>
  promotionalText?: Maybe<HeaderPromotionalText>
}

/** The global header [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/header) */
export type HeaderLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** The global header [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/header) */
export type HeaderNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** The global header [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/header) */
export type HeaderSearchTextArgs = {
  locale?: Maybe<Scalars['String']>
}

/** The global header [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/header) */
export type HeaderLinkMenusArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** The global header [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/header) */
export type HeaderSiteArgs = {
  locale?: Maybe<Scalars['String']>
}

/** The global header [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/header) */
export type HeaderPromotionalTextArgs = {
  locale?: Maybe<Scalars['String']>
}

export type HeaderCollection = {
  __typename?: 'HeaderCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Header>>
}

export type HeaderFilter = {
  linkMenus?: Maybe<CfMegaMenuNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  searchText_exists?: Maybe<Scalars['Boolean']>
  searchText?: Maybe<Scalars['String']>
  searchText_not?: Maybe<Scalars['String']>
  searchText_in?: Maybe<Array<Maybe<Scalars['String']>>>
  searchText_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  searchText_contains?: Maybe<Scalars['String']>
  searchText_not_contains?: Maybe<Scalars['String']>
  linkMenus_exists?: Maybe<Scalars['Boolean']>
  site_exists?: Maybe<Scalars['Boolean']>
  site?: Maybe<Scalars['String']>
  site_not?: Maybe<Scalars['String']>
  site_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_contains?: Maybe<Scalars['String']>
  site_not_contains?: Maybe<Scalars['String']>
  promotionalText_exists?: Maybe<Scalars['Boolean']>
  promotionalText_contains?: Maybe<Scalars['String']>
  promotionalText_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<HeaderFilter>>>
  AND?: Maybe<Array<Maybe<HeaderFilter>>>
}

export type HeaderLinkingCollections = {
  __typename?: 'HeaderLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
}

export type HeaderLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum HeaderOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SearchTextAsc = 'searchText_ASC',
  SearchTextDesc = 'searchText_DESC',
  SiteAsc = 'site_ASC',
  SiteDesc = 'site_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type HeaderPromotionalText = {
  __typename?: 'HeaderPromotionalText'
  json: Scalars['JSON']
  links: HeaderPromotionalTextLinks
}

export type HeaderPromotionalTextAssets = {
  __typename?: 'HeaderPromotionalTextAssets'
  hyperlink: Array<Maybe<Asset>>
  block: Array<Maybe<Asset>>
}

export type HeaderPromotionalTextEntries = {
  __typename?: 'HeaderPromotionalTextEntries'
  inline: Array<Maybe<Entry>>
  hyperlink: Array<Maybe<Entry>>
  block: Array<Maybe<Entry>>
}

export type HeaderPromotionalTextLinks = {
  __typename?: 'HeaderPromotionalTextLinks'
  entries: HeaderPromotionalTextEntries
  assets: HeaderPromotionalTextAssets
}

/** Icon Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/iconCard) */
export type IconCard = Entry & {
  __typename?: 'IconCard'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<IconCardLinkingCollections>
  name?: Maybe<Scalars['String']>
  alignment?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  title?: Maybe<Scalars['String']>
  text?: Maybe<IconCardText>
  cta?: Maybe<Cta>
}

/** Icon Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/iconCard) */
export type IconCardLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Icon Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/iconCard) */
export type IconCardNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Icon Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/iconCard) */
export type IconCardAlignmentArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Icon Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/iconCard) */
export type IconCardImageArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Icon Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/iconCard) */
export type IconCardTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Icon Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/iconCard) */
export type IconCardTextArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Icon Card [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/iconCard) */
export type IconCardCtaArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type IconCardCollection = {
  __typename?: 'IconCardCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<IconCard>>
}

export type IconCardFilter = {
  image?: Maybe<CfImageNestedFilter>
  cta?: Maybe<CfCtaNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  alignment_exists?: Maybe<Scalars['Boolean']>
  alignment?: Maybe<Scalars['String']>
  alignment_not?: Maybe<Scalars['String']>
  alignment_in?: Maybe<Array<Maybe<Scalars['String']>>>
  alignment_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  alignment_contains?: Maybe<Scalars['String']>
  alignment_not_contains?: Maybe<Scalars['String']>
  image_exists?: Maybe<Scalars['Boolean']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  text_exists?: Maybe<Scalars['Boolean']>
  text_contains?: Maybe<Scalars['String']>
  text_not_contains?: Maybe<Scalars['String']>
  cta_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<IconCardFilter>>>
  AND?: Maybe<Array<Maybe<IconCardFilter>>>
}

export type IconCardLinkingCollections = {
  __typename?: 'IconCardLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  gridCollection?: Maybe<GridCollection>
}

export type IconCardLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type IconCardLinkingCollectionsGridCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum IconCardOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  AlignmentAsc = 'alignment_ASC',
  AlignmentDesc = 'alignment_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type IconCardText = {
  __typename?: 'IconCardText'
  json: Scalars['JSON']
  links: IconCardTextLinks
}

export type IconCardTextAssets = {
  __typename?: 'IconCardTextAssets'
  hyperlink: Array<Maybe<Asset>>
  block: Array<Maybe<Asset>>
}

export type IconCardTextEntries = {
  __typename?: 'IconCardTextEntries'
  inline: Array<Maybe<Entry>>
  hyperlink: Array<Maybe<Entry>>
  block: Array<Maybe<Entry>>
}

export type IconCardTextLinks = {
  __typename?: 'IconCardTextLinks'
  entries: IconCardTextEntries
  assets: IconCardTextAssets
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type Image = Entry & {
  __typename?: 'Image'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<ImageLinkingCollections>
  name?: Maybe<Scalars['String']>
  image?: Maybe<Asset>
  alt?: Maybe<Scalars['String']>
  objectFit?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  quality?: Maybe<Scalars['Int']>
  format?: Maybe<Scalars['String']>
  fit?: Maybe<Scalars['String']>
  focusArea?: Maybe<Scalars['String']>
  radius?: Maybe<Scalars['Int']>
  progressive?: Maybe<Scalars['Boolean']>
  png8?: Maybe<Scalars['Boolean']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageImageArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageAltArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageObjectFitArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageWidthArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageHeightArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageQualityArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageFormatArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageFitArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageFocusAreaArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageRadiusArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImageProgressiveArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Image [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/image) */
export type ImagePng8Args = {
  locale?: Maybe<Scalars['String']>
}

export type ImageCollection = {
  __typename?: 'ImageCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Image>>
}

export type ImageFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  image_exists?: Maybe<Scalars['Boolean']>
  alt_exists?: Maybe<Scalars['Boolean']>
  alt?: Maybe<Scalars['String']>
  alt_not?: Maybe<Scalars['String']>
  alt_in?: Maybe<Array<Maybe<Scalars['String']>>>
  alt_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  alt_contains?: Maybe<Scalars['String']>
  alt_not_contains?: Maybe<Scalars['String']>
  objectFit_exists?: Maybe<Scalars['Boolean']>
  objectFit?: Maybe<Scalars['String']>
  objectFit_not?: Maybe<Scalars['String']>
  objectFit_in?: Maybe<Array<Maybe<Scalars['String']>>>
  objectFit_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  objectFit_contains?: Maybe<Scalars['String']>
  objectFit_not_contains?: Maybe<Scalars['String']>
  width_exists?: Maybe<Scalars['Boolean']>
  width?: Maybe<Scalars['Int']>
  width_not?: Maybe<Scalars['Int']>
  width_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  width_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  width_gt?: Maybe<Scalars['Int']>
  width_gte?: Maybe<Scalars['Int']>
  width_lt?: Maybe<Scalars['Int']>
  width_lte?: Maybe<Scalars['Int']>
  height_exists?: Maybe<Scalars['Boolean']>
  height?: Maybe<Scalars['Int']>
  height_not?: Maybe<Scalars['Int']>
  height_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  height_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  height_gt?: Maybe<Scalars['Int']>
  height_gte?: Maybe<Scalars['Int']>
  height_lt?: Maybe<Scalars['Int']>
  height_lte?: Maybe<Scalars['Int']>
  quality_exists?: Maybe<Scalars['Boolean']>
  quality?: Maybe<Scalars['Int']>
  quality_not?: Maybe<Scalars['Int']>
  quality_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  quality_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  quality_gt?: Maybe<Scalars['Int']>
  quality_gte?: Maybe<Scalars['Int']>
  quality_lt?: Maybe<Scalars['Int']>
  quality_lte?: Maybe<Scalars['Int']>
  format_exists?: Maybe<Scalars['Boolean']>
  format?: Maybe<Scalars['String']>
  format_not?: Maybe<Scalars['String']>
  format_in?: Maybe<Array<Maybe<Scalars['String']>>>
  format_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  format_contains?: Maybe<Scalars['String']>
  format_not_contains?: Maybe<Scalars['String']>
  fit_exists?: Maybe<Scalars['Boolean']>
  fit?: Maybe<Scalars['String']>
  fit_not?: Maybe<Scalars['String']>
  fit_in?: Maybe<Array<Maybe<Scalars['String']>>>
  fit_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  fit_contains?: Maybe<Scalars['String']>
  fit_not_contains?: Maybe<Scalars['String']>
  focusArea_exists?: Maybe<Scalars['Boolean']>
  focusArea?: Maybe<Scalars['String']>
  focusArea_not?: Maybe<Scalars['String']>
  focusArea_in?: Maybe<Array<Maybe<Scalars['String']>>>
  focusArea_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  focusArea_contains?: Maybe<Scalars['String']>
  focusArea_not_contains?: Maybe<Scalars['String']>
  radius_exists?: Maybe<Scalars['Boolean']>
  radius?: Maybe<Scalars['Int']>
  radius_not?: Maybe<Scalars['Int']>
  radius_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  radius_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  radius_gt?: Maybe<Scalars['Int']>
  radius_gte?: Maybe<Scalars['Int']>
  radius_lt?: Maybe<Scalars['Int']>
  radius_lte?: Maybe<Scalars['Int']>
  progressive_exists?: Maybe<Scalars['Boolean']>
  progressive?: Maybe<Scalars['Boolean']>
  progressive_not?: Maybe<Scalars['Boolean']>
  png8_exists?: Maybe<Scalars['Boolean']>
  png8?: Maybe<Scalars['Boolean']>
  png8_not?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<ImageFilter>>>
  AND?: Maybe<Array<Maybe<ImageFilter>>>
}

export enum ImageFormat {
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP',
  Avif = 'AVIF',
}

export type ImageLinkingCollections = {
  __typename?: 'ImageLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  genericPageCollection?: Maybe<GenericPageCollection>
  gridCollection?: Maybe<GridCollection>
  splitBannerCollection?: Maybe<SplitBannerCollection>
  genericPageWithMenuCollection?: Maybe<GenericPageWithMenuCollection>
  cardCollection?: Maybe<CardCollection>
  iconCardCollection?: Maybe<IconCardCollection>
  bannerCollection?: Maybe<BannerCollection>
}

export type ImageLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type ImageLinkingCollectionsGenericPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type ImageLinkingCollectionsGridCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type ImageLinkingCollectionsSplitBannerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type ImageLinkingCollectionsGenericPageWithMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type ImageLinkingCollectionsCardCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type ImageLinkingCollectionsIconCardCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type ImageLinkingCollectionsBannerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum ImageOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  AltAsc = 'alt_ASC',
  AltDesc = 'alt_DESC',
  ObjectFitAsc = 'objectFit_ASC',
  ObjectFitDesc = 'objectFit_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  QualityAsc = 'quality_ASC',
  QualityDesc = 'quality_DESC',
  FormatAsc = 'format_ASC',
  FormatDesc = 'format_DESC',
  FitAsc = 'fit_ASC',
  FitDesc = 'fit_DESC',
  FocusAreaAsc = 'focusArea_ASC',
  FocusAreaDesc = 'focusArea_DESC',
  RadiusAsc = 'radius_ASC',
  RadiusDesc = 'radius_DESC',
  ProgressiveAsc = 'progressive_ASC',
  ProgressiveDesc = 'progressive_DESC',
  Png8Asc = 'png8_ASC',
  Png8Desc = 'png8_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export enum ImageResizeFocus {
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
}

export enum ImageResizeStrategy {
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB',
}

export type ImageTransformOptions = {
  /** Desired width in pixels. Defaults to the original image width. */
  width?: Maybe<Scalars['Dimension']>
  /** Desired height in pixels. Defaults to the original image height. */
  height?: Maybe<Scalars['Dimension']>
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: Maybe<Scalars['Quality']>
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: Maybe<Scalars['Int']>
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: Maybe<ImageResizeStrategy>
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: Maybe<ImageResizeFocus>
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: Maybe<Scalars['HexColor']>
  /** Desired image format. Defaults to the original image format. */
  format?: Maybe<ImageFormat>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenu) */
export type MegaMenu = Entry & {
  __typename?: 'MegaMenu'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<MegaMenuLinkingCollections>
  name?: Maybe<Scalars['String']>
  site?: Maybe<Scalars['String']>
  itemsCollection?: Maybe<MegaMenuItemsCollection>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenu) */
export type MegaMenuLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenu) */
export type MegaMenuNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenu) */
export type MegaMenuSiteArgs = {
  locale?: Maybe<Scalars['String']>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenu) */
export type MegaMenuItemsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type MegaMenuCollection = {
  __typename?: 'MegaMenuCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<MegaMenu>>
}

export type MegaMenuFilter = {
  items?: Maybe<CfMegaMenuItemNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  site_exists?: Maybe<Scalars['Boolean']>
  site?: Maybe<Scalars['String']>
  site_not?: Maybe<Scalars['String']>
  site_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_contains?: Maybe<Scalars['String']>
  site_not_contains?: Maybe<Scalars['String']>
  itemsCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<MegaMenuFilter>>>
  AND?: Maybe<Array<Maybe<MegaMenuFilter>>>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenuItem) */
export type MegaMenuItem = Entry & {
  __typename?: 'MegaMenuItem'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<MegaMenuItemLinkingCollections>
  name?: Maybe<Scalars['String']>
  variant?: Maybe<Scalars['String']>
  link?: Maybe<Cta>
  description?: Maybe<Scalars['String']>
  imagesCollection?: Maybe<AssetCollection>
  childrenCollection?: Maybe<MegaMenuItemChildrenCollection>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenuItem) */
export type MegaMenuItemLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenuItem) */
export type MegaMenuItemNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenuItem) */
export type MegaMenuItemVariantArgs = {
  locale?: Maybe<Scalars['String']>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenuItem) */
export type MegaMenuItemLinkArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenuItem) */
export type MegaMenuItemDescriptionArgs = {
  locale?: Maybe<Scalars['String']>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenuItem) */
export type MegaMenuItemImagesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/megaMenuItem) */
export type MegaMenuItemChildrenCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type MegaMenuItemChildrenCollection = {
  __typename?: 'MegaMenuItemChildrenCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<MegaMenuItem>>
}

export type MegaMenuItemCollection = {
  __typename?: 'MegaMenuItemCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<MegaMenuItem>>
}

export type MegaMenuItemFilter = {
  link?: Maybe<CfCtaNestedFilter>
  children?: Maybe<CfMegaMenuItemNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  variant_exists?: Maybe<Scalars['Boolean']>
  variant?: Maybe<Scalars['String']>
  variant_not?: Maybe<Scalars['String']>
  variant_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_contains?: Maybe<Scalars['String']>
  variant_not_contains?: Maybe<Scalars['String']>
  link_exists?: Maybe<Scalars['Boolean']>
  description_exists?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
  description_not?: Maybe<Scalars['String']>
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  description_contains?: Maybe<Scalars['String']>
  description_not_contains?: Maybe<Scalars['String']>
  imagesCollection_exists?: Maybe<Scalars['Boolean']>
  childrenCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<MegaMenuItemFilter>>>
  AND?: Maybe<Array<Maybe<MegaMenuItemFilter>>>
}

export type MegaMenuItemLinkingCollections = {
  __typename?: 'MegaMenuItemLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  megaMenuItemCollection?: Maybe<MegaMenuItemCollection>
  megaMenuCollection?: Maybe<MegaMenuCollection>
}

export type MegaMenuItemLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type MegaMenuItemLinkingCollectionsMegaMenuItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type MegaMenuItemLinkingCollectionsMegaMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum MegaMenuItemOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  VariantAsc = 'variant_ASC',
  VariantDesc = 'variant_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type MegaMenuItemsCollection = {
  __typename?: 'MegaMenuItemsCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<MegaMenuItem>>
}

export type MegaMenuLinkingCollections = {
  __typename?: 'MegaMenuLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  footerCollection?: Maybe<FooterCollection>
  headerCollection?: Maybe<HeaderCollection>
}

export type MegaMenuLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type MegaMenuLinkingCollectionsFooterCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type MegaMenuLinkingCollectionsHeaderCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum MegaMenuOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SiteAsc = 'site_ASC',
  SiteDesc = 'site_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/metaTags) */
export type MetaTags = Entry & {
  __typename?: 'MetaTags'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<MetaTagsLinkingCollections>
  identifier?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/metaTags) */
export type MetaTagsLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/metaTags) */
export type MetaTagsIdentifierArgs = {
  locale?: Maybe<Scalars['String']>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/metaTags) */
export type MetaTagsNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/metaTags) */
export type MetaTagsContentArgs = {
  locale?: Maybe<Scalars['String']>
}

export type MetaTagsCollection = {
  __typename?: 'MetaTagsCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<MetaTags>>
}

export type MetaTagsFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  identifier_exists?: Maybe<Scalars['Boolean']>
  identifier?: Maybe<Scalars['String']>
  identifier_not?: Maybe<Scalars['String']>
  identifier_in?: Maybe<Array<Maybe<Scalars['String']>>>
  identifier_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  identifier_contains?: Maybe<Scalars['String']>
  identifier_not_contains?: Maybe<Scalars['String']>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  content_exists?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  content_not?: Maybe<Scalars['String']>
  content_in?: Maybe<Array<Maybe<Scalars['String']>>>
  content_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  content_contains?: Maybe<Scalars['String']>
  content_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<MetaTagsFilter>>>
  AND?: Maybe<Array<Maybe<MetaTagsFilter>>>
}

export type MetaTagsLinkingCollections = {
  __typename?: 'MetaTagsLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  plpCollection?: Maybe<PlpCollection>
  seoCollection?: Maybe<SeoCollection>
}

export type MetaTagsLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type MetaTagsLinkingCollectionsPlpCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type MetaTagsLinkingCollectionsSeoCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum MetaTagsOrder {
  IdentifierAsc = 'identifier_ASC',
  IdentifierDesc = 'identifier_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Meta data to store the state of content model through migrations [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/migration) */
export type Migration = Entry & {
  __typename?: 'Migration'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<MigrationLinkingCollections>
  state?: Maybe<Scalars['JSON']>
  contentTypeId?: Maybe<Scalars['String']>
}

/** Meta data to store the state of content model through migrations [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/migration) */
export type MigrationLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Meta data to store the state of content model through migrations [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/migration) */
export type MigrationStateArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Meta data to store the state of content model through migrations [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/migration) */
export type MigrationContentTypeIdArgs = {
  locale?: Maybe<Scalars['String']>
}

export type MigrationCollection = {
  __typename?: 'MigrationCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Migration>>
}

export type MigrationFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  state_exists?: Maybe<Scalars['Boolean']>
  contentTypeId_exists?: Maybe<Scalars['Boolean']>
  contentTypeId?: Maybe<Scalars['String']>
  contentTypeId_not?: Maybe<Scalars['String']>
  contentTypeId_in?: Maybe<Array<Maybe<Scalars['String']>>>
  contentTypeId_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  contentTypeId_contains?: Maybe<Scalars['String']>
  contentTypeId_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<MigrationFilter>>>
  AND?: Maybe<Array<Maybe<MigrationFilter>>>
}

export type MigrationLinkingCollections = {
  __typename?: 'MigrationLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
}

export type MigrationLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum MigrationOrder {
  ContentTypeIdAsc = 'contentTypeId_ASC',
  ContentTypeIdDesc = 'contentTypeId_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Type to hold entries to generate longtail Category/Collection/Brand pages (Product Listing Page, PLP). If a slug that matches the known pattern for Category/Collection pages doesnt have a matching entry of this type the site will automatically generate a PLP based on the slug. [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/plp) */
export type Plp = Entry & {
  __typename?: 'Plp'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<PlpLinkingCollections>
  name?: Maybe<Scalars['String']>
  site?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  breadcrumbsCollection?: Maybe<PlpBreadcrumbsCollection>
  seo?: Maybe<Seo>
  hiddenfiltersCollection?: Maybe<PlpHiddenfiltersCollection>
  urlfiltersCollection?: Maybe<PlpUrlfiltersCollection>
}

/** Type to hold entries to generate longtail Category/Collection/Brand pages (Product Listing Page, PLP). If a slug that matches the known pattern for Category/Collection pages doesnt have a matching entry of this type the site will automatically generate a PLP based on the slug. [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/plp) */
export type PlpLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Type to hold entries to generate longtail Category/Collection/Brand pages (Product Listing Page, PLP). If a slug that matches the known pattern for Category/Collection pages doesnt have a matching entry of this type the site will automatically generate a PLP based on the slug. [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/plp) */
export type PlpNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Type to hold entries to generate longtail Category/Collection/Brand pages (Product Listing Page, PLP). If a slug that matches the known pattern for Category/Collection pages doesnt have a matching entry of this type the site will automatically generate a PLP based on the slug. [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/plp) */
export type PlpSiteArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Type to hold entries to generate longtail Category/Collection/Brand pages (Product Listing Page, PLP). If a slug that matches the known pattern for Category/Collection pages doesnt have a matching entry of this type the site will automatically generate a PLP based on the slug. [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/plp) */
export type PlpSlugArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Type to hold entries to generate longtail Category/Collection/Brand pages (Product Listing Page, PLP). If a slug that matches the known pattern for Category/Collection pages doesnt have a matching entry of this type the site will automatically generate a PLP based on the slug. [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/plp) */
export type PlpTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Type to hold entries to generate longtail Category/Collection/Brand pages (Product Listing Page, PLP). If a slug that matches the known pattern for Category/Collection pages doesnt have a matching entry of this type the site will automatically generate a PLP based on the slug. [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/plp) */
export type PlpBreadcrumbsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Type to hold entries to generate longtail Category/Collection/Brand pages (Product Listing Page, PLP). If a slug that matches the known pattern for Category/Collection pages doesnt have a matching entry of this type the site will automatically generate a PLP based on the slug. [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/plp) */
export type PlpSeoArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Type to hold entries to generate longtail Category/Collection/Brand pages (Product Listing Page, PLP). If a slug that matches the known pattern for Category/Collection pages doesnt have a matching entry of this type the site will automatically generate a PLP based on the slug. [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/plp) */
export type PlpHiddenfiltersCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Type to hold entries to generate longtail Category/Collection/Brand pages (Product Listing Page, PLP). If a slug that matches the known pattern for Category/Collection pages doesnt have a matching entry of this type the site will automatically generate a PLP based on the slug. [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/plp) */
export type PlpUrlfiltersCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type PlpBreadcrumbsCollection = {
  __typename?: 'PlpBreadcrumbsCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Cta>>
}

export type PlpCollection = {
  __typename?: 'PlpCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Plp>>
}

export type PlpFilter = {
  breadcrumbs?: Maybe<CfCtaNestedFilter>
  seo?: Maybe<CfSeoNestedFilter>
  hiddenfilters?: Maybe<CfMetaTagsNestedFilter>
  urlfilters?: Maybe<CfMetaTagsNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  site_exists?: Maybe<Scalars['Boolean']>
  site?: Maybe<Scalars['String']>
  site_not?: Maybe<Scalars['String']>
  site_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_contains?: Maybe<Scalars['String']>
  site_not_contains?: Maybe<Scalars['String']>
  slug_exists?: Maybe<Scalars['Boolean']>
  slug?: Maybe<Scalars['String']>
  slug_not?: Maybe<Scalars['String']>
  slug_in?: Maybe<Array<Maybe<Scalars['String']>>>
  slug_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  slug_contains?: Maybe<Scalars['String']>
  slug_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  breadcrumbsCollection_exists?: Maybe<Scalars['Boolean']>
  seo_exists?: Maybe<Scalars['Boolean']>
  hiddenfiltersCollection_exists?: Maybe<Scalars['Boolean']>
  urlfiltersCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<PlpFilter>>>
  AND?: Maybe<Array<Maybe<PlpFilter>>>
}

export type PlpHiddenfiltersCollection = {
  __typename?: 'PlpHiddenfiltersCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<MetaTags>>
}

export type PlpLinkingCollections = {
  __typename?: 'PlpLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  ctaCollection?: Maybe<CtaCollection>
}

export type PlpLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type PlpLinkingCollectionsCtaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum PlpOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SiteAsc = 'site_ASC',
  SiteDesc = 'site_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type PlpUrlfiltersCollection = {
  __typename?: 'PlpUrlfiltersCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<MetaTags>>
}

export type Query = {
  __typename?: 'Query'
  asset?: Maybe<Asset>
  assetCollection?: Maybe<AssetCollection>
  cta?: Maybe<Cta>
  ctaCollection?: Maybe<CtaCollection>
  plp?: Maybe<Plp>
  plpCollection?: Maybe<PlpCollection>
  carousel?: Maybe<Carousel>
  carouselCollection?: Maybe<CarouselCollection>
  genericPage?: Maybe<GenericPage>
  genericPageCollection?: Maybe<GenericPageCollection>
  bannerImageCarousel?: Maybe<BannerImageCarousel>
  bannerImageCarouselCollection?: Maybe<BannerImageCarouselCollection>
  sitemapPage?: Maybe<SitemapPage>
  sitemapPageCollection?: Maybe<SitemapPageCollection>
  sitemapIndex?: Maybe<SitemapIndex>
  sitemapIndexCollection?: Maybe<SitemapIndexCollection>
  grid?: Maybe<Grid>
  gridCollection?: Maybe<GridCollection>
  image?: Maybe<Image>
  imageCollection?: Maybe<ImageCollection>
  theme?: Maybe<Theme>
  themeCollection?: Maybe<ThemeCollection>
  footer?: Maybe<Footer>
  footerCollection?: Maybe<FooterCollection>
  seo?: Maybe<Seo>
  seoCollection?: Maybe<SeoCollection>
  metaTags?: Maybe<MetaTags>
  metaTagsCollection?: Maybe<MetaTagsCollection>
  header?: Maybe<Header>
  headerCollection?: Maybe<HeaderCollection>
  textComponent?: Maybe<TextComponent>
  textComponentCollection?: Maybe<TextComponentCollection>
  splitBanner?: Maybe<SplitBanner>
  splitBannerCollection?: Maybe<SplitBannerCollection>
  genericPageWithMenu?: Maybe<GenericPageWithMenu>
  genericPageWithMenuCollection?: Maybe<GenericPageWithMenuCollection>
  card?: Maybe<Card>
  cardCollection?: Maybe<CardCollection>
  iconCard?: Maybe<IconCard>
  iconCardCollection?: Maybe<IconCardCollection>
  banner?: Maybe<Banner>
  bannerCollection?: Maybe<BannerCollection>
  titleAndLink?: Maybe<TitleAndLink>
  titleAndLinkCollection?: Maybe<TitleAndLinkCollection>
  megaMenuItem?: Maybe<MegaMenuItem>
  megaMenuItemCollection?: Maybe<MegaMenuItemCollection>
  accordion?: Maybe<Accordion>
  accordionCollection?: Maybe<AccordionCollection>
  megaMenu?: Maybe<MegaMenu>
  megaMenuCollection?: Maybe<MegaMenuCollection>
  migration?: Maybe<Migration>
  migrationCollection?: Maybe<MigrationCollection>
  entryCollection?: Maybe<EntryCollection>
}

export type QueryAssetArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryAssetCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<AssetFilter>
  order?: Maybe<Array<Maybe<AssetOrder>>>
}

export type QueryCtaArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryCtaCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<CtaFilter>
  order?: Maybe<Array<Maybe<CtaOrder>>>
}

export type QueryPlpArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryPlpCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<PlpFilter>
  order?: Maybe<Array<Maybe<PlpOrder>>>
}

export type QueryCarouselArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryCarouselCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<CarouselFilter>
  order?: Maybe<Array<Maybe<CarouselOrder>>>
}

export type QueryGenericPageArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryGenericPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<GenericPageFilter>
  order?: Maybe<Array<Maybe<GenericPageOrder>>>
}

export type QueryBannerImageCarouselArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryBannerImageCarouselCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<BannerImageCarouselFilter>
  order?: Maybe<Array<Maybe<BannerImageCarouselOrder>>>
}

export type QuerySitemapPageArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QuerySitemapPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<SitemapPageFilter>
  order?: Maybe<Array<Maybe<SitemapPageOrder>>>
}

export type QuerySitemapIndexArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QuerySitemapIndexCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<SitemapIndexFilter>
  order?: Maybe<Array<Maybe<SitemapIndexOrder>>>
}

export type QueryGridArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryGridCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<GridFilter>
  order?: Maybe<Array<Maybe<GridOrder>>>
}

export type QueryImageArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryImageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<ImageFilter>
  order?: Maybe<Array<Maybe<ImageOrder>>>
}

export type QueryThemeArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryThemeCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<ThemeFilter>
  order?: Maybe<Array<Maybe<ThemeOrder>>>
}

export type QueryFooterArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryFooterCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<FooterFilter>
  order?: Maybe<Array<Maybe<FooterOrder>>>
}

export type QuerySeoArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QuerySeoCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<SeoFilter>
  order?: Maybe<Array<Maybe<SeoOrder>>>
}

export type QueryMetaTagsArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryMetaTagsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<MetaTagsFilter>
  order?: Maybe<Array<Maybe<MetaTagsOrder>>>
}

export type QueryHeaderArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryHeaderCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<HeaderFilter>
  order?: Maybe<Array<Maybe<HeaderOrder>>>
}

export type QueryTextComponentArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryTextComponentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<TextComponentFilter>
  order?: Maybe<Array<Maybe<TextComponentOrder>>>
}

export type QuerySplitBannerArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QuerySplitBannerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<SplitBannerFilter>
  order?: Maybe<Array<Maybe<SplitBannerOrder>>>
}

export type QueryGenericPageWithMenuArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryGenericPageWithMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<GenericPageWithMenuFilter>
  order?: Maybe<Array<Maybe<GenericPageWithMenuOrder>>>
}

export type QueryCardArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryCardCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<CardFilter>
  order?: Maybe<Array<Maybe<CardOrder>>>
}

export type QueryIconCardArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryIconCardCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<IconCardFilter>
  order?: Maybe<Array<Maybe<IconCardOrder>>>
}

export type QueryBannerArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryBannerCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<BannerFilter>
  order?: Maybe<Array<Maybe<BannerOrder>>>
}

export type QueryTitleAndLinkArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryTitleAndLinkCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<TitleAndLinkFilter>
  order?: Maybe<Array<Maybe<TitleAndLinkOrder>>>
}

export type QueryMegaMenuItemArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryMegaMenuItemCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<MegaMenuItemFilter>
  order?: Maybe<Array<Maybe<MegaMenuItemOrder>>>
}

export type QueryAccordionArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryAccordionCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<AccordionFilter>
  order?: Maybe<Array<Maybe<AccordionOrder>>>
}

export type QueryMegaMenuArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryMegaMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<MegaMenuFilter>
  order?: Maybe<Array<Maybe<MegaMenuOrder>>>
}

export type QueryMigrationArgs = {
  id: Scalars['String']
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type QueryMigrationCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<MigrationFilter>
  order?: Maybe<Array<Maybe<MigrationOrder>>>
}

export type QueryEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
  where?: Maybe<EntryFilter>
  order?: Maybe<Array<Maybe<EntryOrder>>>
}

/** SEO Metadata for web pages [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/seo) */
export type Seo = Entry & {
  __typename?: 'Seo'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<SeoLinkingCollections>
  name?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>
  noIndex?: Maybe<Scalars['Boolean']>
  noFollow?: Maybe<Scalars['Boolean']>
  metaTagsCollection?: Maybe<SeoMetaTagsCollection>
}

/** SEO Metadata for web pages [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/seo) */
export type SeoLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** SEO Metadata for web pages [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/seo) */
export type SeoNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** SEO Metadata for web pages [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/seo) */
export type SeoTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** SEO Metadata for web pages [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/seo) */
export type SeoDescriptionArgs = {
  locale?: Maybe<Scalars['String']>
}

/** SEO Metadata for web pages [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/seo) */
export type SeoKeywordsArgs = {
  locale?: Maybe<Scalars['String']>
}

/** SEO Metadata for web pages [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/seo) */
export type SeoNoIndexArgs = {
  locale?: Maybe<Scalars['String']>
}

/** SEO Metadata for web pages [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/seo) */
export type SeoNoFollowArgs = {
  locale?: Maybe<Scalars['String']>
}

/** SEO Metadata for web pages [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/seo) */
export type SeoMetaTagsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type SeoCollection = {
  __typename?: 'SeoCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Seo>>
}

export type SeoFilter = {
  metaTags?: Maybe<CfMetaTagsNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  description_exists?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
  description_not?: Maybe<Scalars['String']>
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  description_contains?: Maybe<Scalars['String']>
  description_not_contains?: Maybe<Scalars['String']>
  keywords_exists?: Maybe<Scalars['Boolean']>
  keywords_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>
  keywords_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>
  keywords_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>
  no_index_exists?: Maybe<Scalars['Boolean']>
  no_index?: Maybe<Scalars['Boolean']>
  no_index_not?: Maybe<Scalars['Boolean']>
  no_follow_exists?: Maybe<Scalars['Boolean']>
  no_follow?: Maybe<Scalars['Boolean']>
  no_follow_not?: Maybe<Scalars['Boolean']>
  metaTagsCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<SeoFilter>>>
  AND?: Maybe<Array<Maybe<SeoFilter>>>
}

export type SeoLinkingCollections = {
  __typename?: 'SeoLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  plpCollection?: Maybe<PlpCollection>
  genericPageCollection?: Maybe<GenericPageCollection>
  genericPageWithMenuCollection?: Maybe<GenericPageWithMenuCollection>
}

export type SeoLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type SeoLinkingCollectionsPlpCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type SeoLinkingCollectionsGenericPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type SeoLinkingCollectionsGenericPageWithMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type SeoMetaTagsCollection = {
  __typename?: 'SeoMetaTagsCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<MetaTags>>
}

export enum SeoOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  NoIndexAsc = 'no_index_ASC',
  NoIndexDesc = 'no_index_DESC',
  NoFollowAsc = 'no_follow_ASC',
  NoFollowDesc = 'no_follow_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndex = Entry & {
  __typename?: 'SitemapIndex'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<SitemapIndexLinkingCollections>
  title?: Maybe<Scalars['String']>
  created?: Maybe<Scalars['DateTime']>
  updated?: Maybe<Scalars['DateTime']>
  expirationDate?: Maybe<Scalars['DateTime']>
  currentPage?: Maybe<Scalars['Int']>
  totalProducts?: Maybe<Scalars['Int']>
  totalPages?: Maybe<Scalars['Int']>
  cursor?: Maybe<Scalars['String']>
  data?: Maybe<SitemapIndexData>
  site?: Maybe<Scalars['String']>
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndexLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndexTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndexCreatedArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndexUpdatedArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndexExpirationDateArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndexCurrentPageArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndexTotalProductsArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndexTotalPagesArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndexCursorArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndexDataArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product index [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapIndex) */
export type SitemapIndexSiteArgs = {
  locale?: Maybe<Scalars['String']>
}

export type SitemapIndexCollection = {
  __typename?: 'SitemapIndexCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<SitemapIndex>>
}

export type SitemapIndexData = {
  __typename?: 'SitemapIndexData'
  json: Scalars['JSON']
  links: SitemapIndexDataLinks
}

export type SitemapIndexDataAssets = {
  __typename?: 'SitemapIndexDataAssets'
  hyperlink: Array<Maybe<Asset>>
  block: Array<Maybe<Asset>>
}

export type SitemapIndexDataEntries = {
  __typename?: 'SitemapIndexDataEntries'
  inline: Array<Maybe<Entry>>
  hyperlink: Array<Maybe<Entry>>
  block: Array<Maybe<Entry>>
}

export type SitemapIndexDataLinks = {
  __typename?: 'SitemapIndexDataLinks'
  entries: SitemapIndexDataEntries
  assets: SitemapIndexDataAssets
}

export type SitemapIndexFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  created_exists?: Maybe<Scalars['Boolean']>
  created?: Maybe<Scalars['DateTime']>
  created_not?: Maybe<Scalars['DateTime']>
  created_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  created_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  created_gt?: Maybe<Scalars['DateTime']>
  created_gte?: Maybe<Scalars['DateTime']>
  created_lt?: Maybe<Scalars['DateTime']>
  created_lte?: Maybe<Scalars['DateTime']>
  updated_exists?: Maybe<Scalars['Boolean']>
  updated?: Maybe<Scalars['DateTime']>
  updated_not?: Maybe<Scalars['DateTime']>
  updated_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  updated_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  updated_gt?: Maybe<Scalars['DateTime']>
  updated_gte?: Maybe<Scalars['DateTime']>
  updated_lt?: Maybe<Scalars['DateTime']>
  updated_lte?: Maybe<Scalars['DateTime']>
  expirationDate_exists?: Maybe<Scalars['Boolean']>
  expirationDate?: Maybe<Scalars['DateTime']>
  expirationDate_not?: Maybe<Scalars['DateTime']>
  expirationDate_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  expirationDate_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  expirationDate_gt?: Maybe<Scalars['DateTime']>
  expirationDate_gte?: Maybe<Scalars['DateTime']>
  expirationDate_lt?: Maybe<Scalars['DateTime']>
  expirationDate_lte?: Maybe<Scalars['DateTime']>
  currentPage_exists?: Maybe<Scalars['Boolean']>
  currentPage?: Maybe<Scalars['Int']>
  currentPage_not?: Maybe<Scalars['Int']>
  currentPage_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  currentPage_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  currentPage_gt?: Maybe<Scalars['Int']>
  currentPage_gte?: Maybe<Scalars['Int']>
  currentPage_lt?: Maybe<Scalars['Int']>
  currentPage_lte?: Maybe<Scalars['Int']>
  totalProducts_exists?: Maybe<Scalars['Boolean']>
  totalProducts?: Maybe<Scalars['Int']>
  totalProducts_not?: Maybe<Scalars['Int']>
  totalProducts_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  totalProducts_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  totalProducts_gt?: Maybe<Scalars['Int']>
  totalProducts_gte?: Maybe<Scalars['Int']>
  totalProducts_lt?: Maybe<Scalars['Int']>
  totalProducts_lte?: Maybe<Scalars['Int']>
  totalPages_exists?: Maybe<Scalars['Boolean']>
  totalPages?: Maybe<Scalars['Int']>
  totalPages_not?: Maybe<Scalars['Int']>
  totalPages_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  totalPages_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  totalPages_gt?: Maybe<Scalars['Int']>
  totalPages_gte?: Maybe<Scalars['Int']>
  totalPages_lt?: Maybe<Scalars['Int']>
  totalPages_lte?: Maybe<Scalars['Int']>
  cursor_exists?: Maybe<Scalars['Boolean']>
  cursor?: Maybe<Scalars['String']>
  cursor_not?: Maybe<Scalars['String']>
  cursor_in?: Maybe<Array<Maybe<Scalars['String']>>>
  cursor_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  cursor_contains?: Maybe<Scalars['String']>
  cursor_not_contains?: Maybe<Scalars['String']>
  data_exists?: Maybe<Scalars['Boolean']>
  data_contains?: Maybe<Scalars['String']>
  data_not_contains?: Maybe<Scalars['String']>
  site_exists?: Maybe<Scalars['Boolean']>
  site?: Maybe<Scalars['String']>
  site_not?: Maybe<Scalars['String']>
  site_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_contains?: Maybe<Scalars['String']>
  site_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<SitemapIndexFilter>>>
  AND?: Maybe<Array<Maybe<SitemapIndexFilter>>>
}

export type SitemapIndexLinkingCollections = {
  __typename?: 'SitemapIndexLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
}

export type SitemapIndexLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum SitemapIndexOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  CreatedAsc = 'created_ASC',
  CreatedDesc = 'created_DESC',
  UpdatedAsc = 'updated_ASC',
  UpdatedDesc = 'updated_DESC',
  ExpirationDateAsc = 'expirationDate_ASC',
  ExpirationDateDesc = 'expirationDate_DESC',
  CurrentPageAsc = 'currentPage_ASC',
  CurrentPageDesc = 'currentPage_DESC',
  TotalProductsAsc = 'totalProducts_ASC',
  TotalProductsDesc = 'totalProducts_DESC',
  TotalPagesAsc = 'totalPages_ASC',
  TotalPagesDesc = 'totalPages_DESC',
  CursorAsc = 'cursor_ASC',
  CursorDesc = 'cursor_DESC',
  SiteAsc = 'site_ASC',
  SiteDesc = 'site_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Stores sitemap product page content [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapPage) */
export type SitemapPage = Entry & {
  __typename?: 'SitemapPage'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<SitemapPageLinkingCollections>
  title?: Maybe<Scalars['String']>
  created?: Maybe<Scalars['DateTime']>
  updated?: Maybe<Scalars['DateTime']>
  expirationDate?: Maybe<Scalars['DateTime']>
  page?: Maybe<Scalars['Int']>
  xmlFile?: Maybe<Asset>
  site?: Maybe<Scalars['String']>
}

/** Stores sitemap product page content [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapPage) */
export type SitemapPageLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Stores sitemap product page content [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapPage) */
export type SitemapPageTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product page content [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapPage) */
export type SitemapPageCreatedArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product page content [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapPage) */
export type SitemapPageUpdatedArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product page content [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapPage) */
export type SitemapPageExpirationDateArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product page content [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapPage) */
export type SitemapPagePageArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product page content [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapPage) */
export type SitemapPageXmlFileArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Stores sitemap product page content [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/sitemapPage) */
export type SitemapPageSiteArgs = {
  locale?: Maybe<Scalars['String']>
}

export type SitemapPageCollection = {
  __typename?: 'SitemapPageCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<SitemapPage>>
}

export type SitemapPageFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  created_exists?: Maybe<Scalars['Boolean']>
  created?: Maybe<Scalars['DateTime']>
  created_not?: Maybe<Scalars['DateTime']>
  created_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  created_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  created_gt?: Maybe<Scalars['DateTime']>
  created_gte?: Maybe<Scalars['DateTime']>
  created_lt?: Maybe<Scalars['DateTime']>
  created_lte?: Maybe<Scalars['DateTime']>
  updated_exists?: Maybe<Scalars['Boolean']>
  updated?: Maybe<Scalars['DateTime']>
  updated_not?: Maybe<Scalars['DateTime']>
  updated_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  updated_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  updated_gt?: Maybe<Scalars['DateTime']>
  updated_gte?: Maybe<Scalars['DateTime']>
  updated_lt?: Maybe<Scalars['DateTime']>
  updated_lte?: Maybe<Scalars['DateTime']>
  expirationDate_exists?: Maybe<Scalars['Boolean']>
  expirationDate?: Maybe<Scalars['DateTime']>
  expirationDate_not?: Maybe<Scalars['DateTime']>
  expirationDate_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  expirationDate_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  expirationDate_gt?: Maybe<Scalars['DateTime']>
  expirationDate_gte?: Maybe<Scalars['DateTime']>
  expirationDate_lt?: Maybe<Scalars['DateTime']>
  expirationDate_lte?: Maybe<Scalars['DateTime']>
  page_exists?: Maybe<Scalars['Boolean']>
  page?: Maybe<Scalars['Int']>
  page_not?: Maybe<Scalars['Int']>
  page_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  page_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  page_gt?: Maybe<Scalars['Int']>
  page_gte?: Maybe<Scalars['Int']>
  page_lt?: Maybe<Scalars['Int']>
  page_lte?: Maybe<Scalars['Int']>
  xmlFile_exists?: Maybe<Scalars['Boolean']>
  site_exists?: Maybe<Scalars['Boolean']>
  site?: Maybe<Scalars['String']>
  site_not?: Maybe<Scalars['String']>
  site_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_contains?: Maybe<Scalars['String']>
  site_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<SitemapPageFilter>>>
  AND?: Maybe<Array<Maybe<SitemapPageFilter>>>
}

export type SitemapPageLinkingCollections = {
  __typename?: 'SitemapPageLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
}

export type SitemapPageLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum SitemapPageOrder {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  CreatedAsc = 'created_ASC',
  CreatedDesc = 'created_DESC',
  UpdatedAsc = 'updated_ASC',
  UpdatedDesc = 'updated_DESC',
  ExpirationDateAsc = 'expirationDate_ASC',
  ExpirationDateDesc = 'expirationDate_DESC',
  PageAsc = 'page_ASC',
  PageDesc = 'page_DESC',
  SiteAsc = 'site_ASC',
  SiteDesc = 'site_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Split Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/splitBanner) */
export type SplitBanner = Entry & {
  __typename?: 'SplitBanner'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<SplitBannerLinkingCollections>
  name?: Maybe<Scalars['String']>
  eyebrow?: Maybe<Scalars['String']>
  mainContent?: Maybe<SplitBannerMainContent>
  mainContentAlignment?: Maybe<Scalars['String']>
  additionalContent?: Maybe<Image>
  orientation?: Maybe<Scalars['String']>
  theme?: Maybe<Scalars['String']>
  fullWidth?: Maybe<Scalars['Boolean']>
}

/** Split Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/splitBanner) */
export type SplitBannerLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Split Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/splitBanner) */
export type SplitBannerNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Split Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/splitBanner) */
export type SplitBannerEyebrowArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Split Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/splitBanner) */
export type SplitBannerMainContentArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Split Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/splitBanner) */
export type SplitBannerMainContentAlignmentArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Split Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/splitBanner) */
export type SplitBannerAdditionalContentArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Split Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/splitBanner) */
export type SplitBannerOrientationArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Split Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/splitBanner) */
export type SplitBannerThemeArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Split Banner [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/splitBanner) */
export type SplitBannerFullWidthArgs = {
  locale?: Maybe<Scalars['String']>
}

export type SplitBannerCollection = {
  __typename?: 'SplitBannerCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<SplitBanner>>
}

export type SplitBannerFilter = {
  additionalContent?: Maybe<CfImageNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  eyebrow_exists?: Maybe<Scalars['Boolean']>
  eyebrow?: Maybe<Scalars['String']>
  eyebrow_not?: Maybe<Scalars['String']>
  eyebrow_in?: Maybe<Array<Maybe<Scalars['String']>>>
  eyebrow_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  eyebrow_contains?: Maybe<Scalars['String']>
  eyebrow_not_contains?: Maybe<Scalars['String']>
  mainContent_exists?: Maybe<Scalars['Boolean']>
  mainContent_contains?: Maybe<Scalars['String']>
  mainContent_not_contains?: Maybe<Scalars['String']>
  mainContentAlignment_exists?: Maybe<Scalars['Boolean']>
  mainContentAlignment?: Maybe<Scalars['String']>
  mainContentAlignment_not?: Maybe<Scalars['String']>
  mainContentAlignment_in?: Maybe<Array<Maybe<Scalars['String']>>>
  mainContentAlignment_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  mainContentAlignment_contains?: Maybe<Scalars['String']>
  mainContentAlignment_not_contains?: Maybe<Scalars['String']>
  additionalContent_exists?: Maybe<Scalars['Boolean']>
  orientation_exists?: Maybe<Scalars['Boolean']>
  orientation?: Maybe<Scalars['String']>
  orientation_not?: Maybe<Scalars['String']>
  orientation_in?: Maybe<Array<Maybe<Scalars['String']>>>
  orientation_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  orientation_contains?: Maybe<Scalars['String']>
  orientation_not_contains?: Maybe<Scalars['String']>
  theme_exists?: Maybe<Scalars['Boolean']>
  theme?: Maybe<Scalars['String']>
  theme_not?: Maybe<Scalars['String']>
  theme_in?: Maybe<Array<Maybe<Scalars['String']>>>
  theme_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  theme_contains?: Maybe<Scalars['String']>
  theme_not_contains?: Maybe<Scalars['String']>
  fullWidth_exists?: Maybe<Scalars['Boolean']>
  fullWidth?: Maybe<Scalars['Boolean']>
  fullWidth_not?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<SplitBannerFilter>>>
  AND?: Maybe<Array<Maybe<SplitBannerFilter>>>
}

export type SplitBannerLinkingCollections = {
  __typename?: 'SplitBannerLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  genericPageCollection?: Maybe<GenericPageCollection>
  genericPageWithMenuCollection?: Maybe<GenericPageWithMenuCollection>
}

export type SplitBannerLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type SplitBannerLinkingCollectionsGenericPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type SplitBannerLinkingCollectionsGenericPageWithMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type SplitBannerMainContent = {
  __typename?: 'SplitBannerMainContent'
  json: Scalars['JSON']
  links: SplitBannerMainContentLinks
}

export type SplitBannerMainContentAssets = {
  __typename?: 'SplitBannerMainContentAssets'
  hyperlink: Array<Maybe<Asset>>
  block: Array<Maybe<Asset>>
}

export type SplitBannerMainContentEntries = {
  __typename?: 'SplitBannerMainContentEntries'
  inline: Array<Maybe<Entry>>
  hyperlink: Array<Maybe<Entry>>
  block: Array<Maybe<Entry>>
}

export type SplitBannerMainContentLinks = {
  __typename?: 'SplitBannerMainContentLinks'
  entries: SplitBannerMainContentEntries
  assets: SplitBannerMainContentAssets
}

export enum SplitBannerOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  EyebrowAsc = 'eyebrow_ASC',
  EyebrowDesc = 'eyebrow_DESC',
  MainContentAlignmentAsc = 'mainContentAlignment_ASC',
  MainContentAlignmentDesc = 'mainContentAlignment_DESC',
  OrientationAsc = 'orientation_ASC',
  OrientationDesc = 'orientation_DESC',
  ThemeAsc = 'theme_ASC',
  ThemeDesc = 'theme_DESC',
  FullWidthAsc = 'fullWidth_ASC',
  FullWidthDesc = 'fullWidth_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type Sys = {
  __typename?: 'Sys'
  id: Scalars['String']
  spaceId: Scalars['String']
  environmentId: Scalars['String']
  publishedAt?: Maybe<Scalars['DateTime']>
  firstPublishedAt?: Maybe<Scalars['DateTime']>
  publishedVersion?: Maybe<Scalars['Int']>
}

export type SysFilter = {
  id_exists?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  id_not?: Maybe<Scalars['String']>
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  id_contains?: Maybe<Scalars['String']>
  id_not_contains?: Maybe<Scalars['String']>
  publishedAt_exists?: Maybe<Scalars['Boolean']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  publishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  firstPublishedAt_exists?: Maybe<Scalars['Boolean']>
  firstPublishedAt?: Maybe<Scalars['DateTime']>
  firstPublishedAt_not?: Maybe<Scalars['DateTime']>
  firstPublishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  firstPublishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>
  firstPublishedAt_gt?: Maybe<Scalars['DateTime']>
  firstPublishedAt_gte?: Maybe<Scalars['DateTime']>
  firstPublishedAt_lt?: Maybe<Scalars['DateTime']>
  firstPublishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedVersion_exists?: Maybe<Scalars['Boolean']>
  publishedVersion?: Maybe<Scalars['Float']>
  publishedVersion_not?: Maybe<Scalars['Float']>
  publishedVersion_in?: Maybe<Array<Maybe<Scalars['Float']>>>
  publishedVersion_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>
  publishedVersion_gt?: Maybe<Scalars['Float']>
  publishedVersion_gte?: Maybe<Scalars['Float']>
  publishedVersion_lt?: Maybe<Scalars['Float']>
  publishedVersion_lte?: Maybe<Scalars['Float']>
}

/** Component title and text with the ability to align both on the page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/textComponent) */
export type TextComponent = Entry & {
  __typename?: 'TextComponent'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<TextComponentLinkingCollections>
  name?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  titleAlignment?: Maybe<Scalars['String']>
  text?: Maybe<TextComponentText>
  textAlignment?: Maybe<Scalars['String']>
}

/** Component title and text with the ability to align both on the page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/textComponent) */
export type TextComponentLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Component title and text with the ability to align both on the page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/textComponent) */
export type TextComponentNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component title and text with the ability to align both on the page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/textComponent) */
export type TextComponentTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component title and text with the ability to align both on the page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/textComponent) */
export type TextComponentTitleAlignmentArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component title and text with the ability to align both on the page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/textComponent) */
export type TextComponentTextArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Component title and text with the ability to align both on the page [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/textComponent) */
export type TextComponentTextAlignmentArgs = {
  locale?: Maybe<Scalars['String']>
}

export type TextComponentCollection = {
  __typename?: 'TextComponentCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<TextComponent>>
}

export type TextComponentFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  titleAlignment_exists?: Maybe<Scalars['Boolean']>
  titleAlignment?: Maybe<Scalars['String']>
  titleAlignment_not?: Maybe<Scalars['String']>
  titleAlignment_in?: Maybe<Array<Maybe<Scalars['String']>>>
  titleAlignment_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  titleAlignment_contains?: Maybe<Scalars['String']>
  titleAlignment_not_contains?: Maybe<Scalars['String']>
  text_exists?: Maybe<Scalars['Boolean']>
  text_contains?: Maybe<Scalars['String']>
  text_not_contains?: Maybe<Scalars['String']>
  textAlignment_exists?: Maybe<Scalars['Boolean']>
  textAlignment?: Maybe<Scalars['String']>
  textAlignment_not?: Maybe<Scalars['String']>
  textAlignment_in?: Maybe<Array<Maybe<Scalars['String']>>>
  textAlignment_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  textAlignment_contains?: Maybe<Scalars['String']>
  textAlignment_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<TextComponentFilter>>>
  AND?: Maybe<Array<Maybe<TextComponentFilter>>>
}

export type TextComponentLinkingCollections = {
  __typename?: 'TextComponentLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  genericPageCollection?: Maybe<GenericPageCollection>
  genericPageWithMenuCollection?: Maybe<GenericPageWithMenuCollection>
}

export type TextComponentLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type TextComponentLinkingCollectionsGenericPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type TextComponentLinkingCollectionsGenericPageWithMenuCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum TextComponentOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TitleAlignmentAsc = 'titleAlignment_ASC',
  TitleAlignmentDesc = 'titleAlignment_DESC',
  TextAlignmentAsc = 'textAlignment_ASC',
  TextAlignmentDesc = 'textAlignment_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type TextComponentText = {
  __typename?: 'TextComponentText'
  json: Scalars['JSON']
  links: TextComponentTextLinks
}

export type TextComponentTextAssets = {
  __typename?: 'TextComponentTextAssets'
  hyperlink: Array<Maybe<Asset>>
  block: Array<Maybe<Asset>>
}

export type TextComponentTextEntries = {
  __typename?: 'TextComponentTextEntries'
  inline: Array<Maybe<Entry>>
  hyperlink: Array<Maybe<Entry>>
  block: Array<Maybe<Entry>>
}

export type TextComponentTextLinks = {
  __typename?: 'TextComponentTextLinks'
  entries: TextComponentTextEntries
  assets: TextComponentTextAssets
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type Theme = Entry & {
  __typename?: 'Theme'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<ThemeLinkingCollections>
  name?: Maybe<Scalars['String']>
  site?: Maybe<Scalars['String']>
  colorsPrimary?: Maybe<Scalars['JSON']>
  colorsSecondary?: Maybe<Scalars['JSON']>
  colorsAccent?: Maybe<Scalars['JSON']>
  colorsShading?: Maybe<Scalars['JSON']>
  typographyFonts?: Maybe<Scalars['JSON']>
  googleFontsApi?: Maybe<Scalars['String']>
  openPathToggle?: Maybe<Scalars['Boolean']>
  paypalToggle?: Maybe<Scalars['Boolean']>
  amazonPayToggle?: Maybe<Scalars['Boolean']>
  affirmToggle?: Maybe<Scalars['Boolean']>
  customerServicePhone?: Maybe<Scalars['String']>
  customerServiceEmail?: Maybe<Scalars['String']>
  storeLiteral?: Maybe<Scalars['String']>
  storeName?: Maybe<Scalars['String']>
  storeDescription?: Maybe<Scalars['String']>
  storeTelephone?: Maybe<Scalars['String']>
  storeStreetAddress?: Maybe<Scalars['String']>
  storeAddressLocality?: Maybe<Scalars['String']>
  storeAddressRegion?: Maybe<Scalars['String']>
  storePostalCode?: Maybe<Scalars['String']>
  storeCountry?: Maybe<Scalars['String']>
  storeLogo?: Maybe<Scalars['String']>
  storeOpenHours?: Maybe<Scalars['String']>
  storeCloseHours?: Maybe<Scalars['String']>
  organizationName?: Maybe<Scalars['String']>
  favicon?: Maybe<Asset>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeSiteArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeColorsPrimaryArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeColorsSecondaryArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeColorsAccentArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeColorsShadingArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeTypographyFontsArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeGoogleFontsApiArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeOpenPathToggleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemePaypalToggleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeAmazonPayToggleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeAffirmToggleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeCustomerServicePhoneArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeCustomerServiceEmailArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStoreLiteralArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStoreNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStoreDescriptionArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStoreTelephoneArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStoreStreetAddressArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStoreAddressLocalityArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStoreAddressRegionArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStorePostalCodeArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStoreCountryArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStoreLogoArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStoreOpenHoursArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeStoreCloseHoursArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeOrganizationNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Chakra UI Theme Mixins [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/theme) */
export type ThemeFaviconArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type ThemeCollection = {
  __typename?: 'ThemeCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Theme>>
}

export type ThemeFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  site_exists?: Maybe<Scalars['Boolean']>
  site?: Maybe<Scalars['String']>
  site_not?: Maybe<Scalars['String']>
  site_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_contains?: Maybe<Scalars['String']>
  site_not_contains?: Maybe<Scalars['String']>
  colors_primary_exists?: Maybe<Scalars['Boolean']>
  colors_secondary_exists?: Maybe<Scalars['Boolean']>
  colors_accent_exists?: Maybe<Scalars['Boolean']>
  colors_shading_exists?: Maybe<Scalars['Boolean']>
  typography_fonts_exists?: Maybe<Scalars['Boolean']>
  googleFontsApi_exists?: Maybe<Scalars['Boolean']>
  googleFontsApi?: Maybe<Scalars['String']>
  googleFontsApi_not?: Maybe<Scalars['String']>
  googleFontsApi_in?: Maybe<Array<Maybe<Scalars['String']>>>
  googleFontsApi_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  googleFontsApi_contains?: Maybe<Scalars['String']>
  googleFontsApi_not_contains?: Maybe<Scalars['String']>
  openPathToggle_exists?: Maybe<Scalars['Boolean']>
  openPathToggle?: Maybe<Scalars['Boolean']>
  openPathToggle_not?: Maybe<Scalars['Boolean']>
  paypalToggle_exists?: Maybe<Scalars['Boolean']>
  paypalToggle?: Maybe<Scalars['Boolean']>
  paypalToggle_not?: Maybe<Scalars['Boolean']>
  amazonPayToggle_exists?: Maybe<Scalars['Boolean']>
  amazonPayToggle?: Maybe<Scalars['Boolean']>
  amazonPayToggle_not?: Maybe<Scalars['Boolean']>
  affirmToggle_exists?: Maybe<Scalars['Boolean']>
  affirmToggle?: Maybe<Scalars['Boolean']>
  affirmToggle_not?: Maybe<Scalars['Boolean']>
  customerServicePhone_exists?: Maybe<Scalars['Boolean']>
  customerServicePhone?: Maybe<Scalars['String']>
  customerServicePhone_not?: Maybe<Scalars['String']>
  customerServicePhone_in?: Maybe<Array<Maybe<Scalars['String']>>>
  customerServicePhone_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  customerServicePhone_contains?: Maybe<Scalars['String']>
  customerServicePhone_not_contains?: Maybe<Scalars['String']>
  customerServiceEmail_exists?: Maybe<Scalars['Boolean']>
  customerServiceEmail?: Maybe<Scalars['String']>
  customerServiceEmail_not?: Maybe<Scalars['String']>
  customerServiceEmail_in?: Maybe<Array<Maybe<Scalars['String']>>>
  customerServiceEmail_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  customerServiceEmail_contains?: Maybe<Scalars['String']>
  customerServiceEmail_not_contains?: Maybe<Scalars['String']>
  storeLiteral_exists?: Maybe<Scalars['Boolean']>
  storeLiteral?: Maybe<Scalars['String']>
  storeLiteral_not?: Maybe<Scalars['String']>
  storeLiteral_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeLiteral_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeLiteral_contains?: Maybe<Scalars['String']>
  storeLiteral_not_contains?: Maybe<Scalars['String']>
  storeName_exists?: Maybe<Scalars['Boolean']>
  storeName?: Maybe<Scalars['String']>
  storeName_not?: Maybe<Scalars['String']>
  storeName_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeName_contains?: Maybe<Scalars['String']>
  storeName_not_contains?: Maybe<Scalars['String']>
  storeDescription_exists?: Maybe<Scalars['Boolean']>
  storeDescription?: Maybe<Scalars['String']>
  storeDescription_not?: Maybe<Scalars['String']>
  storeDescription_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeDescription_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeDescription_contains?: Maybe<Scalars['String']>
  storeDescription_not_contains?: Maybe<Scalars['String']>
  storeTelephone_exists?: Maybe<Scalars['Boolean']>
  storeTelephone?: Maybe<Scalars['String']>
  storeTelephone_not?: Maybe<Scalars['String']>
  storeTelephone_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeTelephone_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeTelephone_contains?: Maybe<Scalars['String']>
  storeTelephone_not_contains?: Maybe<Scalars['String']>
  storeStreetAddress_exists?: Maybe<Scalars['Boolean']>
  storeStreetAddress?: Maybe<Scalars['String']>
  storeStreetAddress_not?: Maybe<Scalars['String']>
  storeStreetAddress_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeStreetAddress_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeStreetAddress_contains?: Maybe<Scalars['String']>
  storeStreetAddress_not_contains?: Maybe<Scalars['String']>
  storeAddressLocality_exists?: Maybe<Scalars['Boolean']>
  storeAddressLocality?: Maybe<Scalars['String']>
  storeAddressLocality_not?: Maybe<Scalars['String']>
  storeAddressLocality_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeAddressLocality_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeAddressLocality_contains?: Maybe<Scalars['String']>
  storeAddressLocality_not_contains?: Maybe<Scalars['String']>
  storeAddressRegion_exists?: Maybe<Scalars['Boolean']>
  storeAddressRegion?: Maybe<Scalars['String']>
  storeAddressRegion_not?: Maybe<Scalars['String']>
  storeAddressRegion_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeAddressRegion_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeAddressRegion_contains?: Maybe<Scalars['String']>
  storeAddressRegion_not_contains?: Maybe<Scalars['String']>
  storePostalCode_exists?: Maybe<Scalars['Boolean']>
  storePostalCode?: Maybe<Scalars['String']>
  storePostalCode_not?: Maybe<Scalars['String']>
  storePostalCode_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storePostalCode_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storePostalCode_contains?: Maybe<Scalars['String']>
  storePostalCode_not_contains?: Maybe<Scalars['String']>
  storeCountry_exists?: Maybe<Scalars['Boolean']>
  storeCountry?: Maybe<Scalars['String']>
  storeCountry_not?: Maybe<Scalars['String']>
  storeCountry_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeCountry_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeCountry_contains?: Maybe<Scalars['String']>
  storeCountry_not_contains?: Maybe<Scalars['String']>
  storeLogo_exists?: Maybe<Scalars['Boolean']>
  storeLogo?: Maybe<Scalars['String']>
  storeLogo_not?: Maybe<Scalars['String']>
  storeLogo_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeLogo_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeLogo_contains?: Maybe<Scalars['String']>
  storeLogo_not_contains?: Maybe<Scalars['String']>
  storeOpenHours_exists?: Maybe<Scalars['Boolean']>
  storeOpenHours?: Maybe<Scalars['String']>
  storeOpenHours_not?: Maybe<Scalars['String']>
  storeOpenHours_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeOpenHours_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeOpenHours_contains?: Maybe<Scalars['String']>
  storeOpenHours_not_contains?: Maybe<Scalars['String']>
  storeCloseHours_exists?: Maybe<Scalars['Boolean']>
  storeCloseHours?: Maybe<Scalars['String']>
  storeCloseHours_not?: Maybe<Scalars['String']>
  storeCloseHours_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeCloseHours_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  storeCloseHours_contains?: Maybe<Scalars['String']>
  storeCloseHours_not_contains?: Maybe<Scalars['String']>
  organizationName_exists?: Maybe<Scalars['Boolean']>
  organizationName?: Maybe<Scalars['String']>
  organizationName_not?: Maybe<Scalars['String']>
  organizationName_in?: Maybe<Array<Maybe<Scalars['String']>>>
  organizationName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  organizationName_contains?: Maybe<Scalars['String']>
  organizationName_not_contains?: Maybe<Scalars['String']>
  favicon_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<ThemeFilter>>>
  AND?: Maybe<Array<Maybe<ThemeFilter>>>
}

export type ThemeLinkingCollections = {
  __typename?: 'ThemeLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
}

export type ThemeLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export enum ThemeOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SiteAsc = 'site_ASC',
  SiteDesc = 'site_DESC',
  OpenPathToggleAsc = 'openPathToggle_ASC',
  OpenPathToggleDesc = 'openPathToggle_DESC',
  PaypalToggleAsc = 'paypalToggle_ASC',
  PaypalToggleDesc = 'paypalToggle_DESC',
  AmazonPayToggleAsc = 'amazonPayToggle_ASC',
  AmazonPayToggleDesc = 'amazonPayToggle_DESC',
  AffirmToggleAsc = 'affirmToggle_ASC',
  AffirmToggleDesc = 'affirmToggle_DESC',
  CustomerServicePhoneAsc = 'customerServicePhone_ASC',
  CustomerServicePhoneDesc = 'customerServicePhone_DESC',
  CustomerServiceEmailAsc = 'customerServiceEmail_ASC',
  CustomerServiceEmailDesc = 'customerServiceEmail_DESC',
  StoreLiteralAsc = 'storeLiteral_ASC',
  StoreLiteralDesc = 'storeLiteral_DESC',
  StoreNameAsc = 'storeName_ASC',
  StoreNameDesc = 'storeName_DESC',
  StoreTelephoneAsc = 'storeTelephone_ASC',
  StoreTelephoneDesc = 'storeTelephone_DESC',
  StoreStreetAddressAsc = 'storeStreetAddress_ASC',
  StoreStreetAddressDesc = 'storeStreetAddress_DESC',
  StoreAddressLocalityAsc = 'storeAddressLocality_ASC',
  StoreAddressLocalityDesc = 'storeAddressLocality_DESC',
  StoreAddressRegionAsc = 'storeAddressRegion_ASC',
  StoreAddressRegionDesc = 'storeAddressRegion_DESC',
  StorePostalCodeAsc = 'storePostalCode_ASC',
  StorePostalCodeDesc = 'storePostalCode_DESC',
  StoreCountryAsc = 'storeCountry_ASC',
  StoreCountryDesc = 'storeCountry_DESC',
  StoreLogoAsc = 'storeLogo_ASC',
  StoreLogoDesc = 'storeLogo_DESC',
  StoreOpenHoursAsc = 'storeOpenHours_ASC',
  StoreOpenHoursDesc = 'storeOpenHours_DESC',
  StoreCloseHoursAsc = 'storeCloseHours_ASC',
  StoreCloseHoursDesc = 'storeCloseHours_DESC',
  OrganizationNameAsc = 'organizationName_ASC',
  OrganizationNameDesc = 'organizationName_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

/** Title and Link [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/titleAndLink) */
export type TitleAndLink = Entry & {
  __typename?: 'TitleAndLink'
  sys: Sys
  contentfulMetadata: ContentfulMetadata
  linkedFrom?: Maybe<TitleAndLinkLinkingCollections>
  name?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  titleLink?: Maybe<Cta>
  linksCollection?: Maybe<TitleAndLinkLinksCollection>
}

/** Title and Link [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/titleAndLink) */
export type TitleAndLinkLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Title and Link [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/titleAndLink) */
export type TitleAndLinkNameArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Title and Link [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/titleAndLink) */
export type TitleAndLinkTitleArgs = {
  locale?: Maybe<Scalars['String']>
}

/** Title and Link [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/titleAndLink) */
export type TitleAndLinkTitleLinkArgs = {
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

/** Title and Link [See type definition](https://app.contentful.com/spaces/c3b0txmpl4sb/content_types/titleAndLink) */
export type TitleAndLinkLinksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type TitleAndLinkCollection = {
  __typename?: 'TitleAndLinkCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<TitleAndLink>>
}

export type TitleAndLinkFilter = {
  titleLink?: Maybe<CfCtaNestedFilter>
  links?: Maybe<CfCtaNestedFilter>
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  titleLink_exists?: Maybe<Scalars['Boolean']>
  linksCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<TitleAndLinkFilter>>>
  AND?: Maybe<Array<Maybe<TitleAndLinkFilter>>>
}

export type TitleAndLinkLinkingCollections = {
  __typename?: 'TitleAndLinkLinkingCollections'
  entryCollection?: Maybe<EntryCollection>
  accordionCollection?: Maybe<AccordionCollection>
}

export type TitleAndLinkLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type TitleAndLinkLinkingCollectionsAccordionCollectionArgs = {
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  preview?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type TitleAndLinkLinksCollection = {
  __typename?: 'TitleAndLinkLinksCollection'
  total: Scalars['Int']
  skip: Scalars['Int']
  limit: Scalars['Int']
  items: Array<Maybe<Cta>>
}

export enum TitleAndLinkOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
}

export type CfAccordionNestedFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  itemsCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<CfAccordionNestedFilter>>>
  AND?: Maybe<Array<Maybe<CfAccordionNestedFilter>>>
}

export type CfCardNestedFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  image_exists?: Maybe<Scalars['Boolean']>
  cardLink_exists?: Maybe<Scalars['Boolean']>
  eyebrow_exists?: Maybe<Scalars['Boolean']>
  eyebrow?: Maybe<Scalars['String']>
  eyebrow_not?: Maybe<Scalars['String']>
  eyebrow_in?: Maybe<Array<Maybe<Scalars['String']>>>
  eyebrow_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  eyebrow_contains?: Maybe<Scalars['String']>
  eyebrow_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  description_exists?: Maybe<Scalars['Boolean']>
  description_contains?: Maybe<Scalars['String']>
  description_not_contains?: Maybe<Scalars['String']>
  variant_exists?: Maybe<Scalars['Boolean']>
  variant?: Maybe<Scalars['String']>
  variant_not?: Maybe<Scalars['String']>
  variant_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_contains?: Maybe<Scalars['String']>
  variant_not_contains?: Maybe<Scalars['String']>
  horizontalAlignment_exists?: Maybe<Scalars['Boolean']>
  horizontalAlignment?: Maybe<Scalars['String']>
  horizontalAlignment_not?: Maybe<Scalars['String']>
  horizontalAlignment_in?: Maybe<Array<Maybe<Scalars['String']>>>
  horizontalAlignment_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  horizontalAlignment_contains?: Maybe<Scalars['String']>
  horizontalAlignment_not_contains?: Maybe<Scalars['String']>
  verticalAlignment_exists?: Maybe<Scalars['Boolean']>
  verticalAlignment?: Maybe<Scalars['String']>
  verticalAlignment_not?: Maybe<Scalars['String']>
  verticalAlignment_in?: Maybe<Array<Maybe<Scalars['String']>>>
  verticalAlignment_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  verticalAlignment_contains?: Maybe<Scalars['String']>
  verticalAlignment_not_contains?: Maybe<Scalars['String']>
  theme_exists?: Maybe<Scalars['Boolean']>
  theme?: Maybe<Scalars['String']>
  theme_not?: Maybe<Scalars['String']>
  theme_in?: Maybe<Array<Maybe<Scalars['String']>>>
  theme_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  theme_contains?: Maybe<Scalars['String']>
  theme_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<CfCardNestedFilter>>>
  AND?: Maybe<Array<Maybe<CfCardNestedFilter>>>
}

export type CfCtaNestedFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  label_exists?: Maybe<Scalars['Boolean']>
  label?: Maybe<Scalars['String']>
  label_not?: Maybe<Scalars['String']>
  label_in?: Maybe<Array<Maybe<Scalars['String']>>>
  label_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  label_contains?: Maybe<Scalars['String']>
  label_not_contains?: Maybe<Scalars['String']>
  linkToEntry_exists?: Maybe<Scalars['Boolean']>
  url_exists?: Maybe<Scalars['Boolean']>
  url?: Maybe<Scalars['String']>
  url_not?: Maybe<Scalars['String']>
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  url_contains?: Maybe<Scalars['String']>
  url_not_contains?: Maybe<Scalars['String']>
  params_exists?: Maybe<Scalars['Boolean']>
  params?: Maybe<Scalars['String']>
  params_not?: Maybe<Scalars['String']>
  params_in?: Maybe<Array<Maybe<Scalars['String']>>>
  params_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  params_contains?: Maybe<Scalars['String']>
  params_not_contains?: Maybe<Scalars['String']>
  variant_exists?: Maybe<Scalars['Boolean']>
  variant?: Maybe<Scalars['String']>
  variant_not?: Maybe<Scalars['String']>
  variant_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_contains?: Maybe<Scalars['String']>
  variant_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<CfCtaNestedFilter>>>
  AND?: Maybe<Array<Maybe<CfCtaNestedFilter>>>
}

export type CfImageNestedFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  image_exists?: Maybe<Scalars['Boolean']>
  alt_exists?: Maybe<Scalars['Boolean']>
  alt?: Maybe<Scalars['String']>
  alt_not?: Maybe<Scalars['String']>
  alt_in?: Maybe<Array<Maybe<Scalars['String']>>>
  alt_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  alt_contains?: Maybe<Scalars['String']>
  alt_not_contains?: Maybe<Scalars['String']>
  objectFit_exists?: Maybe<Scalars['Boolean']>
  objectFit?: Maybe<Scalars['String']>
  objectFit_not?: Maybe<Scalars['String']>
  objectFit_in?: Maybe<Array<Maybe<Scalars['String']>>>
  objectFit_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  objectFit_contains?: Maybe<Scalars['String']>
  objectFit_not_contains?: Maybe<Scalars['String']>
  width_exists?: Maybe<Scalars['Boolean']>
  width?: Maybe<Scalars['Int']>
  width_not?: Maybe<Scalars['Int']>
  width_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  width_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  width_gt?: Maybe<Scalars['Int']>
  width_gte?: Maybe<Scalars['Int']>
  width_lt?: Maybe<Scalars['Int']>
  width_lte?: Maybe<Scalars['Int']>
  height_exists?: Maybe<Scalars['Boolean']>
  height?: Maybe<Scalars['Int']>
  height_not?: Maybe<Scalars['Int']>
  height_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  height_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  height_gt?: Maybe<Scalars['Int']>
  height_gte?: Maybe<Scalars['Int']>
  height_lt?: Maybe<Scalars['Int']>
  height_lte?: Maybe<Scalars['Int']>
  quality_exists?: Maybe<Scalars['Boolean']>
  quality?: Maybe<Scalars['Int']>
  quality_not?: Maybe<Scalars['Int']>
  quality_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  quality_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  quality_gt?: Maybe<Scalars['Int']>
  quality_gte?: Maybe<Scalars['Int']>
  quality_lt?: Maybe<Scalars['Int']>
  quality_lte?: Maybe<Scalars['Int']>
  format_exists?: Maybe<Scalars['Boolean']>
  format?: Maybe<Scalars['String']>
  format_not?: Maybe<Scalars['String']>
  format_in?: Maybe<Array<Maybe<Scalars['String']>>>
  format_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  format_contains?: Maybe<Scalars['String']>
  format_not_contains?: Maybe<Scalars['String']>
  fit_exists?: Maybe<Scalars['Boolean']>
  fit?: Maybe<Scalars['String']>
  fit_not?: Maybe<Scalars['String']>
  fit_in?: Maybe<Array<Maybe<Scalars['String']>>>
  fit_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  fit_contains?: Maybe<Scalars['String']>
  fit_not_contains?: Maybe<Scalars['String']>
  focusArea_exists?: Maybe<Scalars['Boolean']>
  focusArea?: Maybe<Scalars['String']>
  focusArea_not?: Maybe<Scalars['String']>
  focusArea_in?: Maybe<Array<Maybe<Scalars['String']>>>
  focusArea_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  focusArea_contains?: Maybe<Scalars['String']>
  focusArea_not_contains?: Maybe<Scalars['String']>
  radius_exists?: Maybe<Scalars['Boolean']>
  radius?: Maybe<Scalars['Int']>
  radius_not?: Maybe<Scalars['Int']>
  radius_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  radius_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>
  radius_gt?: Maybe<Scalars['Int']>
  radius_gte?: Maybe<Scalars['Int']>
  radius_lt?: Maybe<Scalars['Int']>
  radius_lte?: Maybe<Scalars['Int']>
  progressive_exists?: Maybe<Scalars['Boolean']>
  progressive?: Maybe<Scalars['Boolean']>
  progressive_not?: Maybe<Scalars['Boolean']>
  png8_exists?: Maybe<Scalars['Boolean']>
  png8?: Maybe<Scalars['Boolean']>
  png8_not?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<CfImageNestedFilter>>>
  AND?: Maybe<Array<Maybe<CfImageNestedFilter>>>
}

export type CfMegaMenuItemNestedFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  variant_exists?: Maybe<Scalars['Boolean']>
  variant?: Maybe<Scalars['String']>
  variant_not?: Maybe<Scalars['String']>
  variant_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  variant_contains?: Maybe<Scalars['String']>
  variant_not_contains?: Maybe<Scalars['String']>
  link_exists?: Maybe<Scalars['Boolean']>
  description_exists?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
  description_not?: Maybe<Scalars['String']>
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  description_contains?: Maybe<Scalars['String']>
  description_not_contains?: Maybe<Scalars['String']>
  imagesCollection_exists?: Maybe<Scalars['Boolean']>
  childrenCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<CfMegaMenuItemNestedFilter>>>
  AND?: Maybe<Array<Maybe<CfMegaMenuItemNestedFilter>>>
}

export type CfMegaMenuNestedFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  site_exists?: Maybe<Scalars['Boolean']>
  site?: Maybe<Scalars['String']>
  site_not?: Maybe<Scalars['String']>
  site_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  site_contains?: Maybe<Scalars['String']>
  site_not_contains?: Maybe<Scalars['String']>
  itemsCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<CfMegaMenuNestedFilter>>>
  AND?: Maybe<Array<Maybe<CfMegaMenuNestedFilter>>>
}

export type CfMetaTagsNestedFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  identifier_exists?: Maybe<Scalars['Boolean']>
  identifier?: Maybe<Scalars['String']>
  identifier_not?: Maybe<Scalars['String']>
  identifier_in?: Maybe<Array<Maybe<Scalars['String']>>>
  identifier_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  identifier_contains?: Maybe<Scalars['String']>
  identifier_not_contains?: Maybe<Scalars['String']>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  content_exists?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  content_not?: Maybe<Scalars['String']>
  content_in?: Maybe<Array<Maybe<Scalars['String']>>>
  content_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  content_contains?: Maybe<Scalars['String']>
  content_not_contains?: Maybe<Scalars['String']>
  OR?: Maybe<Array<Maybe<CfMetaTagsNestedFilter>>>
  AND?: Maybe<Array<Maybe<CfMetaTagsNestedFilter>>>
}

export type CfSeoNestedFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  description_exists?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
  description_not?: Maybe<Scalars['String']>
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  description_contains?: Maybe<Scalars['String']>
  description_not_contains?: Maybe<Scalars['String']>
  keywords_exists?: Maybe<Scalars['Boolean']>
  keywords_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>
  keywords_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>
  keywords_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>
  no_index_exists?: Maybe<Scalars['Boolean']>
  no_index?: Maybe<Scalars['Boolean']>
  no_index_not?: Maybe<Scalars['Boolean']>
  no_follow_exists?: Maybe<Scalars['Boolean']>
  no_follow?: Maybe<Scalars['Boolean']>
  no_follow_not?: Maybe<Scalars['Boolean']>
  metaTagsCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<CfSeoNestedFilter>>>
  AND?: Maybe<Array<Maybe<CfSeoNestedFilter>>>
}

export type CfTitleAndLinkNestedFilter = {
  sys?: Maybe<SysFilter>
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>
  name_exists?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  title_exists?: Maybe<Scalars['Boolean']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  titleLink_exists?: Maybe<Scalars['Boolean']>
  linksCollection_exists?: Maybe<Scalars['Boolean']>
  OR?: Maybe<Array<Maybe<CfTitleAndLinkNestedFilter>>>
  AND?: Maybe<Array<Maybe<CfTitleAndLinkNestedFilter>>>
}

export type CtaFragment = { __typename?: 'Cta' } & Pick<
  Cta,
  'name' | 'label' | 'url' | 'params' | 'variant'
> & {
    sys: { __typename?: 'Sys' } & Pick<Sys, 'id'>
    linkToEntry?: Maybe<
      | ({ __typename: 'GenericPage' } & Pick<GenericPage, 'slug'>)
      | ({ __typename: 'GenericPageWithMenu' } & Pick<
          GenericPageWithMenu,
          'slug'
        >)
      | { __typename: 'Plp' }
    >
  }

export type MegaMenuItemFragment = { __typename?: 'MegaMenuItem' } & Pick<
  MegaMenuItem,
  'name' | 'variant' | 'description'
> & {
    sys: { __typename?: 'Sys' } & Pick<Sys, 'id'>
    link?: Maybe<{ __typename?: 'Cta' } & CtaFragment>
    imagesCollection?: Maybe<
      { __typename?: 'AssetCollection' } & {
        items: Array<
          Maybe<
            { __typename?: 'Asset' } & Pick<
              Asset,
              'title' | 'description' | 'url'
            >
          >
        >
      }
    >
  }

export type GetMegaMenuQueryVariables = Exact<{
  locale?: Maybe<Scalars['String']>
  site?: Maybe<Scalars['String']>
}>

export type GetMegaMenuQuery = { __typename?: 'Query' } & {
  megaMenuCollection?: Maybe<
    { __typename?: 'MegaMenuCollection' } & {
      items: Array<
        Maybe<
          { __typename?: 'MegaMenu' } & Pick<MegaMenu, 'name' | 'site'> & {
              itemsCollection?: Maybe<
                { __typename?: 'MegaMenuItemsCollection' } & {
                  items: Array<
                    Maybe<
                      { __typename?: 'MegaMenuItem' } & MegaMenuItemFragment
                    >
                  >
                }
              >
            }
        >
      >
    }
  >
}

export type GetMegaMenuItemQueryVariables = Exact<{
  id: Scalars['String']
  locale?: Maybe<Scalars['String']>
}>

export type GetMegaMenuItemQuery = { __typename?: 'Query' } & {
  megaMenuItem?: Maybe<
    { __typename?: 'MegaMenuItem' } & {
      childrenCollection?: Maybe<
        { __typename?: 'MegaMenuItemChildrenCollection' } & {
          items: Array<
            Maybe<{ __typename?: 'MegaMenuItem' } & MegaMenuItemFragment>
          >
        }
      >
    } & MegaMenuItemFragment
  >
}
