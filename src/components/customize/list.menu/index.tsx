import Image from 'next/image'
import Link from 'next/link'

export default function ListMenuSerial() {
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
          className='hover:fill-slate-50'
        />
        <span>Tất cả</span>
      </Link>
    </div>
  )
}
