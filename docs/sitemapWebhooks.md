# Sitemap index Generation and Webhooks

Sitemaps are generated and stored in contentful.

There are 2 api endpoints to trigger this generation. The first one is called by Vercel's cron. The second is triggered when a sitemapIndex content is published in Contentful

## Vercel Cron

Vercel cron call `/api/sitemap-generator/create-index`. This call is set on `/vercel.json` file.
Everytime this endpoint is called, it will create a sitemap index and publish it in Contentful if the sitemap expiration time is overdue.

Sitemap expiration is set on an environment variable called `SITEMAP_EXPIRATION_DAYS` that should store the max number of days that the sitemap should be stored before triggering a new generation.

## Contentful Webhook

A Contentful webhook is set to call `/api/sitemap-generator/create-product-page` every time a "Sitemap Index" is published. This enpoint create one page of product sitemap, store it in Contentul and update the "Sitemap Index" entry in Contentful thus triggering the next page.

### Webhook Setup

webhook can be setup on contentful settings > webhooks.

to setup the webhook, fill those values

- **Name:** Sitemap Index Built (We currently use this, but it can be changed.)
- **URL:** GET : {ENVIRONMENT_URL}/api/sitemap-generator/create-product-page
- **Active:** checked
- **Triggers:** Check _Select specific triggering events_
- **Content Events:** Select _Publish_ in the `Entry` line (do not check entry)
- **Filters:**
  - `Environment ID (sys.environment.sys.id)` equals {ENVIRONMENT}
  - `Content Type ID (sys.contentType.sys.id)` quals `sitemapIndex`
- **Environment Alias Events:** Checked
- **Secret Headers:**
  - **x-vercel-protection-bypass:** `{bypass secret from Vercel}`
    - Only required if password protection is enabled in Vercel (staging/qa)
- **Headers:**
  - **Content Type:** application/vnd.contentful.management.v1+json
- **Payload:** Select _Use Default Payload_

## Environment Variables

These are the environment variables required for the sitemap generation.

- **SITEMAP_CACHE_MAX_AGE:** Time in days that the server should store a sitemap cache. Default value is 6
- **SITEMAP_CACHE_STALE_WHILE_REVALIDATE:** How long in days the server will distribute the overdue cache while generating a new one. Default value is 1
- **SITEMAP_EXPIRATION_DAYS:** Number of days until the sitemap is considered expired. Defaults to 7
- **NEXT_PUBLIC_XML_MAX_RECORDS:** Max number of records that we can fetch from algolia on each request. Defaults to 1000
- **NEXT_PUBLIC_XML_MAX_PAGES_PER_FILE** Number of requests we will make to algolia to create one page of the sitemap. Defaults to 20
- **CONTENTFUL_MANAGEMENT_ACCESS_TOKEN:** Contentful management API Token
- **NEXT_PUBLIC_CONTENTFUL_SPACE_ID:** Contentful Space ID
- **NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT:** Contentful Environment
- **NEXT_PUBLIC_ALGOLIA_BASE_INDEX:** Algolia catalog base index
- **NEXT_PUBLIC_ALGOLIA_APP_ID:** Algolia APP id
- **ALGOLIA_WRITE_API_KEY:** Algolia API Key

## Test Case

In order to test the sitemap generation one can follow the steps bellow:

1. Delete all entries of the types "Sitemap Index" and "Sitemap Page" from Contentful.
2. Either await for the Vercel cron to run or manually call `/api/sitemap-generator/create-index`
3. Check that a entry of type "Sitemap Index" was created and has data.
4. Go to `"Settings > Webhooks"` in the `master` branch of Contentful and open the `[<env_name>] Sitemap Index Built` webhook.
5. In the `Activity log` tab confirm that the webhook was called and it has a success status.
6. Check website for the newly generated sitemap page
