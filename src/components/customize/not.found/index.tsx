import Image from 'next/image'
import React from 'react'

export default function NotFound() {
  return (
    <div>
      <div className='w-full min-h-[100vh] py-6 lg:px-10 sm:px-6 px-4 flex flex-col gap-4 justify-center items-center'>
        <Image
          src='/images/404.jpg'
          width={585}
          height={249}
          alt='Not Found'
          quality={75}
        />
        <p className='text-[36px]'>Không tìm thấy trang!</p>
        <p>Tài nguyên yêu cầu không được tìm thấy trên máy chủ này!</p>
      </div>
    </div>
  )
}
