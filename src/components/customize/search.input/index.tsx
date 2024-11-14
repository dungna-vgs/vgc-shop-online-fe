'use client'

import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useGlobalStore } from '@/stores'
import { apiSearchAll } from '@/apis/internals/clients/search.all'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToastStore } from '@/stores'
export default function SearchInput() {
  const { t } = useTranslation('common')
  const { setSearchAll } = useGlobalStore()
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState<string>(
    searchParams.get('keyword') || ''
  )
  const { showToast } = useToastStore()

  useEffect(() => {
    if (!keyword) {
      setSearchAll({ vgaSearchAll: [], feeSearchAll: [] })
      return
    }
    const id = setTimeout(() => {
      const handleOnSearch = async (keyword: string) => {
        const res = await apiSearchAll({ keyword })
        if (res.data.vgas.length > 0 && res.data.membershipPackage.length > 0) {
          setSearchAll({
            vgaSearchAll: res.data.vgas,
            feeSearchAll: res.data.membershipPackage
          })
        } else {
          showToast(t('not-found', { searchQuery: keyword }), 'error', 2000)
        }
      }
      handleOnSearch(keyword)
    }, 300)
    return () => clearTimeout(id)
  }, [keyword, setSearchAll, showToast, t])

  return (
    <div className='relative ml-auto flex-1'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground ' />
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        type='search'
        placeholder={t('search')}
        className='text-sm w-full sm:w-[280] flex-1 rounded-lg bg-[#F5F5F5] border-none pl-8 xl:w-[420] lg:w-[500px] cursor-pointer'
      />
    </div>
  )
}
