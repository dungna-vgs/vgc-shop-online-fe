import Image from 'next/image'
import React from 'react'

export default function NotSearch() {
  return (
    <div>
      <div className='w-full min-h-[100vh] py-6 lg:px-10 sm:px-6 px-4 flex flex-col gap-4 justify-center items-center'>
        <Image
          src='/images/405.svg'
          width={585}
          height={249}
          alt='Not Search'
          quality={75}
        />
        <p className='mt-3 text-[36px] font-medium'>
          Không tìm thấy kết quả tìm kiếm
        </p>
      </div>
    </div>
  )
}
