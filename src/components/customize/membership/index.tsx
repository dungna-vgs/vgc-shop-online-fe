'use client'
import Image from 'next/image'
import styles from './style.module.css'
import { Button } from '@/components/ui/button'
import PackageCard from '@/components/customize/package.card'
import Link from 'next/link'
import { TFeePackage } from '@/types/type'
import { useGlobalStore } from '@/stores'
import { useTranslation } from 'react-i18next'


type TMemberShipProps = {
  memberships: TFeePackage[]
}
export default function MemberShip(props: TMemberShipProps) {
  const { t } = useTranslation('common')
  const { vgaSearchAll, feeSearchAll } = useGlobalStore()
  if (vgaSearchAll.length || feeSearchAll.length) return null
  return (
    <div className='mt-[10px]'>
      <div className='flex justify-between items-center pb-6'>
        <h3 className='text-xl font-semibold text-[#000]'>{t('cost')}</h3>
        <div className='flex justify-center items-center py-3'>
          <Link href='/package-price'>
            <Button className={styles.btnShowAll}>
              <span>{t('see-all')}</span>
              <Image
                src='/images/arrow-right.svg'
                width={16}
                height={16}
                alt='ArrowRight Icon'
                quality={75}
              />
            </Button>
          </Link>
        </div>
      </div>
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-8 mb-2 '>
        <PackageCard memberships={props.memberships} />
      </div>
    </div>
  )
}
