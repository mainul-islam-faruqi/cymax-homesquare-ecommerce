import { AxiosError, AxiosInstance } from 'axios'
import { EpProductCartCustomInputs } from '../cart'

export enum FIELD_TYPE {
  string,
  integer,
  boolean,
  float,
  date,
  relationship,
}

export enum FIELD_VALIDATION {
  oneToOne,
  oneToMany,
}

export interface EpServiceDeps<T extends {} = {}> {
  httpClient: AxiosInstance
  headers?: Record<string, string>
  accessToken: string
  customerToken?: string
  params?: T
}

export interface EpPageableService {
  params: {
    'page[offset]'?: number
    'page[limit]'?: number
  }
}

export interface EpAccessTokenInterface<Identifier extends TokenIdentifier> {
  access_token: string
  expires: number
  expires_in: number
  identifier: Identifier
  token_type: 'Bearer'
}

export type TokenIdentifier = ImplicitToken | ClientCredentialsToken
export type ImplicitToken = 'implicit'
export type ClientCredentialsToken = 'client_credentials'

export interface EpCurrencyPriceInterface {
  amount: number
  currency?: string
  includes_tax: boolean
}

export interface EpDisplayPriceValue {
  amount: number
  currency: string
  formatted: string
}

export interface EpDisplayPrice {
  without_tax: EpDisplayPriceValue
  with_tax?: EpDisplayPriceValue
}

export type EpPriceMap = Record<string, EpCurrencyPriceInterface>

export interface EPTierPriceData {
  min_quantity: number
  display_price: EpDisplayPrice
  save_percent: number
}

export interface EpProductLocales {
  en?: EpProductLocaleAttributes
  fr?: EpProductLocaleAttributes
}

export interface EpProductLocaleAttributes {
  name: string
  description?: string
}

export interface EpProductAttributes {
  base_product: false
  commodity_type: 'physical'
  created_at: string
  description: string
  manage_stock: boolean
  manufacturer_part_num?: string
  name: string
  price?: EpPriceMap
  sku: string
  slug: string
  status: 'live' | 'draft'
  tiers?: {
    [key: string]: {
      minimum_quantity: number
      price: EpPriceMap
    }
  }
  extensions?: {
    [key: string]: EpFlowFieldsInterface
  }
  updated_at: string
  published_at: string
  locales?: EpProductLocales
}

export interface EpProductInterface {
  id: string
  type: 'product'
  attributes: EpProductAttributes
  meta: {
    catalog_id: string
    catalog_source: 'pim' | string
    display_price?: EpDisplayPrice
    original_display_price?: EpDisplayPrice
    original_price?: {
      [key: string]: {
        amount: number
        includes_tax: boolean
      }
    }
    pricebook_id: string
    tiers?: {
      [key: string]: {
        display_price?: EpDisplayPrice
      }
    }
    bread_crumbs?: Record<string, string[]>
  }
  relationships: {
    files: {
      data: Array<{
        created_at: string
        id: string
        type: 'file' | string
      }>
    }
    main_image: {
      data: {
        id: string
        type: 'main_image' | string
      }
    }
  }
}

export interface EpCollectionResponse<Data> {
  data: Data
  links: {
    first: string
    last: string
    self: string
  }
  meta: {
    page: {
      current: number
      limit: number
      total: number
    }
    results: {
      total: number
    }
  }
}

export interface EpCreateResponse<Data> {
  data: Data
}

export interface EpFileInterface {
  type: 'file'
  id: string
  link: {
    href: string
  }
  file_name: string
  mime_type: string
  file_size: number
  public: false
  meta: {
    dimensions: { width: number; height: number }
    timestamps: { created_at: string }
  }
  links: {
    self: string
  }
}

export interface EpCreateCartResponse {
  data: {
    id: string
    name: string
    description: string
    type: 'cart'
    links: {
      self: string
    }
    meta: {
      display_price: {
        with_tax: EpDisplayPriceValue
        without_tax: EpDisplayPriceValue
        tax: EpDisplayPriceValue
        discount: EpDisplayPriceValue
      }
      timestamps: {
        created_at: string
        updated_at: string
        expires_at: string
      }
    }
    relationships: {
      items: {
        data: null
      }
    }
  }
}

