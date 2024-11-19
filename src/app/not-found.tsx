import React from 'react'
import NotFoundContent from '@/components/customize/not.found'
import Footer from '@layout/footer'
import TranslationsProvider from '@/components/customize/languages/TranslationsProvider'
import initTranslations from '@/app/i18n'
import i18nConfig from '@/i18nConfig'

const i18nNamespaces = ['common', 'not-found']

export default async function NotFound() {
  const { resources } = await initTranslations(
    i18nConfig.defaultLocale,
    i18nNamespaces
  )
  return (
    <>
      <TranslationsProvider
        resources={resources}
        locale={i18nConfig.defaultLocale}
        namespaces={i18nNamespaces}
      >
        {/* <Header /> */}
        <NotFoundContent />
        <Footer />
      </TranslationsProvider>
    </>
  )
}
