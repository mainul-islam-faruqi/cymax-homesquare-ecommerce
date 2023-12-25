# Environment variables map

| **Name**                                        | **System**                      | **Description**                                                                                               |
| ----------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| NEXT_PUBLIC_ELASTIC_PATH_HOST                   | **Elastic Path Commerce Cloud** | Base URL for EPCC calls                                                                                       |
| NEXT_PUBLIC_ELASTIC_PATH_CHANNEL                |                                 | Channel tag to be sent in EP calls                                                                            |
| NEXT_PUBLIC_ELASTIC_PATH_STORE_ID               |                                 | Used to get EPCC token                                                                                        |
| NEXT_PUBLIC_ELASTIC_PATH_CLIENT_ID              |                                 | Used to get EPCC token                                                                                        |
| ELASTIC_PATH_CLIENT_SECRET                      |                                 | Used to get EPCC client_token                                                                                 |
| NEXT_PUBLIC_EP_MIDDLEWARE_URL                   | Elastic Path Middleware         | Base URL for EP Middleware calls                                                                              |
| NEXT_PUBLIC_PASSWORD_PROFILE_ID                 | **CSA Login**                   | Account membership pwd profile ID used for CSA login                                                          |
| NEXT_PUBLIC_OIDC_PROVIDER_NAME                  | **OIDC**                        | OIDC provider name from EP config                                                                             |
| NEXT_PUBLIC_OIDC_PROVIDER_CLIENT_ID             |                                 | OIDC provider client ID                                                                                       |
| NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN             | **Contentful**                  | Token to get read-only access                                                                                 |
| NEXT_PUBLIC_CONTENTFUL_SPACE_ID                 |                                 | ID for client’s space                                                                                         |
| NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT              |                                 | Contentful environment id                                                                                     |
| NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN     |                                 | Token to get read-only access to draft entries                                                                |
| NEXT_PUBLIC_SITE_IDENTIFIER                     |                                 | Site id for filtering entries                                                                                 |
| CONTENTFUL_PREVIEW_SECRET                       |                                 | Password to enable preview mode                                                                               |
| CONTENTFUL_MANAGEMENT_ACCESS_TOKEN              |                                 | Token to get write access. (Used by sitemap generation)                                                       |
| CONTENTFUL_MIGRATIONS_DIR                       |                                 | Folder containing the migrations. (Used only locally for migrations)                                          |
| NEXT_PUBLIC_SOCIAL_YOUTUBE_URL                  | **Social Links**                | URL for the links in the footer                                                                               |
| NEXT_PUBLIC_SOCIAL_FACEBOOK_URL                 |
| NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL                |
| NEXT_PUBLIC_SOCIAL_TWITTER_URL                  |
| NEXT_PUBLIC_SOCIAL_PINTEREST_URL                |
| REVALIDATE_DEFAULT                              | **Composable**                  | How many seconds before a static page should be re-built                                                      |
| APP_DOMAIN                                      |                                 | Vercel deployment URL for internal linking                                                                    |
| NEXT_PUBLIC_FF_EXPRESS_CHECKOUT_TOGGLE          |                                 | Feature Flag to enable express checkout buttons                                                               |
| NEXT_PUBLIC_PROTOCOL                            |                                 | Protocol to use when generating internal Urls                                                                 |
| NEXT_PUBLIC_ALGOLIA_APP_ID                      | **Algolia**                     | Application id                                                                                                |
| NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY              |                                 | Key to get read-only access                                                                                   |
| NEXT_PUBLIC_ALGOLIA_BASE_INDEX                  |                                 | Catalog names prefix                                                                                          |
| NEXT_PUBLIC_DEFAULT_INITIAL_REFINEMENTS_LIMIT   |                                 | Number of facets to be returned by Algolia                                                                    |
| NEXT_PUBLIC_DEFAULT_SHOW_MORE_REFINEMENTS_LIMIT |                                 | Number of facets to load when clicking “Show more”                                                            |
| NEXT_PUBLIC_DEFAULT_FACETS_LIMIT                |                                 | Number of filters to display on PLP                                                                           |
| NEXT_PUBLIC_CACHED_FACET_OPTIONS_LIMIT          |                                 | Max number of options for each filter                                                                         |
| NEXT_PUBLIC_BAZAARVOICE_URL                     | **BazaarVoice**                 | URL of the BV script to be loaded                                                                             |
| NEXT_PUBLIC_OPENPATH_API_ID                     | **OpenPath**                    | ID to link transactions to Cymax account                                                                      |
| NEXT_PUBLIC_AMAZON_MERCHANT_ID                  | **Amazon Pay**                  | ID to link transactions to Cymax account                                                                      |
| NEXT_PUBLIC_AMAZON_PAY_PUBLIC_KEY_ID            |                                 | Token to get access to Amazon Pay APIs                                                                        |
| KLAVIYO_API_PRIVATE_API_KEY                     | **Klaviyo**                     | Token to get access to Klaviyo APIs                                                                           |
| NEXT_PUBLIC_KLAVIYO_NEWSLETTER_LIST_ID          |                                 | Subscription list ID                                                                                          |
| NEXT_PUBLIC_KLAVIYO_PRIVACY_INFORMATION_LIST_ID |                                 | Subscription list ID                                                                                          |
| NEXT_PUBLIC_KLAVIYO_BACK_IN_STOCK_LIST_ID       |                                 | Subscription list ID                                                                                          |
| NEXT_PUBLIC_KLAVIYO_CONTACT_US_LIST_ID          |                                 | Subscription list ID                                                                                          |
| NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID               | **Google Tag Manager**          | ID to send data to Cymax account                                                                              |
| NEXT_PUBLIC_BBB_URL                             | **Better Business Bureau**      | URL to redirect when clicking on the footer icon                                                              |
| NEXT_PUBLIC_DATADOG_APPLICATION_ID              | **Datadog**                     | Datadog application ID                                                                                        |
| NEXT_PUBLIC_DATADOG_CLIENT_TOKEN                |                                 | Datadog client token                                                                                          |
| NEXT_PUBLIC_DATADOG_SITE                        |                                 | Datadog server domain                                                                                         |
| NEXT_PUBLIC_DATADOG_SERVICE                     |                                 | Datadog service names                                                                                         |
| NEXT_PUBLIC_DATADOG_SAMPLE_RATE                 |                                 | Datadog sample rate percentage                                                                                |
| NEXT_PUBLIC_DATADOG_REPLAY                      |                                 | Datadog replay rate percentage                                                                                |
| SITEMAP_CACHE_MAX_AGE                           | **Sitemap Configuration**       | Determines the number of seconds for the cache header max-age on the server side Vercel cache.                |
| SITEMAP_CACHE_STALE_WHILE_REVALIDATE            |                                 | Determines the number of seconds for the cache header stale-while-revalidate on the server side Vercel cache. |
| NEXT_PUBLIC_ELASTIC_PATH_NODE_LIMIT             |                                 | Determines the page sizes when fetching from EP to build sitemaps.                                            |
| NEXT_PUBLIC_XML_MAX_RECORDS                     |                                 | Page size of records to fetch from Algolia                                                                    |
| SITEMAP_EXPIRATION_DAYS                         |                                 | Determine when the sitemap should be refreshed by the vercel cron job                                         |
| NEXT_PUBLIC_XML_MAX_PAGES_PER_FILE              |                                 | Multiply NEXT_PUBLIC_XML_MAX_RECORDS by this to get the total of records on each xml file for the sitemap     |
| NPM_RC                                          | **Vercel**                      | Setting to grant access to Composable NPM libraries                                                           |
