import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './style.module.css'


export default async function NotFound() {
  return (
    <div className='w-full min-h-[100vh] py-6 lg:px-10 sm:px-6 px-4 flex flex-col gap-4 justify-center items-center'>
      <Image
        src='/images/404.jpg'
        width={585}
        height={249}
        alt='Not Found'
        quality={60}
      />
      <p className='text-center text-[24px] lg:text-[36px]'>Không tìm thấy trang!</p>
      <p className='text-center lg:text-[18px] text-[14px]'>Tài nguyên yêu cầu không được tìm thấy trên máy chủ này!</p>
      <Link
        href='/'
        className={styles.btnBuy}
      >
        Quay về trang chủ
      </Link>
    </div>
  )
}
