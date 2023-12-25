const axios = require('axios')
const contentful = require('contentful-management')
const delivery = require('contentful')
const { space } = require('@chakra-ui/react')

function getHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  }
}

function getSpaceURL(spaceId) {
  return `https://api.contentful.com/spaces/${spaceId}`
}

async function uploadFile({ file, token, spaceId }) {
  const URL = `https://upload.contentful.com/spaces/${spaceId}/uploads`
  const headers = getHeaders(token)

  const fileData = await axios
    .post(URL, file, {
      headers: {
        ...headers,
        'Content-Type': 'application/octet-stream',
        //...file.getHeaders(),
      },
    })
    .then(({ data }) => data)
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error while uploading file',
        JSON.stringify(error?.response, null, 2)
      )
      return null
    })

  return fileData
}

async function getAsset({ assetId, token, spaceId, enviromentId }) {
  const URL = `${getSpaceURL(
    spaceId
  )}/environments/${enviromentId}/assets/${assetId}`
  const headers = getHeaders(token)

  const assetData = await axios
    .get(URL, {
      headers,
    })
    .then(({ data }) => data)
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error while getting asset',
        JSON.stringify(error?.response, null, 2)
      )
      return null
    })

  return assetData
}

async function searchAsset({ params, token, spaceId, enviromentId }) {
  const URL = `https://cdn.contentful.com/spaces/${spaceId}/environments/${enviromentId}/assets`
  const headers = getHeaders(token)

  const assetData = await axios
    .get(URL, {
      headers,
      params,
    })
    .then((res) => {
      return res.data
    })
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error while searching asset\n',
        JSON.stringify(error?.response?.data, null, 2),
        '\n Params: \n',
        JSON.stringify(params, null, 2)
      )
      return null
    })

  return assetData
}

async function createAsset({ newAsset, token, spaceId, enviromentId }) {
  const URL = `${getSpaceURL(spaceId)}/environments/${enviromentId}/assets`
  const headers = getHeaders(token)

  const assetData = await axios
    .post(URL, newAsset, {
      headers: {
        ...headers,
        'Content-Type': 'application/vnd.contentful.management.v1+json',
      },
    })
    .then(({ data }) => data)
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error while creating asset\n',
        JSON.stringify(error?.response?.data, null, 2),
        '\n Asset: \n',
        JSON.stringify(newAsset, null, 2)
      )
      return null
    })

  return assetData
}

async function updateAsset({ asset, newAsset, token, spaceId, enviromentId }) {
  const URL = `${getSpaceURL(spaceId)}/environments/${enviromentId}/assets/${
    asset.sys.id
  }`
  const headers = getHeaders(token)

  const assetData = await axios
    .put(URL, newAsset, {
      headers: {
        ...headers,
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        'X-Contentful-Version': asset.sys.version,
      },
    })
    .then(({ data }) => data)
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error while updating asset\n',
        error,
        //JSON.stringify(error?.response?.data, null, 2),
        '\n Asset: \n',
        JSON.stringify(newAsset, null, 2)
      )
      return null
    })

  return assetData
}

async function deleteAsset({ asset, token, spaceId, enviromentId }) {
  const URL = `${getSpaceURL(spaceId)}/environments/${enviromentId}/assets/${
    asset.sys.id
  }`
  const headers = getHeaders(token)

  const assetData = await axios
    .delete(URL, {
      headers,
    })
    .then((res) => {
      if (res.status !== 204) {
        throw new Error(JSON.stringify(res, null, 2))
      }
      return res.data
    })
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error while deleting asset\n',
        error,
        '\n Asset: \n',
        JSON.stringify(asset, null, 2)
      )
      return null
    })

  return assetData
}

async function processAsset({ asset, token, spaceId, enviromentId }) {
  const URL = `${getSpaceURL(spaceId)}/environments/${enviromentId}/assets/${
    asset.sys.id
  }/files/en-US/process`
  const headers = getHeaders(token)

  const assetData = await axios
    .put(URL, undefined, {
      headers: {
        ...headers,
        'X-Contentful-Version': 2,
      },
    })
    .then((res) => {
      if (res.status !== 204) {
        throw new Error(JSON.stringify(res, null, 2))
      }
      return res.data
    })
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error while processing asset\n',
        error,
        '\n Asset: \n',
        JSON.stringify(asset, null, 2)
      )
      return null
    })

  return assetData
}

async function publishAsset({ asset, token, spaceId, enviromentId }) {
  const URL = `${getSpaceURL(spaceId)}/environments/${enviromentId}/assets/${
    asset.sys.id
  }/published`
  const headers = {
    ...getHeaders(token),
    'X-Contentful-Version': asset.sys.version,
  }

  const assetData = await axios
    .put(URL, undefined, {
      headers,
    })
    .then(({ data }) => data)
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error while publishing asset\n',
        JSON.stringify(error?.response?.data, null, 2),
        '\n Asset: \n',
        JSON.stringify(asset, null, 2)
      )
      return null
    })

  return assetData
}

async function createEntry(
  token,
  spaceId,
  environmentId,
  contentTypeId,
  fields
) {
  const client = contentful.createClient({
    accessToken: token,
  })

  return client
    .getSpace(spaceId)
    .then((space) => space.getEnvironment(environmentId))
    .then((environment) =>
      environment.createEntry(contentTypeId, {
        fields: fields,
      })
    )
    .then((entry) => entry.publish())
    .catch(console.error)
}

async function updateEntry(
  token,
  spaceId,
  environmentId,
  entryId,
  updatedFields
) {
  const client = contentful.createClient({
    accessToken: token,
  })

  // Update entry
  return client
    .getSpace(spaceId)
    .then((space) => space.getEnvironment(environmentId))
    .then((environment) => environment.getEntry(entryId))
    .then((entry) => {
      for (const key in updatedFields) {
        if (key == 'created') {
          continue
        }
        entry.fields[key] = updatedFields[key]
      }
      return entry.update()
    })
    .then((entry) => entry.publish())
    .catch(console.error)
}

async function createAssetFromFile(
  token,
  spaceId,
  environmentId,
  title,
  description,
  contentType,
  fileName,
  fileContent
) {
  const client = contentful.createClient({
    accessToken: token,
  })

  return await client
    .getSpace(spaceId)
    .then((space) => space.getEnvironment(environmentId))
    .then((environment) =>
      environment.createAssetFromFiles({
        fields: {
          title: {
            'en-US': title,
          },
          description: {
            'en-US': description,
          },
          file: {
            'en-US': {
              contentType: contentType,
              fileName: fileName,
              file: fileContent,
            },
          },
        },
      })
    )
    .then((asset) => asset.processForAllLocales())
    .then((asset) => asset.publish())
    .catch(console.error)
}

module.exports = {
  uploadFile,
  getAsset,
  searchAsset,
  createAsset,
  updateAsset,
  deleteAsset,
  processAsset,
  publishAsset,
  createEntry,
  updateEntry,
  createAssetFromFile,
}
