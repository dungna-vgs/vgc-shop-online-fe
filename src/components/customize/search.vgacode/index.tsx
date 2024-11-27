'use client'
import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import { useSearchVGA } from '@/stores'
export default function SearchVGACode() {
  const { t } = useTranslation('common')
  const { setVga } = useSearchVGA()
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    const id = setTimeout(() => {
      setVga(keyword)
    }, 500)
    return () => clearTimeout(id)
  }, [keyword, setVga])

  return (
    <div className='relative ml-auto flex-1 md:grow-0 my-4 md:my-0'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground ' />
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        type='search'
        placeholder={t('search')}
        className='text-sm w-full rounded-lg bg-[#F5F5F5] border-none pl-8 md:w-[200px] lg:w-[260px]'
      />
    </div>
  )
}
