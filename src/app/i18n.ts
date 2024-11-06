import {
  createInstance,
  InitOptions,
  i18n as I18nType,
  Resource,
  TFunction
} from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18nConfig from '@/i18nConfig'

type InitTranslationsResult = Promise<{
  i18n: I18nType
  resources: Resource
  t: TFunction<['translation', ...string[]], undefined>
}>

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: I18nType,
  resources?: Resource
): Promise<InitTranslationsResult> {
  i18nInstance = i18nInstance || createInstance()

  i18nInstance.use(initReactI18next)

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    )
  }

  const initOptions: InitOptions = {
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales
  }

  await i18nInstance.init(initOptions)

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  }
}
