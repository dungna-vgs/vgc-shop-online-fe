import CardNumber from '@/components/customize/number.card'

import { Card } from '@/components/ui/card'
import { useGlobalStore, useDiscountStore, useEmployeeStore } from '@/stores'
import { useTranslation } from 'react-i18next'
import {
  formatCurrency,
  getMembershipPackageName,
  calculateDiscountedPrice,
  calculateDiscountAmount
} from '@/utils'
import React from 'react'
import Image from 'next/image'
import styles from './style.module.css'
import clsx from 'clsx'

type TVGABill = {
  promotion: number
}

export default function VGABill({ promotion }: TVGABill) {
  const { t } = useTranslation('form')
  const { buyer, vga, feePackage } = useGlobalStore()
  const { discount } = useDiscountStore()
  const { employee } = useEmployeeStore()

  if (!buyer || (!vga && !feePackage)) return null

  const money = vga?.amount || feePackage?.amount || 0
  return (
    <div>
      <div className='px-0 lg:px-6 py-4'>
        <Card className='text-black'>
          <div className='py-6 px-3 lg:px-8'>
            <p className='text-[20px] mb-6'>
              {vga ? t('buy-vga') : t('buy-package')}
            </p>
            <div>
              {!!vga ? (
                <div className='flex justify-between px-3 rounded-[7px] border border-[#F1F1F1] bg-[#F6F6F6] font-semibold text-[16px] h-[90px]'>
                  <div className='flex items-center'>
                    <div className='m-[-60px]'>
                      <CardNumber
                        vga={vga}
                        showBuyButton={false}
                        className='transform scale-[0.4]'
                      />
                    </div>
                    <p>VGA{vga.id}</p>
                  </div>
                  <div className='flex items-center'>
                    <p>{formatCurrency(vga.amount)}đ</p>
                  </div>
                </div>
              ) : !!feePackage ? (
                <div className='flex p-4 gap-4 items-center rounded-[7px] border border-[#F1F1F1] bg-[#F6F6F6]'>
                  <div className='relative'>
                    <Image
                      src='/images/bg-fee.png'
                      width={80}
                      height={50}
                      alt='Background PackageCard'
                      quality={60}
                    />
                    <div className='absolute top-0 right-0 left-0 bottom-0 w-full h-full flex justify-center items-center'>
                      <span
                        className={clsx(
                          'text-white font-bold uppercase text-xs mb-3 block',
                          styles.title
                        )}
                      >
                        {feePackage.sub_name}
                      </span>
                    </div>
                  </div>

                  <div className='flex flex-1 justify-between items-center text-[16px]'>
                    <span>{getMembershipPackageName(feePackage)}</span>
                    <span>{formatCurrency(feePackage.amount)}đ</span>
                  </div>
                </div>
              ) : null}

              {employee?.id && (
                <div className='flex flex-col gap-2 my-2'>
                  <span className='text-sm text-[#545454]'>
                    {t('recipient')}
                  </span>
                  <p className='font-bold text-[16px]'>
                    {buyer?.fullname} - <span>VGA{buyer?.id_display}</span>
                  </p>
                </div>
              )}
              <div className='mt-6 flex flex-col gap-4 text-[16px]'>
                <div className='flex justify-between gap-2 items-center'>
                  <span>{t('total')}</span>
                  <span className='font-semibold'>
                    {formatCurrency(money)}đ
                  </span>
                </div>
                {discount ? (
                  <div>
                    <div className='flex justify-between gap-2 items-center'>
                      <span className='text-[#545454]'>{t('discount')}</span>
                      <span className='text-[#07AC39]'>
                        {' '}
                        <span className=''>
                          {discount
                            ? formatCurrency(
                                calculateDiscountAmount(
                                  money,
                                  discount.discount,
                                  discount.type
                                )
                              )
                            : 0}
                          đ
                        </span>
                      </span>
                    </div>
                    {discount.membership_months != 0 && (
                      <div className='flex justify-between items-center mt-4'>
                        <span className='text-[#545454]'>
                          {t('membership-fee-gift')}
                        </span>
                        <span className='text-[#07AC39] font-semibold'>
                          {discount.membership_months} {t('months')}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='flex justify-between gap-2 items-center'>
                    <span className='text-[#545454]'>{t('promotion')}</span>
                    <span className='text-[#07AC39] font-semibold'>
                      -{formatCurrency(promotion)}đ
                    </span>
                  </div>
                )}

                {employee?.employee_code && employee?.name && (
                  <div className='flex justify-between gap-2 items-center'>
                    <span className='text-[#545454]'>{t('staff-code')}</span>
                    <span>
                      {employee.employee_code}-{employee.name}
                    </span>
                  </div>
                )}
                <div className='flex justify-between gap-2 items-center'>
                  <span className='text-black'>{t('amount')}</span>
                  <span className='text-[#F7941D] font-semibold'>
                    {discount
                      ? formatCurrency(
                          calculateDiscountedPrice(
                            money,
                            discount.discount,
                            discount.type
                          )
                        )
                      : formatCurrency(money - promotion)}
                    đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
