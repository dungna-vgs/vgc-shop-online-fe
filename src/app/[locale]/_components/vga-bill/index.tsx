import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

export default function VGABill() {
  return (
    <div>
      <div className='px-0 lg:px-6 py-4'>
        <Card className='text-black'>
          <div className='py-6 px-3 lg:px-8'>
            <p className='text-[20px] mb-6'>Mua mã VGA</p>
            <div>
              <div className='flex p-4 gap-4 items-center rounded-[7px] border border-[#F1F1F1] bg-[#F6F6F6]'>
                <Image
                  src='/images/Card vHandicap 1.jpg'
                  width={56}
                  height={37}
                  alt='Card'
                  quality={75}
                />

                <div className='flex flex-1 justify-between items-center text-[16px]'>
                  <span>VGA999999</span>
                  <span>15.000.000đ</span>
                </div>
              </div>
              <div className='flex flex-col gap-2 my-2'>
                <span className='text-sm text-[#545454]'>Người nhận</span>
                <p className='font-bold text-[16px]'>
                  Nguyễn Lan Anh - <span>VGA686868</span>
                </p>
              </div>
              <div className='mt-6 flex flex-col gap-4 text-[16px]'>
                <div className='flex justify-between items-center'>
                  <span>Tổng cộng</span>
                  <span>15.000.000đ</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-[#545454]'>Giảm giá</span>
                  <span className='text-[#07AC39]'>0đ</span>
                </div>
                <div className='flex justify-between gap-2 items-center'>
                  <span className='text-[#545454]'>Mã nhân viên tư vấn</span>
                  <span>
                    123465 - <span>Nguyễn Văn A</span>
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span>Thành tiền</span>
                  <span className='font-semibold'>15.000.000đ</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
