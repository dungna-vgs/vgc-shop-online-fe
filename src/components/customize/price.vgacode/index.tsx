'use client'

import React from 'react'
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SheetSide } from '@/app/[locale]/_components/filter-menu'
import { TTypeVGA } from '@/types/type'
import { useSearchVGA } from '@/stores'
import { useTranslation } from 'react-i18next'

type TPriceVGACodeProps = {
  significances: TTypeVGA[]
}
export default function PriceVGACode(props: TPriceVGACodeProps) {
  const { t } = useTranslation('common')

  const { setDirection } = useSearchVGA()
  return (
    <div className='grid md:grid-cols-1 gap-2 grid-cols-2 opacity-50'>
      <div className='p-2 border rounded-lg md:hidden block text-[16px] text-black'>
        <SheetSide significances={props.significances} />
      </div>
      <Select onValueChange={(direction) => setDirection(direction)}>
        <SelectTrigger className='w-full mr-3'>
          <SelectValue placeholder={t('low-to-high')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='asc' className='mr-3'>
            {t('low-to-high')}
          </SelectItem>
          <SelectItem value='desc'>{t('high-to-low')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
