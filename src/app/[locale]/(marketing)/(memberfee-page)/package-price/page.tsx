import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'
import { TFeePackage } from '@/types/type'
import { getMembersipPackages } from '@/apis/business/membership.package'
import { apiAds } from '@/apis/internals/server/ads'
import Link from 'next/link'
import { getConfigs } from '@/apis/business/configs'
import { redirect } from 'next/navigation'
import TitlePackage from '@/components/customize/title.package'
import clsx from 'clsx'
import MembershipComponent from './membership'

type TMemberShipProps = {
  memberships: TFeePackage[]
}

export default async function MembershipFee(props: TMemberShipProps) {
  const configs = await getConfigs()
  if (configs.isMaintain) {
    return redirect('/maintainance')
  }
  const [memberships, ads] = await Promise.all([
    getMembersipPackages(),
    apiAds()
  ])
  return (
    <div className={styles.containerBg}>
      <div className='mt-[84px] max-w-[1200px] mx-auto min-h-[100vh] py-6  px-4'>
        <div>
          <div className='flex justify-between items-center pb-4'>
            <TitlePackage />
          </div>
          <div className={clsx(styles.customizeCard)}>
            <MembershipComponent
              memberships={props.memberships || memberships}
            />
          </div>
        </div>
        {ads.adsMembershipCenter && (
          <Link href={ads.adsMembershipCenter.link}>
            <Image
              src={ads.adsMembershipCenter?.image}
              width={1120}
              height={148}
              alt='Banner'
              quality={60}
              style={{
                width: '100%',
                height: 'auto'
              }}
              className='w-full min-h-[148px] py-10'
            />
          </Link>
        )}
      </div>
    </div>
  )
}
