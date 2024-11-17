import CardNumber from '@/components/customize/number.card'
import PackageCard from '@/components/customize/package.card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { TFeePackage, TGolfer, TVga } from '@/types/type'
import { formatCurrency, getMembershipPackageName } from '@/utils'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  golfer: TGolfer
  vga: TVga | null
  feePackage: TFeePackage | null
}

export default function RecipientCard({ golfer, vga, feePackage }: Props) {
  const { t } = useTranslation('form')
  return (
    <div className='flex flex-col gap-8'>
      <div className='pb-4'>
        <p className='text-[24px] mb-4 font-semibold'>{t('recipient')}</p>
        <div className='flex justify-start gap-4 items-center'>
          <Avatar className='bg-gray-400 w-[87px] h-[87px]'>
            <AvatarImage src={golfer.system_avatar_path} alt={golfer.id + ''} />
          </Avatar>
          <div>
            <span className='block mb-1 text-[16px] font-bold'>
              {golfer.fullname}
            </span>
            <span className='rounded-xl text-[10px] p-[6px] font-bold bg-gradient-to-r from-[#e8bb5b] to-[#e4d2ad] text-[#9D6129]'>
              VGA{golfer.id_display}
            </span>
          </div>
        </div>
      </div>

      {/* MÃ VGA  */}
      {!!vga && (
        <div>
          <p className='text-[24px] mb-4 font-semibold'>{t('vgacode')}</p>
          <div className='block sm:flex min-w-[246px]  gap-4 justify-between'>
            <CardNumber vga={vga} showBuyButton={false} />
            <div className='flex flex-1 justify-between gap-4 mt-4 md:mt-0  xl:justify-between items-center'>
              <span className='text-[16px] font-bold'>VGA{vga.id}</span>
              <span className='text-[20px]'>{formatCurrency(vga.amount)}đ</span>
            </div>
          </div>
        </div>
      )}
      {/* ĐÓNG PHÍ HỘI VIÊN */}
      {!!feePackage && (
        <div className=''>
          <p className='text-[24px] mb-4 font-semibold'>Gói hội viên</p>
          <div className='block sm:flex min-w-[246px]  gap-4 justify-between'>
            <div className='flex justify-center'>
              <PackageCard
                memberships={[feePackage]}
                showBuyButton={false}
                cardClassName='max-w-64 rounded-[20px] overflow-hidden'
                textClassName='!text-[2rem]'
              />
            </div>
            <div className='flex flex-1 justify-between gap-4 mt-4 md:mt-0 xl:justify-between items-center'>
              <span className='text-[16px] font-bold'>
                {getMembershipPackageName(feePackage)}
              </span>
              <span className='text-[20px]'>
                {formatCurrency(feePackage.amount)}đ
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
