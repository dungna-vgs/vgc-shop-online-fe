import dynamic from 'next/dynamic'
const PackageCard = dynamic(
  () => import('@/components/customize/package.card'),
  { ssr: false }
)
import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'
import { getMembersipPackages } from '@/apis/business/membership.package'
import { apiAds } from '@/apis/internals/server/ads'
import Link from 'next/link'
import { getConfigs } from '@/apis/business/configs'
import { redirect } from 'next/navigation'
import TitlePackage from '@/components/customize/title.package'
import BenefitForm from '@/components/customize/benefit.form'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import clsx from 'clsx'
import TabsListMembership from '@/components/customize/tabs.membership'

export default async function MembershipFee() {
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
            <div>
              <Tabs defaultValue='account'>
                <div className='mb-6'>
                  <TabsListMembership />
                </div>
                <TabsContent value='all'>
                  <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-8 mb-2 '>
                    <PackageCard memberships={memberships} />
                  </div>
                </TabsContent>
                <TabsContent value='premium'>
                  <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-8 mb-2 '>
                    <PackageCard memberships={memberships} />
                  </div>
                </TabsContent>
                <TabsContent value='priority'>
                  <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-8 mb-2 '>
                    <PackageCard memberships={memberships} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:gap-8'>
            <PackageCard memberships={memberships} />
          </div>
        </div>
        {ads.adsMembershipCenter && (
          <Link href={ads.adsMembershipCenter.link}>
            <Image
              src={ads.adsMembershipCenter?.image}
              width={1121}
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
        <BenefitForm />
      </div>
    </div>
  )
}
