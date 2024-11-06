import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  formatCurrency,
  calculateDiscountAmount,
  calculateDiscountedPrice
} from '@/utils'
import { apiCheckDiscountCode } from '@/apis/internals/clients/check.discount'
import { apiCheckEmployeeCode } from '@/apis/internals/clients/check.employee'
import React, { useState } from 'react'
import { useToastStore, useDiscountStore, useEmployeeStore } from '@/stores'

type Props = {
  amount: number
}

export default function DummyInvoice({ amount }: Props) {
  const [discountCode, setDiscountCode] = useState<string>('')
  const [employeeCode, setEmployeeCode] = useState<string>('')
  const { discount, setDiscount } = useDiscountStore()
  const { employee, setEmployee } = useEmployeeStore()
  const showToast = useToastStore((state) => state.showToast)

  const handleCheckDiscountCode = async () => {
    try {
      const res = await apiCheckDiscountCode({ voucher_code: discountCode })
      const { error_code, data } = res.data
      if (res.data.error_code === 200) {
        showToast('Áp dụng mã thành công', 'success', 2000)
        setDiscount(res.data.data)
      } else {
        const errorMessage =
          error_code === 401 ? 'Vui lòng thử lại sau' : 'Mã không hợp lệ'
        showToast(errorMessage, 'error', 2000)
        resetDiscount()
      }
    } catch (error) {
      showToast('Đã xảy ra lỗi, vui lòng thử lại sau', 'error', 2000)
      resetDiscount()
    }
  }
  const resetDiscount = () => {
    setDiscountCode('')
    setDiscount(undefined)
  }
  const handleCheckEmpoyeeCode = async () => {
    try {
      const res = await apiCheckEmployeeCode({ employee_code: employeeCode })
      if (res.data.error_code === 200) {
        setEmployee(res.data.data)
        showToast(`Nhân viên tư vấn ${res.data.data.name} `, 'success', 2000)
        setEmployee(res.data.data)
      } else {
        showToast('Mã nhân viên tư vấn không hợp lệ', 'error', 2000)
        resetEmployee()
      }
    } catch (error) {
      showToast('Đã xảy ra lỗi, vui lòng thử lại sau', 'error', 2000)
      resetEmployee()
    }
  }
  const resetEmployee = () => {
    setEmployeeCode('')
    setEmployee(undefined)
  }
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
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button
                className='border border-[#17573C] bg-white text-black hover:text-white'
                type='submit'
                onClick={handleCheckDiscountCode}
                disabled={!discountCode.trim()}
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
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
              />
              <Button
                className='border border-[#17573C] bg-white text-black hover:text-white'
                type='submit'
                onClick={handleCheckEmpoyeeCode}
                disabled={!employeeCode.trim()}
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
                <span className='text-[#07AC39]'>
                  {formatCurrency(
                    calculateDiscountAmount(
                      amount,
                      discount?.discount || 0,
                      discount?.type || ''
                    )
                  )}
                  đ
                </span>
              </div>
              {employee && (
                <div className='flex justify-between items-center'>
                  <span className='text-[#545454]'>Mã nhân viên tư vấn:</span>
                  <span>{`${employee.employee_code}-${employee.name}`}</span>
                </div>
              )}
              <div className='flex justify-between items-center'>
                <span>Thành tiền</span>
                <span className='font-semibold'>
                  {discount
                    ? formatCurrency(
                        calculateDiscountedPrice(
                          amount,
                          discount.discount,
                          discount.type
                        )
                      )
                    : formatCurrency(amount)}
                  đ
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </div>
      </Card>
    </div>
  )
}
