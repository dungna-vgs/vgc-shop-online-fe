import { AvatarImage } from '@/components/ui/avatar'
import { Avatar } from '@radix-ui/react-avatar'
import Image from 'next/image'
import React from 'react'

export default function RecipientCard() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='pb-4'>
        <p className='text-[24px] mb-4 font-semibold'>Người nhận</p>
        <div className='flex justify-start gap-4 items-center'>
          <Avatar className='w-[87px] h-[87px] rounded-full'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          </Avatar>
          <div>
            <span className='block mb-1 text-[16px] font-bold'>
              Nguyễn Lan Anh
            </span>
            <span className='rounded-xl text-[10px] p-[6px] font-bold bg-gradient-to-r from-[#e8bb5b] to-[#e4d2ad] text-[#9D6129]'>
              VGA686868
            </span>
          </div>
        </div>
      </div>
      {/* MÃ VGA  */}
      <div className=''>
        <p className='text-[24px] mb-4 font-semibold'>Mã VGA</p>
        <div className='block sm:flex min-w-[246px]  gap-4 justify-between'>
          <div className=' flex justify-center md:justify-start md:mb-0 mb-2'>
            <Image
              src='/images/Card vHandicap 123.jpg'
              width={138}
              height={92}
              alt='VGA Code'
              quality={75}
            />
          </div>
          <div className='flex flex-1 justify-between gap-4  xl:justify-between items-center'>
            <span className='text-[16px] font-bold'>VGA999999</span>
            <span className='text-[20px]'>15.000.000đ</span>
          </div>
        </div>
      </div>
    </div>
  )
}
