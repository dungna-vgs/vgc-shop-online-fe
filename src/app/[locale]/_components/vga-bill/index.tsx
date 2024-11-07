import CardNumber from '@/components/customize/number.card'
import PackageCard from '@/components/customize/package.card'
import { Card } from '@/components/ui/card'
import { useGlobalStore, useDiscountStore, useEmployeeStore } from '@/stores'
import {
  formatCurrency,
  getMembershipPackageName,
  calculateDiscountedPrice,
  calculateDiscountAmount
} from '@/utils'
import React from 'react'

export default function VGABill() {
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
              {vga ? 'Mua mã VGA' : 'Đóng phí hội viên'}
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
                  <PackageCard
                    memberships={[feePackage]}
                    showBuyButton={false}
                    cardClassName='w-[56px] h-[38px] rounded-[4px] overflow-hidden'
                    imgClassName='min-w-[unset] min-h-[unset]'
                    textClassName='!text-[4px]'
                  />

                  <div className='flex flex-1 justify-between items-center text-[16px]'>
                    <span>{getMembershipPackageName(feePackage)}</span>
                    <span>{formatCurrency(feePackage.amount)}đ</span>
                  </div>
                </div>
              ) : null}
              <div className='flex flex-col gap-2 my-2'>
                <span className='text-sm text-[#545454]'>Người nhận</span>
                <p className='font-bold text-[16px]'>
                  {buyer?.fullname} - <span>VGA{buyer?.id_display}</span>
                </p>
              </div>
              <div className='mt-6 flex flex-col gap-4 text-[16px]'>
                <div className='flex justify-between items-center'>
                  <span>Tổng cộng</span>
                  <span>{formatCurrency(money)}đ</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-[#545454]'>Giảm giá</span>
                  <span className='text-[#07AC39]'>
                    {' '}
                    <span className='font-semibold'>
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
                {employee && (
                  <div className='flex justify-between gap-2 items-center'>
                    <span className='text-[#545454]'>Mã nhân viên tư vấn</span>
                    <span>{`${employee.employee_code}-${employee.name}`}</span>
                  </div>
                )}
                <div className='flex justify-between items-center'>
                  <span>Thành tiền</span>
                  <span className='font-semibold'>
                    {discount
                      ? formatCurrency(
                          calculateDiscountedPrice(
                            money,
                            discount.discount,
                            discount.type
                          )
                        )
                      : formatCurrency(money)}
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