export interface EpCartItemInterface {
  custom_inputs?: EpProductCartCustomInputs
  id: string
  type: 'cart_item' | 'promotion_item'
  product_id: string
  promotion_id?: string
  name: string
  description: string
  sku: string
  slug: string
  image: {
    mime_type: string
    file_name: string
    href: string
  }
  quantity: number
  manage_stock: boolean
  unit_price: {
    amount: number
    currency: string
    includes_tax: boolean
  }
  value: {
    amount: number
    currency: string
    includes_tax: boolean
  }
  links: {
    product: string
  }
  meta: {
    display_price: {
      with_tax: {
        unit: EpDisplayPriceValue
        value: EpDisplayPriceValue
      }
      without_tax: {
        unit: EpDisplayPriceValue
        value: EpDisplayPriceValue
      }
      tax: {
        unit: EpDisplayPriceValue
        value: EpDisplayPriceValue
      }
      discount: {
        unit: EpDisplayPriceValue
        value: EpDisplayPriceValue
      }
      discounts?: {
        [key: string]: {
          amount: number
          currency: string
          includes_tax: string
        }
      }
    }
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
}
export interface EpCustomerToken {
  type: 'token'
  id: string
  customer_id: string
  token: string
  expires: number
}

export interface EpCustomerInterface {
  type: 'customer'
  id: string
  name: string
  email: string
  password: boolean
  primaryAddress?: string
  resetToken?: string
  authentication_mechanism?: string
}

export interface EpFlowEntryInterface {
  slug: string
  entryId: string
  field?: string
  isFlow?: boolean
}

export interface EpFieldInterface {
  type: string
  id: string
}

export interface EpAddressInterface {
  type: 'address'
  first_name: string
  last_name: string
  name?: string
  phone_number?: string
  instructions?: string
  company_name?: string
  line_1: string
  line_2?: string
  city?: string
  county: string
  postcode: string
  country: string
}

export enum EpFilterOperator {
  EQ = 'eq',
  LIKE = 'like',
  IN = 'in',
}

export enum EpFilterAttribute {
  SKU = 'sku',
  SLUG = 'slug',
  UPD_EAN = 'epd_ean',
  MPN = 'manufacturer_part_num',
  NAME = 'name',
  DESCRIPTION = 'description',
}

export interface EpAddressResponse extends EpAddressInterface {
  id: string
  links: {
    self: string
  }
  meta: {
    timestamps: {
      createdAt: string
      updatedAt: string
    }
  }
}

export type EpCheckoutParams = EpCartCheckoutInputInterface &
  Partial<Pick<EpCartCheckoutInputInterface, 'customer'>> & {
    flow: EpFlowFieldsInterface
  }

export interface EpCartCheckoutInputInterface {
  cartId: string
  customer: {
    id?: string
    email: string
    name: string
  }
  billing_address: Omit<
    EpAddressInterface,
    'type' | 'name' | 'phone_number' | 'instructions'
  >
  shipping_address: Omit<EpAddressInterface, 'type' | 'name'>
}

export interface EpCartCheckoutOutputInterface {
  data: EpOrderInterfaceWithFlow
  included: {
    items: EpOrderItemInterface[]
  }
}

type EpOrderStatusType = 'incomplete'
type EpOrderPaymentType = 'unpaid'
type EpOrderShippingType = 'unfulfilled'

export interface EpFlowInterface {
  id: string
  type: 'flow'
  name: string
  slug: string
  description: string
  enabled: boolean
}

export interface EpFieldInterface {
  id: string
  type: string
  field_type: string
  slug: string
  name: string
  description: string
  required: boolean
  default: any
  enabled: boolean
  order: number
  omit_null: boolean
  validation_rules: any[]
}

export type EpFlowFieldValue = string | number | boolean
export type EpFlowFieldsInterface = Record<string, EpFlowFieldValue>

export type EpOrderInterfaceWithFlow = EpOrderInterface & EpFlowFieldsInterface
export interface EpOrderInterface {
  type: 'order'
  id: string
  status: EpOrderStatusType
  payment: EpOrderPaymentType
  shipping: EpOrderShippingType
  anonymized: boolean
  customer: {
    name: string
    email: string
    id?: string
  }
  shipping_address: {
    first_name: string
    last_name: string
    phone_number: string
    company_name: string
    line_1: string
    line_2: string
    city: string
    postcode: string
    county: string
    country: string
    instructions: string
  }
  billing_address: {
    first_name: string
    last_name: string
    company_name: string
    line_1: string
    line_2: string
    city: string
    postcode: string
    county: string
    country: string
  }
  links: {}
  meta: {
    display_price: {
      with_tax: EpDisplayPriceValue
      without_tax: EpDisplayPriceValue
      tax: EpDisplayPriceValue
      discount: EpDisplayPriceValue
    }
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
  relationships: {
    items: {
      data: Array<{
        type: 'item'
        id: string
      }>
    }
  }
  items?: EpOrderItemInterface[]
  forter_response?:string;
}

export interface EpOrderItemInterface {
  type: 'order_item'
  id: string
  quantity: number
  product_id: string
  name: string
  sku: string
  unit_price: EpCurrencyPriceInterface
  value: EpCurrencyPriceInterface
  links: {}
  custom_inputs?: EpProductCartCustomInputs
  meta: {
    display_price: {
      with_tax: {
        unit: EpDisplayPriceValue
        value: EpDisplayPriceValue
      }
      without_tax: {
        unit: EpDisplayPriceValue
        value: EpDisplayPriceValue
      }
      tax: {
        unit: EpDisplayPriceValue
        value: EpDisplayPriceValue
      }
      discount: {
        unit: EpDisplayPriceValue
        value: EpDisplayPriceValue
      }
    }
    timestamps: {
      created_at: string
      updated_at: string
    }
  }
  relationships: {
    cart_item: {
      data: {
        type: 'cart_item'
        id: string
      }
    }
  }
  catalog_id: string
  catalog_source: string
}

export interface EpPaymentResponse {
  data: {
    id: string
    type: 'transaction'
    reference: string
    gateway: string
    amount: number
    refunded_amount: number
    currency: string
    transaction_type: string
    status: 'complete'
    relationships: {
      order: {
        data: {
          type: 'order'
          id: string
        }
      }
    }
    meta: {
      display_price: EpDisplayPriceValue
      display_refunded_amount: {
        total: EpDisplayPriceValue
      }
      timestamps: {
        created_at: string
        updated_at: string
      }
    }
  }
}

export interface EpErrorResponse {
  errors: EpError[]
}

export interface EpError {
  status: number
  title: string
  detail: string
  meta?: {
    id?: string
  }
}

export type EpAxiosError = AxiosError<EpErrorResponse, EpErrorResponse>

export interface EpPricebookInterface {
  id: string
  type: string
  attributes: {
    created_at: string
    description: string
    name: string
    updated_at: string
  }
}

export interface EpPriceInterface {
  data: {
    id: string
    attributes: {
      currencies: EpPriceMap
      sku: string
    }
    type: 'product-price'
  }
}

export interface EpHierarchyInterface {
  type: 'hierarchy'
  id: string
  attributes: {
    description: string
    name: string
    slug: string
  }
}

export interface EpNodeInterface {
  type: 'node'
  id: string
  attributes: {
    description: string
    name: string
    slug: string
  }
}

export interface EpCatalogInterface {
  type: 'catalog'
  id: string
  attributes: {
    pricebook_ids: Record<string, any>[]
    created_at: string
    description: string
    hierarchy_ids: string[]
    name: string
    updated_at: string
  }
}

export interface EpCatalogReleaseInterface {
  type: 'catalog-release'
  id: string
  attributes: {
    hierarchies: Record<string, string>[]
    catalog_id: string
    description: string
    name: string
    published_at: string
  }
}

export interface EpObservableEventInterface {
  id: string
  triggered_by: string
  integration: {
    id: string
    integration_type: 'webhook' | string
    name: string
    description: string
  }
  payload: {
    id: string
    type: string
  }
  configuration: {
    url: string
    secret_key: string
  }
}

export type EpCatalogObservableEventInterface = EpObservableEventInterface & {
  triggered_by:
    | 'catalog-release.created'
    | 'catalog-release.updated'
    | 'catalog-release.deleted'
  payload: {
    type: 'catalog-release'
    attributes?: {
      catalog_id: string
      description: string
      hierarchies: Record<string, string>[]
      locales: any
      name: string
      pricebook_id: string
      slug: string
    }
    meta?: {
      created_at: string
      published_at: string
      started_at: string
      release_status?: EpCatalogReleaseStatus
    }
  }
}

export type EpCatalogReleaseStatus = 'PUBLISHED' | 'IN_PROGRESS'

export interface EpCartInterface {
  isLoading: boolean
  isEmpty: boolean
  quantity: number
  data?: EpCartItemInterface[]
  meta?: {
    display_price: {
      with_tax: EpDisplayPriceValue
      without_tax: EpDisplayPriceValue
      tax: EpDisplayPriceValue
      discount: EpDisplayPriceValue
    }
    timestamps: {
      created_at: string
      updated_at: string
      expires_at: string
    }
  }
}
