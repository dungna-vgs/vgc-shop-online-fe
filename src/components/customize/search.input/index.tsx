'use client'

import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useGlobalStore, useLoading } from '@/stores'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { event } from '@/lib/gtag'

const notShowSearch = ['buy-package', 'package-price', 'buy-vga', 'vgacode']

export default function SearchInput() {
  const { t } = useTranslation('common')
  const { setKeyword: setKeywordStore } = useGlobalStore()
  const { setLoading } = useLoading()
  const [isRender, setIsRender] = useState(false)
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState<string>(
    searchParams.get('keyword') || ''
  )

  useEffect(() => {
    const id = setTimeout(() => {
      if (keyword.trim()) {
        setLoading(true)
      }
      setKeywordStore(keyword)
      event('search', {
        event_category: 'User Actions',
        event_label: 'Search Query',
        value: keyword.length,
        search_term: keyword
      })
    }, 2000)
    return () => clearTimeout(id)
  }, [keyword, setKeywordStore, setLoading])

  useEffect(() => {
    setIsRender(true)
  }, [])

  if (isRender) {
    const paths = location.pathname.split('/')
    console.log('paths: ', paths)
    if (notShowSearch.includes(paths[paths.length - 1])) {
      return null
    }
  }

  return (
    <div className='relative ml-auto flex-1'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground ' />
      <Input
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value)
        }}
        type='search'
        placeholder={t('search')}
        className='text-sm w-full sm:w-[280] flex-1 rounded-lg bg-[#F5F5F5] border-none pl-8 xl:w-[420] lg:w-[500px] cursor-pointer'
      />
    </div>
  )
}
