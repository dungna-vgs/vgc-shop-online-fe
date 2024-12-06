import React from 'react'
import Footer from '@layout/footer'
import i18nConfig from '@/i18nConfig'
import initTranslations from '@/app/i18n'
import NotFoundContent from '@/components/customize/not.found'
import TranslationsProvider from '@/components/customize/languages/TranslationsProvider'

const i18nNamespaces = ['common', 'not-found']

export default async function NotFound() {
  const { resources } = await initTranslations(
    i18nConfig.defaultLocale,
    i18nNamespaces
  )
  return (
    <TranslationsProvider
      resources={resources}
      locale={i18nConfig.defaultLocale}
      namespaces={i18nNamespaces}
    >
      {/* <Header /> */}
      <NotFoundContent />
      <Footer />
    </TranslationsProvider>
  )
}
