'use client'
import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'

type TSearchMembershipProps = {
  keyword: string
  onSearch: (keyword: string) => void
}

export default function SearchMembership(props: TSearchMembershipProps) {
  const { t } = useTranslation('common')

  return (
    <div className='relative ml-auto flex-1 md:grow-0 my-4 md:my-0'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground ' />
      <Input
        value={props.keyword}
        onChange={(e) => props.onSearch(e.target.value)}
        type='search'
        placeholder={t('search')}
        className='text-sm w-full rounded-lg bg-[#F5F5F5] border-none pl-8 md:w-[200px] lg:w-[260px]'
      />
    </div>
  )
}
