import Countdown from '@/components/customize/timer'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Loading from '@/components/ui/loading'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'
import Link from 'next/link'
import React from 'react'

export default function SuccessAlert() {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className='text-white bg-gradient-to-r leading-[64px] outline-none from-[#17573C] to-[#4AC486]  rounded-[6px] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'>
          Đã thanh toán
        </AlertDialogTrigger>
        <AlertDialogContent className='mt-[84px]'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center uppercase'>
              Đang trong quá trình giao dịch
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center'>
              Vui lòng không thoát khỏi màn hình và đợi trong giây lát
            </AlertDialogDescription>
            <div className='flex justify-center flex-col items-center gap-4'>
              <Loading />
              <p className='block font-bold text-[20px] text-[#17573C]'>
                <Countdown />
              </p>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            {/* SHOW PAGE CHECK  */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='outline'>Đã hoàn thành</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='text-black mt-[84px]'>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-center uppercase'>
                    Kiểm tra thất bại
                  </AlertDialogTitle>
                  <p className='block w-full text-center font-bold text-[20px] text-[#17573C]'>
                    00:00
                  </p>
                </AlertDialogHeader>
                <ul className='text-center list-disc list-inside'>
                  Trạng thái giao dịch không thành công!
                  <li>Vui lòng kiểm tra lại nội dung chuyển khoản.</li>
                  <li>
                    Hoặc liên hệ CSKH qua hotline
                    <span className='text-[#17573C]'>0899.955.599</span> để được
                    hỗ trợ.
                  </li>
                </ul>
                <div className='flex justify-center'>
                  <Link href='/'>
                    <Button className='text-white hover:text-white flex justify-center bg-gradient-to-r outline-none from-[#17573C] to-[#4AC486]  rounded-[6px] w-40 h-16 md:w-[250px] text-[16px]'>
                      Thử lại
                    </Button>
                  </Link>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
