import React from 'react'
// import { Button } from '@/components/ui/button'
// import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import styles from './style.module.css'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TFeePackage } from '@/types/type'

type TPackageCardProps = {
  memberships: TFeePackage[]
}

export default function PackageCard(props: TPackageCardProps) {
  return props.memberships?.map((membership: TFeePackage, index: number) => (
    <div key={index}>
      <div className={styles.listCard}>
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
            className='min-w-[148px] min-h-[166px]'
          />
        </div>
        <div className='absolute top-0 right-0 left-0 bottom-0 p-3 sm:p-4  flex justify-items-start  items-center'>
          <span className={styles.titleCard}>{membership.sub_name}</span>
        </div>
      </div>
      <div className=' bg-white shadow-lg rounded-b-2xl flex justify-center items-center py-3 max-w-full'>
        <Link
          href={`/buy-package?membershipId=${membership.id}`}
          className={styles.btnBuy}
        >
          <span>Đóng phí ngay</span>
          <ArrowRight />
        </Link>
      </div>
    </div>
  ))
}
