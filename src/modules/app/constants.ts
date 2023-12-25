import { removeTrailingSlash } from '../app/utils/removeTrailingSlash.js'
import settings from './siteSettings.json'

export const CYMAX_ACCESSIBILITY_STATEMENT_URL =
  'https://www.cymax.com/accessibility-statement'
export const HOMESQUARE_ACCESSIBILITY_STATEMENT_URL =
  'https://www.homesquare.com/accessibility-statement'

export const FLAT_SHIPPING_KEY =
  process.env.NEXT_PUBLIC_FLAT_SHIPPING_KEY || 'flat-shipping-cost'

export const ELASTIC_PATH_CLIENT_ID =
  process.env.NEXT_PUBLIC_ELASTIC_PATH_CLIENT_ID ?? ''
export const ELASTIC_PATH_HOST = process.env.NEXT_PUBLIC_ELASTIC_PATH_HOST ?? ''
export const IMAGE_PLACEHOLDER = '/img/image-placeholder.svg'
export const ELASTIC_PATH_HEADERS_DEFAULT = {
  'EP-Channel': process.env.NEXT_PUBLIC_ELASTIC_PATH_CHANNEL || '',
} as const
export const ELASTIC_PATH_HEADERS_LOGGED_IN = {
  'EP-Channel': process.env.NEXT_PUBLIC_ELASTIC_PATH_CHANNEL || '',
} as const
export const GOOGLE_TAG_MANAGER_ID =
  process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
  export const ELASTIC_PATH_DEFAULT_CATALOG_ID =
  process.env.ELASTIC_PATH_DEFAULT_CATALOG_ID
export const NEXT_PUBLIC_SOCIAL_YOUTUBE_URL =
  process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL
export const NEXT_PUBLIC_SOCIAL_HOUZZ_URL =
  process.env.NEXT_PUBLIC_SOCIAL_HOUZZ_URL
export const NEXT_PUBLIC_SOCIAL_FACEBOOK_URL =
  process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL
export const NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL
export const NEXT_PUBLIC_SOCIAL_TWITTER_URL =
  process.env.NEXT_PUBLIC_SOCIAL_TWITTER_URL
export const NEXT_PUBLIC_SOCIAL_PINTEREST_URL =
  process.env.NEXT_PUBLIC_SOCIAL_PINTEREST_URL
export const DEFAULT_SITE = 'cymax'
export const NEXT_PUBLIC_SITE_IDENTIFIER =
  process.env.NEXT_PUBLIC_SITE_IDENTIFIER ?? ''
export const NEXT_PUBLIC_PAYMENT_TOGGLE_OPENPATH =
  settings?.openPathToggle ?? false
export const NEXT_PUBLIC_PAYMENT_TOGGLE_PAYPAL = settings?.paypalToggle ?? false
export const NEXT_PUBLIC_PAYMENT_TOGGLE_AMAZONPAY =
  settings?.amazonPayToggle ?? false
export const NEXT_PUBLIC_PAYMENT_TOGGLE_AFFIRM = settings?.affirmToggle ?? false
export const NEXT_PUBLIC_RELATED_PRODUCTS_CAROUSEL = settings?.componentController?.MoreFromBrandcarousel ?? false
export const NEXT_PUBLIC_CUSTOMER_SERVICE_PHONE =
  settings?.customerServicePhone ?? ''
export const NEXT_PUBLIC_CUSTOMER_SERVICE_EMAIL =
  settings?.customerServiceEmail ?? ''
export const EP_CUSTOM_ITEM_KEY = 'custom_item'
export const EP_CART_ITEM_KEY = 'cart_item'
export const EP_ORDER_ITEM_KEY = 'order_item'
export const NEXT_PUBLIC_BAZAARVOICE_URL =
  process.env.NEXT_PUBLIC_BAZAARVOICE_URL
export const CAROUSEL_PRODUCT_LIMIT = 8
export const NEXT_PUBLIC_AMAZON_MERCHANT_ID =
  process.env.NEXT_PUBLIC_AMAZON_MERCHANT_ID ?? ''
export const NEXT_PUBLIC_AMAZON_PAY_PUBLIC_KEY_ID =
  process.env.NEXT_PUBLIC_AMAZON_PAY_PUBLIC_KEY_ID ?? ''
export const NEXT_PUBLIC_OPENPATH_API_ID =
  process.env.NEXT_PUBLIC_OPENPATH_API_ID
export const NEXT_PUBLIC_EP_MIDDLEWARE_URL =
  process.env.NEXT_PUBLIC_EP_MIDDLEWARE_URL ?? ''
export const KLAVIYO_NEWSLETTER_LIST_ID =
  process.env.NEXT_PUBLIC_KLAVIYO_NEWSLETTER_LIST_ID ?? ''
export const KLAVIYO_PRIVACY_INFORMATION_LIST_ID =
  process.env.NEXT_PUBLIC_KLAVIYO_PRIVACY_INFORMATION_LIST_ID ?? ''
export const KLAVIYO_CONTACT_US_LIST_ID =
  process.env.NEXT_PUBLIC_KLAVIYO_CONTACT_US_LIST_ID ?? ''
export const KLAVIYO_BACK_IN_STOCK_LIST_ID =
  process.env.NEXT_PUBLIC_KLAVIYO_BACK_IN_STOCK_LIST_ID ?? ''
export const KLAVIYO_BUSINESS_PROGRAM_LIST_ID =
  process.env.NEXT_PUBLIC_KLAVIYO_BUSINESS_PROGRAM_LIST_ID ?? ''

