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
import {
  apiCheckDiscountCode,
  TParamsCheckDiscountCode
} from '@/apis/internals/clients/check.discount'
import React, { useEffect, useState } from 'react'
import {
  useGlobalStore,
  useToastStore,
  useDiscountStore,
  useEmployeeStore
} from '@/stores'
import { useTranslation } from 'react-i18next'
import { ETransactionProvider } from '@/types/transaction-provider'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

type Props = {
  amount: number
  promotion: number
  vgacode?: string
  packageId?: string
}

export default function DummyInvoice({
  amount,
  promotion,
  vgacode,
  packageId
}: Props) {
  const { t } = useTranslation('form')
  const [discountCode, setDiscountCode] = useState<string>('')
  const { discount, setDiscount } = useDiscountStore()
  const { employee, setEmployeeCode } = useEmployeeStore()
  const { buyer, vga, feePackage } = useGlobalStore()
  const showToast = useToastStore((state) => state.showToast)
  const searchParams = useSearchParams()

  useEffect(() => {
    let code = searchParams.get('employee_code')
    if (code) {
      sessionStorage.setItem('employee_code', code)
      setEmployeeCode(code)
    } else {
      code = sessionStorage.getItem('employee_code')
      if (code) {
        setEmployeeCode(code)
      }
    }
  }, [searchParams, setEmployeeCode])

  useEffect(() => {
    if (discount === undefined) {
      setDiscountCode('')
    }
  }, [discount])
  const handleCheckDiscountCode = async () => {
    if (discount) {
      resetDiscount()
      return
    }
    try {
      let bodyRequest: TParamsCheckDiscountCode = {
        voucher_code: discountCode,
        provider: ETransactionProvider.DIGITAL,
        from: 'store',
        user_id: buyer?.id
      }
      if (vgacode && vga) {
        bodyRequest = {
          ...bodyRequest,
          number: vga.id
        }
      }

      if (packageId && feePackage) {
        bodyRequest = {
          ...bodyRequest,
          provider: ETransactionProvider.UPGRADE_ACCOUNT,
          upgrade_id: feePackage.id
        }
      }
      const res = await apiCheckDiscountCode(bodyRequest)
      const { error_code } = res.data
      if (res.data.error_code === axios.HttpStatusCode.Ok) {
        showToast(t('apply-success'), 'success', 2000)
        setDiscount(res.data.data)
      } else {
        const errorMessage =
          error_code === axios.HttpStatusCode.Unauthorized
            ? t('again-later')
            : error_code === axios.HttpStatusCode.UnprocessableEntity
              ? t('invalid-type')
              : t('invalid-code')
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
            <p className='my-2'>
              {t('discount-code')}
              <span className='text-red-600'> {t('not-required')}</span>
            </p>
            <div className='flex p-4 justify-between items-center rounded-[7px] border border-[#F1F1F1]'>
              <Input
                className='bg-white placeholder:text-[#979797] outline-none border-none'
                type='text'
                placeholder={t('fill-code')}
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />

              <Button
                className='border bg-gradient-to-r from-[#17573C] to-[#4AC486]  text-white hover:text-white'
                type='submit'
                onClick={handleCheckDiscountCode}
                disabled={!discountCode.trim()}
              >
                {t(discount ? 'delete' : 'apply')}
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
            <div className='mt-6 flex flex-col gap-4 text-[16px]'>
              <div className='flex justify-between items-center'>
                <span className='my-1 uppercase'>{t('total')}</span>
                <span>{formatCurrency(amount)}đ</span>
              </div>

              {discount ? (
                <div>
                  <div className='flex justify-between items-center'>
                    <span className='text-[#545454]'>{t('discount')}</span>
                    <span className='text-[#07AC39] font-semibold'>
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
                  {discount.membership_months != 0 && (
                    <div className='flex justify-between items-center mt-4'>
                      <span className='text-[#545454]'>
                        {t('membership-fee-gift')}
                      </span>
                      <span className='text-[#07AC39] font-semibold'>
                        {discount.membership_months}{' '}
                        {discount.membership_months == 1
                          ? t('month')
                          : t('months')}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className='flex justify-between items-center'>
                  <span className=''>{t('promotion')}</span>
                  <span className='text-[#07AC39] font-semibold'>
                    -{formatCurrency(promotion)}đ
                  </span>
                </div>
              )}

              <div className='flex justify-between items-center'>
                <span>{t('amount')}</span>
                <span className='text-[#F7941D] font-semibold'>
                  {discount
                    ? formatCurrency(
                        calculateDiscountedPrice(
                          amount,
                          discount.discount || promotion,
                          discount.type
                        )
                      )
                    : formatCurrency(amount - promotion)}
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
