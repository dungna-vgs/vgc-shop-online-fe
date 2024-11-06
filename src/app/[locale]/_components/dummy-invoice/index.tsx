import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/utils'
import React from 'react'

type Props = {
  amount: number
}

export default function DummyInvoice({ amount }: Props) {
  return (
    <div>
      <Card className='text-black'>
        <div className='py-6 px-4 lg:px-8'>
          <CardHeader>
            <CardTitle>Số tiền thanh toán tạm tính</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-2'>Mã giảm giá</p>
            <div className='flex p-4 justify-between items-center rounded-[7px] border border-[#F1F1F1]'>
              <Input
                className='bg-white placeholder:text-[#979797] outline-none border-none'
                type='text'
                placeholder='Nhập mã giảm giá (nếu có)'
              />
              <Button
                className='border border-[#17573C] bg-white text-black hover:text-white'
                type='submit'
              >
                Kiểm tra
              </Button>
            </div>
            <p className='mt-6 mb-2'>
              Mã nhân viên tư vấn
              <span className='text-red-600'> (không bắt buộc)</span>
            </p>
            <div className='flex p-4 justify-between items-center rounded-[7px] border border-[#F1F1F1]'>
              <Input
                className='bg-white placeholder:text-[#979797] outline-none border-none'
                type='text'
                placeholder='Nhập mã nhân viên tư vấn'
              />
              <Button
                className='border border-[#17573C] bg-white text-black hover:text-white'
                type='submit'
              >
                Kiểm tra
              </Button>
            </div>
            <div className='mt-6 flex flex-col gap-2 text-[16px]'>
              <div className='flex justify-between items-center'>
                <span className=' uppercase'>Tổng cộng</span>
                <span>{formatCurrency(amount)}đ</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[#545454]'>Giảm giá</span>
                <span className='text-[#07AC39]'>0đ</span>
              </div>
              <div className='flex justify-between items-center'>
                <span>Thành tiền</span>
                <span className='font-semibold'>{formatCurrency(amount)}đ</span>
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </div>
      </Card>
    </div>
  )
}
