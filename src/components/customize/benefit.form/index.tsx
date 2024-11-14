'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
export default function BenefitForm() {
  const { t } = useTranslation('package-price')

  return (
    <div className='bg-[#EDFFF6] p-3'>
      <p className='text-center font-bold py-6 uppercaser text-[24px]'>
        {t('benefit')}
      </p>
      <div>
        <ul>
          <li className='bg-[#16533D] w-full h-[54px] rounded-t-md '></li>
          <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
          <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
          <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
          <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
          <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
          <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
          <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
          <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
          <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
          <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
          <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
        </ul>
      </div>
      <ul className='list-inside list-disc text-black my-4'>
        {t('note')}
        <li className='ml-4'>{t('hotline')}</li>
        <li className='ml-4'>{t('contact')}</li>
        <li className='ml-4'>{t('schedule')}</li>
      </ul>
    </div>
  )
}
