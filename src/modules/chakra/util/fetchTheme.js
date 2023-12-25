function getAssetUrl(field, data) {
  if (field?.sys?.id != null && data?.includes?.Asset?.length > 0) {
    const asset = data.includes.Asset.find((el) => el?.sys?.id === field.sys.id)
    return asset?.fields?.file?.url
  }
  return null
}

;(async () => {
  const fs = require('fs')
  const axios = require('axios')
  require('dotenv').config()

  const theme = {
    colors: {},
    fonts: {},
  }
  const fonts = {
    url: '',
  }
  const settings = {
    openPathToggle: false,
    paypalToggle: false,
    amazonPayToggle: false,
    affirmToggle: false,
    componentController: {
      MoreFromBrandcarousel: false,
    },
    customerServicePhone: '',
    customerServiceEmail: '',
    privacyFormEmail: '',
    storeLiteral: '',
    storeName: 'Cymax',
    storeDescription: '',
    storeTelephone: '1-800-556-5663',
    storeStreetAddress: '1000 W. 35th Street',
    storeAddressLocality: 'Chicago',
    storeAddressRegion: 'IL',
    storePostalCode: '60609',
    storeCountry: 'US',
    storeLogo: 'https://www.cymax.com/images/logo.png',
    storeOpenHours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59',
    storeCloseHours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59',
    organizationName: 'Cymax',
    favicon: null,
  }

  if (process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID != null) {
    const ContenfulClient = {
      space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
      environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
      accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
      siteID: process.env.NEXT_PUBLIC_SITE_IDENTIFIER,
    }

    try {
      const { data } = await axios.get(
        `https://cdn.contentful.com/spaces/${ContenfulClient.space}/environments/${ContenfulClient.environment}/entries?access_token=${ContenfulClient.accessToken}&content_type=theme&fields.site=${ContenfulClient.siteID}&limit=1`
      )
      const globalThemeEntry = data.items[0]
      Object.keys(globalThemeEntry.fields).forEach((themeKey) => {
        const keyArr = themeKey.split('_')
        switch (keyArr[0]) {
          case 'colors':
          case 'typography':
            if (keyArr[1] === 'fonts') {
              theme['fonts'] = globalThemeEntry.fields[themeKey]
            } else {
              theme[keyArr[0]] = {
                ...theme[keyArr[0]],
                [keyArr[1]]: globalThemeEntry.fields[themeKey],
              }
            }
            break
          case 'googleFontsApi':
            if (globalThemeEntry.fields[themeKey]) {
              fonts.url = globalThemeEntry.fields[themeKey]
            }
            break
          case 'identifier':
          default:
            break
        }
      })

      settings.openPathToggle = data.items[0].fields['openPathToggle'] ?? false
      settings.paypalToggle = data.items[0].fields['paypalToggle'] ?? false
      settings.amazonPayToggle =
        data.items[0].fields['amazonPayToggle'] ?? false
      settings.affirmToggle = data.items[0].fields['affirmToggle'] ?? false
      settings.componentController = data.items[0].fields[
        'componentController'
      ] ?? {
        MoreFromBrandcarousel: false,
      }
      settings.customerServicePhone =
        data.items[0].fields['customerServicePhone'] ?? ''
      settings.customerServiceEmail =
        data.items[0].fields['customerServiceEmail'] ?? ''
      settings.privacyFormEmail = data.items[0].fields['privacyFormEmail'] ?? ''

      settings.storeName = data.items[0].fields['storeName'] ?? 'Cymax'
      settings.storeLiteral = data.items[0].fields['storeLiteral'] ?? ''
      settings.storeDescription = data.items[0].fields['storeDescription'] ?? ''
      settings.storeTelephone =
        data.items[0].fields['storeTelephone'] ?? '1-800-556-5663'
      settings.storeStreetAddress =
        data.items[0].fields['storeStreetAddress'] ?? '1000 W. 35th Street'
      settings.storeAddressLocality =
        data.items[0].fields['storeAddressLocality'] ?? 'Chicago'
      settings.storeAddressRegion =
        data.items[0].fields['storeAddressRegion'] ?? 'IL'
      settings.storePostalCode =
        data.items[0].fields['storePostalCode'] ?? '60609'
      settings.storeCountry = data.items[0].fields['storeCountry'] ?? 'US'
      settings.storeLogo =
        data.items[0].fields['storeLogo'] ??
        'https://www.cymax.com/images/logo.png'
      settings.storeOpenHours =
        data.items[0].fields['storeOpenHours'] ??
        'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59'
      settings.storeCloseHours =
        data.items[0].fields['storeCloseHours'] ??
        'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59'
      settings.organizationName =
        data.items[0].fields['organizationName'] ?? 'Cymax'
      settings.favicon = getAssetUrl(data.items[0].fields['favicon'], data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error when getting theme', error)
    }
  }
  try {
    fs.writeFileSync(
      './src/modules/chakra/util/theme.json',
      JSON.stringify(theme, null, 2)
    )
    fs.writeFileSync(
      './src/modules/chakra/util/fonts.json',
      JSON.stringify(fonts, null, 2)
    )
    fs.writeFileSync(
      './src/modules/app/siteSettings.json',
      JSON.stringify(settings, null, 2)
    )
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error when writing theme files', error)
  }
})()
