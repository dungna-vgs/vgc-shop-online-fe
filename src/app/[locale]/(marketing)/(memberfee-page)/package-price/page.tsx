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
          <div className='flex justify-between items-center pb-6'>
            <h3 className='text-xl font-semibold text-[#000]'>PHÍ HỘI VIÊN</h3>
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
              quality={75}
              style={{
                width: '100%',
                height: 'auto'
              }}
              className='w-full min-h-[148px] py-10'
            />
          </Link>
        )}
        <div className='bg-[#EDFFF6] p-3'>
          <p className='text-center font-bold py-6 uppercaser text-[24px]'>
            QUYỀN LỢI VÀ DỊCH VỤ CỦA HỘI VIÊN
          </p>
          <div>
            <ul>
              <li className='bg-[#16533D] w-full h-[54px] rounded-t-md '></li>
              <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
              <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
              <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
              <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
              <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
              <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
              <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
              <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
              <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
              <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
              <li className='bg-white w-full h-[54px] border-b border-[#d5ddda]'></li>
            </ul>
          </div>
          <ul className='list-inside list-disc text-black my-4'>
            Lưu ý:
            <li className='ml-4'>Hotline hỗ trợ, Zalo, Viber: 0961625499</li>
            <li className='ml-4'>Tổng đài CSKH vHandicap: 0899955599</li>
            <li className='ml-4'>
              Biểu phí nêu trên áp dụng cho 365 ngày kể từ ngày đóng phí
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
