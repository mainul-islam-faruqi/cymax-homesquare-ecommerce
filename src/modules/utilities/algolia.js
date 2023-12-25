/* eslint-disable no-console */
const axios = require('axios')

function getAlgoliaHeaders({ appId, apiKey }) {
  return {
    'Content-Type': 'application/json',
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }
}

function getAlgoliaURL({ appId, baseIndex }) {
  return `https://${appId}-dsn.algolia.net/1/indexes/${baseIndex}`
}

async function getIndexRecordsPage({
  attributesToRetrieve,
  appId,
  apiKey,
  baseIndex,
  pageSize,
  currentCursor,
}) {
  console.log('Getting Algolia records to generate product sitemap page')
  const URL = `${getAlgoliaURL({
    appId,
    baseIndex,
  })}/browse`
  const headers = getAlgoliaHeaders({ appId, apiKey })

  let hits = []
  let cursor = null
  let cursorValue = {}
  if (currentCursor) {
    cursorValue = { cursor: currentCursor }
  }

  const pageData = await axios
    .post(
      URL,
      {
        ...cursorValue,
        hitsPerPage: pageSize,
        attributesToRetrieve: attributesToRetrieve,
      },
      {
        headers,
      }
    )
    .then(({ data }) => data)
    .catch(function (error) {
      console.error('Error while fetching algolia index records page', error)
      throw error
    })

  if (pageData) {
    hits = pageData.hits
    cursor = pageData.cursor
    console.log(
      `Data retrieved from Algolia. hits_number=${
        hits?.length
      }, cursor_not_null=${cursor != null}`
    )
  }

  return { hits, cursor }
}

async function getIndexNumberOfHits({ appId, apiKey, baseIndex }) {
  const URL = `${getAlgoliaURL({ appId, baseIndex })}/query`
  const headers = getAlgoliaHeaders({ appId, apiKey })

  const numberOfHitsParamsString = new URLSearchParams({
    hitsPerPage: '0',
  }).toString()

  const numberOfHits = await axios
    .post(
      URL,
      {
        params: numberOfHitsParamsString,
      },
      {
        headers,
      }
    )
    .then(({ data }) => data?.nbHits ?? 0)
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error("Error while getting index's mnumber of hits", error)
      return 0
    })

  return numberOfHits
}

module.exports = {
  getIndexRecordsPage,
  getIndexNumberOfHits,
}
