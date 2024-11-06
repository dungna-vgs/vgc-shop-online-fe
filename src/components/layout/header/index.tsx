'use client'
import LanguageChanger from '@customize/languages/LanguageChanger'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { AlignJustify } from 'lucide-react'
import SearchInput from '@/components/customize/search.input'

type THeader = {
  showSearch?: boolean
}

const Header: React.FC<THeader> = ({ showSearch = true }) => {
  
  return (
    <div className='bg-background fixed top-0 right-0 left-0 z-[999] shadow-[0_-6px_10px_5px_rgba(0,0,0,0.2)]'>
      <div className='max-w-[1200px] mx-auto px-4'>
        <div className='flex items-center justify-between py-[22px] px-0  gap-[36px]'>
          <Link href='/' className='flex gap-2 items-center justify-center'>
            <Image
              src='/images/logo.png'
              width={36}
              height={31}
              alt='Handicap Logo'
            />
            <span className='text-[#33B4B0] font-bold text-[26px] md:block'>
              vHandicap
            </span>
          </Link>
          <div className='flex items-center gap-[24px]'>
            {showSearch && <SearchInput />}
            {/* //LIST-ITEM  */}
            <div>
              <nav className='flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:gap-5 lg:text-sm'>
                <Link
                  href='/'
                  className='text-foreground w-[80px] flex justify-center transition-colors hover:text-foreground'
                >
                  Trang chủ
                </Link>
                <Link
                  href='/vgacode'
                  className='text-muted-foreground w-[80px] flex justify-center transition-colors hover:text-foreground'
                >
                  Mã VGA
                </Link>
                <Link
                  href='/package-price'
                  className='text-muted-foreground w-[80px] flex justify-center transition-colors hover:text-foreground'
                >
                  Phí hội viên
                </Link>
              </nav>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='shrink-0 lg:hidden border-none  '
                  >
                    <AlignJustify className='scale-150' />
                  </Button>
                </SheetTrigger>
                <SheetContent className='bg-[#4AC486] mt-[84px]' side='top'>
                  <nav className='grid text-white gap-6 text-lg font-medium'>
                    <Link href='/' className='hover:text-foreground'>
                      Trang chủ
                    </Link>
                    <Link href='/vgacode' className=' hover:text-foreground'>
                      Mã VGA
                    </Link>
                    <Link
                      href='/package-price'
                      className=' hover:text-foreground'
                    >
                      Phí hội viên
                    </Link>
                    <div className='flex gap-4 items-center'>
                      <span>Ngôn ngữ</span>
                      <LanguageChanger />
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            {/* END LIST ITEM  */}
            <div className='lg:block'>
              <LanguageChanger />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
