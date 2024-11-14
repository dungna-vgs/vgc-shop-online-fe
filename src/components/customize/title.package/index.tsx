'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
export default function TitlePackage() {
  const { t } = useTranslation('common')
  return (
    <div className='flex justify-between items-center pb-6'>
      <h3 className='text-xl font-semibold text-[#000]'>{t('cost')}</h3>
    </div>
  )
}
