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
import { useTranslation } from 'react-i18next'

type Props = {
  amount: number
}

export default function DummyInvoice({ amount }: Props) {
  const { t } = useTranslation('form')
  const [discountCode, setDiscountCode] = useState<string>('')
  const [employeeCode, setEmployeeCode] = useState<string>('')
  const { discount, setDiscount } = useDiscountStore()
  const { employee, setEmployee } = useEmployeeStore()
  const showToast = useToastStore((state) => state.showToast)

  const handleCheckDiscountCode = async () => {
    try {
      const res = await apiCheckDiscountCode({ voucher_code: discountCode })
      const { error_code } = res.data
      if (res.data.error_code === 200) {
        showToast(t('apply-success'), 'success', 2000)
        setDiscount(res.data.data)
      } else {
        const errorMessage =
          error_code === 401 ? t('again-later') : t('invalid-code')
        showToast(errorMessage, 'error', 2000)
        resetDiscount()
      }
    } catch (error) {
      showToast(t('error'), 'error', 2000)
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
        showToast(`t('consultant') ${res.data.data.name} `, 'success', 2000)
        setEmployee(res.data.data)
      } else {
        showToast(t('error-code'), 'error', 2000)
        resetEmployee()
      }
    } catch (error) {
      showToast(t('error'), 'error', 2000)
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
            <CardTitle>{t('estimated')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-2'>{t('discount-code')}</p>
            <div className='flex p-4 justify-between items-center rounded-[7px] border border-[#F1F1F1]'>
              <Input
                className='bg-white placeholder:text-[#979797] outline-none border-none'
                type='text'
                placeholder={t('fill-code')}
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button
                className='border border-[#17573C] bg-white text-black hover:text-white'
                type='submit'
                onClick={handleCheckDiscountCode}
                disabled={!discountCode.trim()}
              >
               {t('apply')}
              </Button>
            </div>
            <p className='mt-6 mb-2'>
              {t('staff-code')}
              <span className='text-red-600'> {t('not-required')}</span>
            </p>
            <div className='flex p-4 justify-between items-center rounded-[7px] border border-[#F1F1F1]'>
              <Input
                className='bg-white placeholder:text-[#979797] outline-none border-none'
                type='text'
                placeholder={t('fill-staff-code')}
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
              />
              <Button
                className='border border-[#17573C] bg-white text-black hover:text-white'
                type='submit'
                onClick={handleCheckEmpoyeeCode}
                disabled={!employeeCode.trim()}
              >
                {t('check-in')}
              </Button>
            </div>
            <div className='mt-6 flex flex-col gap-2 text-[16px]'>
              <div className='flex justify-between items-center'>
                <span className=' uppercase'>{t('total')}</span>
                <span>{formatCurrency(amount)}đ</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[#545454]'>{t('discount')}</span>
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
                  <span className='text-[#545454]'>{t('staff-code')}</span>
                  <span>{`${employee.employee_code}-${employee.name}`}</span>
                </div>
              )}
              <div className='flex justify-between items-center'>
                <span>{t('amount')}</span>
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
