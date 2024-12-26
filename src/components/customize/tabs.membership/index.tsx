'use client'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
// import SearchBox from '../search.box'
import { useTranslation } from 'react-i18next'
import SearchMembership from '../search.membership'

type TTabsListMembershipProps = {
  keyword: string
  onSearch: (keyword: string) => void
}

export default function TabsListMembership(props: TTabsListMembershipProps) {
  const { t } = useTranslation('common')
  return (
    <div>
      <TabsList
        defaultValue={'all'}
        className='block mb-16 md:mb-0 md:flex justify-between gap-4 bg-transparent text-black'
      >
        <div className='flex gap-4 items-cente'>
          <TabsTrigger
            autoFocus
            value='all'
            className='w-20 sm:w-[128px] h-10 focus:outline-none'
          >
            {t('all')}
          </TabsTrigger>
          <TabsTrigger
            value='premium'
            className='w-20 sm:w-[128px] h-10 focus:outline-none'
          >
            Premium
          </TabsTrigger>
          <TabsTrigger
            value='priority'
            className='w-20 sm:w-[128px] h-10 focus:outline-none'
          >
            Priority
          </TabsTrigger>
        </div>
        {/* TÌM KIẾM  MEMBERSHIP FEE */}
        <SearchMembership {...props} />
      </TabsList>
    </div>
  )
}
