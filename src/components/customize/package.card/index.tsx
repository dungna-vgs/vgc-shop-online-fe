import React from 'react'
// import { Button } from '@/components/ui/button'
// import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import styles from './style.module.css'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TFeePackage } from '@/types/type'
import { getMembershipPackageName } from '@/utils'
import clsx from 'clsx'

type TPackageCardProps = {
  memberships: TFeePackage[]
  showBuyButton?: boolean
  cardClassName?: string
  imgClassName?: string
  textClassName?: string
}

export default function PackageCard({
  memberships,
  showBuyButton = true,
  cardClassName = '',
  imgClassName = '',
  textClassName = ''
}: TPackageCardProps) {
  return memberships?.map((membership: TFeePackage, index: number) => (
    <div key={index}>
      <div className={clsx(styles.listCard, cardClassName)}>
        <div className=''>
          <Image
            src='/images/bg-fee.jpg'
            width={352}
            height={233}
            alt='Background PackageCard'
            quality={75}
            style={{
              width: '100%',
              height: 'auto'
            }}
            className={clsx('min-w-[148px] min-h-[166px]', imgClassName)}
          />
        </div>
        <div className='absolute top-0 right-0 left-0 bottom-0 p-3 sm:p-4  flex justify-items-start  items-center'>
          <span className={clsx(styles.titleCard, textClassName)}>
            {getMembershipPackageName(membership)}
          </span>
        </div>
      </div>
      {showBuyButton && (
        <div className=' bg-white shadow-lg rounded-b-2xl flex justify-center items-center py-3 max-w-full'>
          <Link
            href={`/buy-package?membershipId=${membership.id}`}
            className={styles.btnBuy}
          >
            <span>Đóng phí ngay</span>
            <ArrowRight />
          </Link>
        </div>
      )}
    </div>
  ))
}
