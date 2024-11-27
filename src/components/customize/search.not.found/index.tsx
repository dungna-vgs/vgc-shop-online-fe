'use client'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function SearchNotFound() {
  const { t } = useTranslation('common')
  return (
    <div className='flex justify-center items-center py-3 w-full flex-col-reverse'>
      <span className='text-xl font-semibold p-3 text-[#000]'>
        {t('no-data')}
      </span>
      <Image
        src='/images/search-not-found.png'
        width={200}
        height={200}
        alt='Search Not Found'
        quality={60}
      />
    </div>
  )
}