// SEO
export const NEXT_PUBLIC_STORE_NAME = settings?.storeName ?? ''
export const NEXT_PUBLIC_STORE_LITERAL = settings?.storeLiteral ?? ''
export const NEXT_PUBLIC_STORE_DESCRIPTION = settings?.storeDescription ?? ''
export const NEXT_PUBLIC_STORE_TELEPHONE = settings?.storeTelephone ?? ''
export const NEXT_PUBLIC_STORE_STREET_ADDRESS =
  settings?.storeStreetAddress ?? ''
export const NEXT_PUBLIC_STORE_ADDRESS_LOCALITY =
  settings?.storeAddressLocality ?? ''
export const NEXT_PUBLIC_STORE_ADDRESS_REGION =
  settings?.storeAddressRegion ?? ''
export const NEXT_PUBLIC_STORE_POSTAL_CODE = settings?.storePostalCode ?? ''
export const NEXT_PUBLIC_STORE_COUNTRY = settings?.storeCountry ?? ''
export const NEXT_PUBLIC_STORE_LOGO = settings?.storeLogo ?? ''
export const NEXT_PUBLIC_STORE_OPEN_HOURS = settings?.storeOpenHours ?? ''
export const NEXT_PUBLIC_STORE_CLOSE_HOURS = settings?.storeCloseHours ?? ''
export const NEXT_PUBLIC_ORGANIZATION_NAME = settings?.organizationName ?? ''
export const KEY_AMAZON_ORDER_ID = 'amazonPay.epcc.order.id'
export const NEXT_PUBLIC_FAVICON = settings?.favicon
export const NEXT_PUBLIC_FF_EXPRESS_CHECKOUT_TOGGLE =
  process.env.NEXT_PUBLIC_FF_EXPRESS_CHECKOUT_TOGGLE === 'true' ?? false
export const PASSWORD_PROFILE_ID =
  process.env.NEXT_PUBLIC_PASSWORD_PROFILE_ID ?? ''
export const OIDC_PROVIDER_NAME =
  process.env.NEXT_PUBLIC_OIDC_PROVIDER_NAME ?? ''
export const OIDC_PROVIDER_CLIENT_ID =
  process.env.NEXT_PUBLIC_OIDC_PROVIDER_CLIENT_ID ?? ''

// DATADOG

export const DATADOG_APPLICATION_ID =
  process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID ?? ''
export const DATADOG_CLIENT_TOKEN =
  process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? ''
export const DATADOG_SITE = process.env.NEXT_PUBLIC_DATADOG_SITE ?? ''
export const DATADOG_SERVICE = process.env.NEXT_PUBLIC_DATADOG_SERVICE ?? ''
export const DATADOG_SAMPLE_RATE = parseInt(
  process.env.NEXT_PUBLIC_DATADOG_SAMPLE_RATE ?? '0'
)
export const DATADOG_REPLAY = parseInt(
  process.env.NEXT_PUBLIC_DATADOG_REPLAY ?? '0'
)
export const DATADOG_TRACK_FRUSTATION =
  process.env.NEXT_PUBLIC_DATADOG_TRACK_FRUSTATION === 'true' ? true : false
export const APP_DOMAIN_BASE_URL =
  removeTrailingSlash(process.env.APP_DOMAIN) || 'https://www.cymax.com'

//HOMESQUARE FLAT SHIPPING
//If at some point EP modifies the fee and minimum, this will need to be updated as well
//Equivalent $10.00
export const HOMESQUARE_FLAT_SHIPPING_CENTS = parseInt(
  process.env.NEXT_PUBLIC_HOMESQUARE_FLAT_SHIPPING_CENTS ?? '1000'
)
//Equivalent $300.00
export const HOMESQUARE_FLAT_SHIPPING_MINIMUM_CENTS = parseInt(
  process.env.NEXT_PUBLIC_HOMESQUARE_FLAT_SHIPPING_MINIMUM_CENTS ?? '30000'
)

export const RETRIES_ON_SAVE_PAYMENT_STATUS =
  process.env.NEXT_PLUBLIC_RETRIES_ON_SAVE_PAYMENT_STATUS ?? '3'

// Sitemap
export const SITEMAP_CACHE_MAX_AGE = parseInt(
  process.env.SITEMAP_CACHE_MAX_AGE ?? '518,400'
) // 6 Days
export const SITEMAP_CACHE_STALE_WHILE_REVALIDATE = parseInt(
  process.env.SITEMAP_CACHE_STALE_WHILE_REVALIDATE ?? '28800'
) // 8 hours
export const SITEMAP_EXPIRATION_DAYS = parseInt(
  process.env.SITEMAP_EXPIRATION_DAYS ?? '7'
)
export const XML_MAX_RECORDS = parseInt(
  process.env.NEXT_PUBLIC_XML_MAX_RECORDS ?? '1000'
)
export const XML_MAX_PAGES_PER_FILE = parseInt(
  process.env.NEXT_PUBLIC_XML_MAX_PAGES_PER_FILE ?? '20'
)

// CONTENTFUL
export const CONTENTFUL_MANAGEMENT_ACCESS_TOKEN =
  process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
export const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
export const CONTENTFUL_ENVIRONMENT =
  process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT

// Better Business Bureau
export const BBB_URL = process.env.NEXT_PUBLIC_BBB_URL

// Affirm
export const AFFIRM_API_BASE_URL = process.env.NEXT_PUBLIC_AFFIRM_API_BASE_URL
export const AFFIRM_SNIPPET_URL = process.env.NEXT_PUBLIC_AFFIRM_SNIPPET_URL
export const NEXT_PUBLIC_AFFIRM_PUBLIC_KEY_ID =
  process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY_ID ?? ''

// Houzz Icon Url
export const HOUZZ_URL = process.env.NEXT_PUBLIC_HOUZZ_URL
