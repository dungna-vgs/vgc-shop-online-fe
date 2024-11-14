import React from 'react'
import NotFoundContent from '@/components/customize/not.found'
import Footer from '@layout/footer'
import TranslationsProvider from '@/components/customize/languages/TranslationsProvider'
import initTranslations from '@/app/i18n'

const i18nNamespaces = ['common', 'not-found']

export default async function NotFound() {
  const { resources } = await initTranslations('en', i18nNamespaces)
  return (
    <>
      <TranslationsProvider
        resources={resources}
        locale={'en'}
        namespaces={i18nNamespaces}
      >
        {/* <Header /> */}
        <NotFoundContent />
        <Footer />
      </TranslationsProvider>
    </>
  )
}
