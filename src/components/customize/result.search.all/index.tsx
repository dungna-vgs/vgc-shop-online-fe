'use client'
import { useGlobalStore } from '@/stores'
import React from 'react'
import CardNumber from '@/components/customize/number.card'
import PackageCard from '@/components/customize/package.card'
import { useTranslation } from 'react-i18next'

export default function ResultSearchAll() {
  const { t } = useTranslation('common')

  const { vgaSearchAll, feeSearchAll } = useGlobalStore()
  if (!vgaSearchAll.length && !feeSearchAll.length) return null
  return (
    <div className='mt-[100px] m-auto max-w-[1320px]'>
      <h2 className='text-center font-semibold text-2xl uppercase text-[#000]'>
        {t('found')} {vgaSearchAll.length + feeSearchAll.length} kết quả
      </h2>

      <div className='grid lg:grid-cols-4 grid-cols-2 gap-2 py-4'>
        {vgaSearchAll.map((vga) => (
          <CardNumber key={vga.id} vga={vga} />
        ))}
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:gap-8'>
        <PackageCard memberships={feeSearchAll} />
      </div>
    </div>
  )
}
