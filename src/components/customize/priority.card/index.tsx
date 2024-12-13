'use client'
import React from 'react'
import Image from 'next/image'
import styles from './style.module.css'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TFeePackage } from '@/types/type'
import { formatCurrency, getMembershipPackageName } from '@/utils'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { event } from '@/lib/gtag'

type TPackageCardProps = {
  memberships: TFeePackage[]
  showBuyButton?: boolean
  cardClassName?: string
  imgClassName?: string
  textClassName?: string
}

export default function PriorityCard({
  memberships,
  showBuyButton = true,
  cardClassName = '',
  imgClassName = '',
  textClassName = ''
}: TPackageCardProps) {
  const { t } = useTranslation('common')
  const handleClickBuyButton = (feePackage: TFeePackage) => {
    event('select_membership', {
      event_category: 'Membership',
      event_label: `Package: ${feePackage.sub_name}`
    })
  }
  return memberships?.map((membership: TFeePackage, index: number) => (
    <div key={index}>
      <div className={clsx(styles.listCard, cardClassName)}>
        <div className='relative overflow-hidden '>
          <Image
            src='/images/prio.png'
            width={352}
            height={233}
            alt='Background PriorityCard'
            quality={60}
            style={{
              width: '100%',
              height: 'auto',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px'
            }}
            className={clsx('min-w-[148px] min-h-[166px]', imgClassName)}
          />
          <div className='absolute right-0 top-0 rounded-xl'>
            <Image
              src='/images/pngimg.svg'
              width={117}
              height={117}
              alt='Icon Priotity'
              quality={60}
              className='rounded-[16px] bg-transparent'
            />
          </div>
        </div>
        <div className='absolute bg-transparent top-0 right-0 left-0 bottom-0 p-3 sm:p-4 flex justify-center items-center overflow-hidden rounded-[16px]'>
          <span className={clsx(styles.titleCard, textClassName)}>
            {getMembershipPackageName(membership)}
          </span>
        </div>
        <div className='absolute text-[16px]  right-0 left-0 bottom-0 p-3 sm:p-4  flex justify-center flex-col gap-2  items-center'>
          <span className={clsx(styles.packageCard)}>
            {t('year-prio', { year: membership.year_add })}
          </span>
          <Image
            src='/images/prio.svg'
            width={38}
            height={29}
            alt='Icon Priotity'
            quality={60}
          />
        </div>
      </div>
      {showBuyButton && (
        <div className=' bg-white shadow-lg rounded-b-2xl flex flex-col gap-2 justify-center items-center py-3 max-w-full'>
          <span className='flex justify-center font-semibold text-[16px] text-[#F7941B] lg:justify-start w-full px-4'>
            {t('price', { price: formatCurrency(membership.amount) })}
          </span>
          <div className='flex justify-center lg:justify-start w-full px-4 gap-2 items-center'>
            <span
              className={clsx(
                'block font-medium  text-[#CED6D2] line-through  text-[12px]',
                {
                  invisible: membership.original_amount === membership.amount
                }
              )}
            >
              {membership.original_amount
                ? formatCurrency(membership.original_amount)
                : null}
            </span>
            <span
              className={clsx('font-medium text-[#FF0303]  text-[12px]', {
                invisible: !membership.savings_percentage
              })}
            >
              {membership.savings_percentage}%
            </span>
          </div>
          <Link
            href={`/buy-package/${membership.id}`}
            onClick={() => handleClickBuyButton(membership)}
            className={styles.btnBuy}
          >
            <span>{t('pay-now')}</span>
            <ArrowRight />
          </Link>
        </div>
      )}
    </div>
  ))
}
