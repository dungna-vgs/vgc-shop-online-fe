'use client'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import CardNumber from '@/components/customize/number.card'
import { Button } from '@/components/ui/button'
import styles from './style.module.css'
import Image from 'next/image'
import MenuSerialNumber from '@/components/customize/menu.serialnumber'
import Link from 'next/link'
import { TTypeVGA, TVga } from '@/types/type'
import { useGlobalStore } from '@/stores'
import { useEffect, useState } from 'react'
import { apiSearchVGA } from '@/apis/internals/clients/search.vga'
import { TParamsSearchVGA } from '@/apis/internals/clients/search.vga'

type TSerialNumber = {
  typeVga: TTypeVGA[]
  infoVGA: {
    data: TVga[]
    total: number
    from: number
    per_page: number
    last_page: number
    redirect: string | null
  }
}
export default function SerialNumber(props: TSerialNumber) {
  const [keyword, setKeyword] = useState<string>('')
  const [isClient, setIsClient] = useState(false)
  const { setVgas, vgas, searchVGA, setSeachVGA, vgaSearchAll, feeSearchAll } =
    useGlobalStore()

  useEffect(() => {
    const handleSearchVGA = (params: TParamsSearchVGA) => {
      apiSearchVGA(params).then((res) => {
        console.log(res.data)
        setVgas(res.data)
      })
    }
    if (Object.keys(searchVGA).length) {
      handleSearchVGA(searchVGA)
    }
  }, [setVgas, searchVGA])

  let data = props.infoVGA.data
  if (isClient && Object.keys(searchVGA).length) {
    data = vgas
  }

  useEffect(() => {
    setIsClient(true)
    const id = setTimeout(() => {
      if (keyword?.trim()) {
        setSeachVGA({ vga: keyword })
      } else {
        const copySearchVGA = { ...searchVGA }
        delete copySearchVGA.vga
        setSeachVGA(copySearchVGA)
      }
    }, 300)
    return () => clearTimeout(id)
  }, [keyword, setSeachVGA, searchVGA])

  if (vgaSearchAll.length || feeSearchAll.length) return null

  return (
    <div>
      <div className='p-0 py-0 lg:py-0 block lg:flex justify-between items-center w-full'>
        <h3 className='text-xl font-semibold p-3 text-[#000]'>Mã VGA</h3>
        <div className='flex flex-col lg:flex-row justify-end items-center gap-4'>
          <div className='relative ml-auto flex-1 w-full md:grow-0'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground ' />
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              type='search'
              placeholder='Tìm kiếm'
              className='text-sm w-full rounded-lg bg-[#F5F5F5] border-none pl-8  lg:w-[320px]'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Select
              onValueChange={(value) => {
                const [min, max] = value.split('-')
                setSeachVGA({
                  money_from: parseInt(min),
                  money_to: parseInt(max)
                })
              }}
            >
              <SelectTrigger className='max-w-[226px]'>
                <SelectValue placeholder='Chọn mức giá' />
              </SelectTrigger>
              <SelectContent className='min-w-[250px]'>
                <SelectItem value='-'>Tất cả</SelectItem>
                <SelectItem value='-5000000'>&lt; 5.000.000đ</SelectItem>
                <SelectItem value='5000000-10000000'>
                  5.000.000đ - 10.000.000đ
                </SelectItem>
                <SelectItem value='10000000-20000000'>
                  10.000.000đ - 20.000.000đ
                </SelectItem>
                <SelectItem value='20000000-100000000'>
                  20.000.000đ - 100.000.000đ
                </SelectItem>
                <SelectItem value='100000000-300000000'>
                  100.000.000đ - 300.000.000đ
                </SelectItem>
                <SelectItem value='300000000-'>&gt; 300.000.000đ</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(direction) => setSeachVGA({ direction })}>
              <SelectTrigger className='max-w-[226px]'>
                <SelectValue placeholder='Giá từ cao đến thấp' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='desc'>Giá từ cao đến thấp</SelectItem>
                <SelectItem value='asc'>Giá từ thấp đến cao</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <MenuSerialNumber typeVga={props.typeVga} />
      <div className='grid  grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 xl:gap-4 md:gap-3 gap-2 overflow-hidden'>
        {data.map((vga, index) => (
          <CardNumber vga={vga} key={index} />
        ))}
      </div>
      <div className='flex justify-center items-center py-3'>
        <Link href='/vgacode'>
          <Button className={styles.btnShowAll}>
            <span>Xem tất cả</span>
            <Image
              src='/images/arrow-right.svg'
              width={16}
              height={16}
              alt='ArrowRight Icon'
              quality={75}
            />
          </Button>
        </Link>
      </div>
    </div>
  )
}
