import { IntlConfig } from '@myplanetdigital/base'
import enCATranslations from './en-CA.json'
import enUSTranslations from './en-US.json'
import frCATranslations from './fr-CA.json'

export const intlConfig: IntlConfig[] = [
  {
    code: 'en-US',
    title: 'English (en-US)',
    keys: {
      ...enUSTranslations,
    },
    translationKey: 'locale.title.en-US',
    currency: 'USD',
  },
  {
    code: 'en-CA',
    title: 'English (en-CA)',
    keys: {
      ...enUSTranslations,
      ...enCATranslations,
    },
    translationKey: 'locale.title.en-CA',
    currency: 'CAD',
  },
  {
    code: 'fr-CA',
    title: 'French (fr-CA)',
    keys: {
      ...enUSTranslations,
      ...frCATranslations,
    },
    translationKey: 'locale.title.en-CA',
    currency: 'CAD',
  },
]
