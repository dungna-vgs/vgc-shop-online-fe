import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function ListMenuSerial() {
  const { t } = useTranslation('common')
  return (
    <div>
      <Link
        href='/buy-vga'
        className='flex flex-col w-[112px] h-[128px]  justify-center gap-1 items-center hover:bg-[#4AC486] hover:text-white bg-white text-black rounded-[15px]'
      >
        <Image
          src='/images/Vector.svg'
          width={44}
          height={44}
          alt='Icon'
          quality={60}
          className='hover:fill-slate-50'
        />
        <p>{t('all')}</p>
      </Link>
    </div>
  )
}
