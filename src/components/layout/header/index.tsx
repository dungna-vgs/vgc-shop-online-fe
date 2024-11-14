'use client'
import LanguageChanger from '@customize/languages/LanguageChanger'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { AlignJustify } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import SearchInput from '@/components/customize/search.input'

const navLinks = [
  { name: 'home', href: '/' },
  { name: 'vgacode', href: '/vgacode' },
  { name: 'cost', href: '/package-price' }
]
const Header: React.FC = () => {
  const pathname = usePathname()
  const { t } = useTranslation('common')
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
              quality={60}
            />
            <span className='text-[#33B4B0] font-bold text-[26px] hidden md:block'>
              vHandicap
            </span>
          </Link>
          <div className='flex items-center gap-[24px]'>
            <SearchInput />
            {/* //LIST-ITEM  */}
            <div>
              <nav className='hidden gap-6 text-lg font-medium xl:flex xl:items-center xl:gap-8 xl:text-sm'>
                {navLinks.map((link) => {
                  const isActive = pathname == link.href
                  return (
                    <Link
                      href={link.href}
                      key={link.name}
                      className={
                        isActive
                          ? 'text-foreground  flex justify-center transition-colors hover:text-foreground'
                          : 'text-muted-foreground  flex justify-center transition-colors hover:text-foreground'
                      }
                    >
                      {t(link.name)}
                    </Link>
                  )
                })}
              </nav>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='shrink-0 xl:hidden border-none  '
                  >
                    <AlignJustify className='scale-150' />
                  </Button>
                </SheetTrigger>
                <SheetContent className='bg-[#4AC486] mt-[84px]' side='top'>
                  <nav className='grid text-white gap-6 text-lg font-medium'>
                    <Link href='/' className='hover:text-foreground'>
                      {t('home')}
                    </Link>
                    <Link href='/vgacode' className=' hover:text-foreground'>
                      {t('vgacode')}
                    </Link>
                    <Link
                      href='/package-price'
                      className=' hover:text-foreground'
                    >
                      {t('cost')}
                    </Link>
                    <div className='flex gap-4 items-center'>
                      <span>{t('language')}</span>
                      <LanguageChanger />
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            {/* END LIST ITEM  */}
            <div className='hidden xl:block'>
              <LanguageChanger />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
