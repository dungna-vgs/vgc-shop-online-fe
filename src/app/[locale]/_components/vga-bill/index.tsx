import CardNumber from '@/components/customize/number.card'
import PackageCard from '@/components/customize/package.card'
import { Card } from '@/components/ui/card'
import { useGlobalStore } from '@/stores'
import { formatCurrency, getMembershipPackageName } from '@/utils'
import React from 'react'

export default function VGABill() {
  const { buyer, vga, feePackage } = useGlobalStore()

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
              {!!vga && (
                <div className='flex p-4 gap-4 items-center rounded-[7px] border border-[#F1F1F1] bg-[#F6F6F6]'>
                  <CardNumber vga={vga} showBuyButton={false} />

                  <div className='flex flex-1 justify-between items-center text-[16px]'>
                    <span>VGA{vga.id}</span>
                    <span>{formatCurrency(vga.amount)}đ</span>
                  </div>
                </div>
              )}
              {!!feePackage && (
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
              )}
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
                  <span className='font-semibold'>
                    {formatCurrency(money)}đ
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
