import { getConfigs } from '@/apis/business/configs'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Maintainance() {
  const configs = await getConfigs()
  if (configs.isMaintain) {
    return (
      <div className='flex justify-center items-center w-full h-screen flex-col'>
        <Image
          width={250}
          height={250}
          className='w-auto h-auto'
          src='/images/maintain.png'
          alt='Bảo trì'
          quality={60}
        />
        <h4 className='capitalize mt-5 text-center font-semibold text-2xl text-black'>
          Hệ thống đang bảo trì
        </h4>
        <p className='text-center max-w-[500px] mt-2 font-light text-base'>
          Các kỹ sư của chúng tôi đang thực hiện lịch bảo trì hệ thống, vui lòng
          truy cập lại sau. Xin lỗi về sự bất tiện này!
        </p>
      </div>
    )
  } else {
    redirect('/')
  }
}
