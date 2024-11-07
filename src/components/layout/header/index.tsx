'use client'
import LanguageChanger from '@customize/languages/LanguageChanger'
import Image from 'next/image'
import React from 'react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { AlignJustify, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Mã VGA', href: '/vgacode' },
  { name: 'Phí hội viên', href: '/package-price' }
]
const Header: React.FC = () => {
  const pathname = usePathname()
  console.log(pathname)
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
            <span className='text-[#33B4B0] font-bold text-[26px] hidden md:block'>
              vHandicap
            </span>
          </Link>
          <div className='flex items-center gap-[24px]'>
            <div className='relative ml-auto flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground ' />
              <Input
                type='search'
                placeholder='Tìm kiếm'
                className='text-sm w-full sm:w-[280] flex-1 rounded-lg bg-[#F5F5F5] border-none pl-8 xl:w-[420] lg:w-[500px]'
              />
            </div>
            {/* //LIST-ITEM  */}
            <div>
              <nav className='hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:gap-5 lg:text-sm'>
                {navLinks.map((link) => {
                  const isActive = pathname == link.href
                  return (
                    <Link
                      href={link.href}
                      key={link.name}
                      className={
                        isActive
                          ? 'text-foreground w-[80px] flex justify-center transition-colors hover:text-foreground'
                          : 'text-muted-foreground  w-[80px] flex justify-center transition-colors hover:text-foreground'
                      }
                    >
                      {link.name}
                    </Link>
                  )
                })}
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
            <div className='hidden lg:block'>
              <LanguageChanger />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
