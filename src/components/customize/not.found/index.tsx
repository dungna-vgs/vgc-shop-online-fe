import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function NotFound() {
  return (
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
      <Link
        href='/'
        className='p-2 mt-2 bg-[#024542b9] font-bold text-white rounded-md'
      >
        Quay về trang chủ
      </Link>
    </div>
  )
}
