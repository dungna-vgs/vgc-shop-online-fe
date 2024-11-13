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
import TranslationsProvider from '@/components/customize/languages/TranslationsProvider'
import initTranslations from '@/app/i18n'
import TitlePackage from '@/components/customize/title.package'
import BenefitForm from '@/components/customize/benefit.form'


const i18nNamespaces = ['home', 'common', 'footer', 'form', 'filter-menu','package-price']
type TMemmbershipFee = {
  params: { locale: string }
}
export default async function MembershipFee(props:TMemmbershipFee) {

  const configs = await getConfigs()
  if (configs.isMaintain) {
    return redirect('/maintainance')
  }
  const { locale } = props.params
  const [{ resources }, memberships, ads] = await Promise.all([
    initTranslations(locale, i18nNamespaces),
    getMembersipPackages(),
    apiAds()
  ])
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className={styles.containerBg}>
        <div className='mt-[84px] max-w-[1200px] mx-auto min-h-[100vh] py-6  px-4'>
          <div>
           <TitlePackage/>
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
                quality={75}
                style={{
                  width: '100%',
                  height: 'auto'
                }}
                className='w-full min-h-[148px] py-10'
              />
            </Link>
          )}
         <BenefitForm/>
        </div>
      </div>
    </TranslationsProvider>

  )
}
