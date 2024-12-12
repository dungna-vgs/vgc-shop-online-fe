'use client'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function SearchBox() {
  const { t } = useTranslation('common')

  return (
    <div className='relative right-2.5 top-0  ml-auto flex-1 md:grow-0 my-4 md:my-0'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground ' />
      <Input
        type='search'
        placeholder={t('search')}
        className='text-sm w-full rounded-lg bg-[#F5F5F5] border-none pl-8 md:w-[200px] lg:w-[260px]'
      />
    </div>
  )
}
