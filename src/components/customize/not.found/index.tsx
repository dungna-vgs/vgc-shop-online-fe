'use client'
import Image from 'next/image'
import React from 'react'
import TranslationsProvider from '@/components/customize/languages/TranslationsProvider'
import initTranslations from '@/app/i18n'

const i18nNamespaces = ['not-found']
type TNotFound = {
  params: { locale: string }
}

export default async function NotFound(props: TNotFound) {
  
  const { resources } = await initTranslations("en", i18nNamespaces)
  return (
    <TranslationsProvider
      resources={resources}
      locale={"en"}
      namespaces={i18nNamespaces}
    >
      <div className='w-full min-h-[100vh] py-6 lg:px-10 sm:px-6 px-4 flex flex-col gap-4 justify-center items-center'>
        <Image
          src='/images/404.jpg'
          width={585}
          height={249}
          alt='Not Found'
          quality={75}
        />
        <p className='text-[36px]'>Không tìm thấy trang!</p>
        <p>Tài nguyên yêu cầu không được tìm thấy trên máy chủ này!</p>
      </div>
    </TranslationsProvider>
  )
}
