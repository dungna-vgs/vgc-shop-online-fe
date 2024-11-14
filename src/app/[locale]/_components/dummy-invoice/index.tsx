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
import React, { useState } from 'react'
import { useToastStore, useDiscountStore, useEmployeeStore } from '@/stores'
import { useTranslation } from 'react-i18next'

type Props = {
  amount: number
}

export default function DummyInvoice({ amount }: Props) {
  const { t } = useTranslation('form')
  const [discountCode, setDiscountCode] = useState<string>('')
  const { discount, setDiscount } = useDiscountStore()
  const { employee, setEmployeeCode } = useEmployeeStore()
  const showToast = useToastStore((state) => state.showToast)

  const handleCheckDiscountCode = async () => {
    if (discount) {
      resetDiscount()
      return
    }
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
                {t(`${discount ? 'delete' : 'apply'}`)}
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
                value={employee?.employee_code}
                onChange={(e) => setEmployeeCode(e.target.value)}
              />
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
