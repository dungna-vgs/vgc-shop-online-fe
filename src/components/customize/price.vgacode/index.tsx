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
import { useGlobalStore } from '@/stores'

type TPriceVGACodeProps = {
  significances: TTypeVGA[]
}
export default function PriceVGACode(props: TPriceVGACodeProps) {
  const { setSeachVGA } = useGlobalStore()
  return (
    <div className='grid md:grid-cols-1 gap-2 grid-cols-2 opacity-50'>
      <div className='p-2 border rounded-lg md:hidden block text-[16px] text-black'>
        <SheetSide significances={props.significances} />
      </div>
      <Select onValueChange={(direction) => setSeachVGA({ direction })}>
        <SelectTrigger className='w-full mr-3'>
          <SelectValue placeholder='Giá từ cao đến thấp' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='asc' className='mr-3'>
            Giá từ cao đến thấp
          </SelectItem>
          <SelectItem value='desc'>Giá từ thấp đến cao</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
