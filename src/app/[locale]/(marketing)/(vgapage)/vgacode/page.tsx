import React from 'react'
import Image from 'next/image'
import SearchVGACode from '@/components/customize/search.vgacode'
import { getConfigs } from '@/apis/business/configs'
import { apiAds } from '@/apis/internals/server/ads'
import { redirect } from 'next/navigation'
import { getVGAs } from '@/apis/business/vga'
import type { TQueryParamsVGA } from '@/apis/business/vga'
import getSignificances from '@/apis/internals/significances'
import FilterType from '@/components/customize/filter.type'
import FilterPrice from '@/components/customize/filter.price'
import ListVGAs from '@/components/customize/list.vgas'
import PriceVGACode from '@/components/customize/price.vgacode'
import styles from './style.module.css'
import TitleVGA from '@/components/customize/title.vga'
type TVGAPageProps = {
  searchParams: TQueryParamsVGA
  params: {
    locale: string
  }
}

export default async function VGAPage(props: TVGAPageProps) {
  const configs = await getConfigs()
  if (configs.isMaintain) {
    return redirect('/maintainance')
  }
  const [ads, vgas, significances] = await Promise.all([
    apiAds(),
    getVGAs({
      ...props.searchParams,
      limit: props.searchParams.limit || 15,
      page: props.searchParams.page || 1
    }),
    getSignificances()
  ])

  return (
    <div className={styles.containerBg}>
      <div className='mt-[84px]  max-w-[1200px] mx-auto min-h-[100vh]  py-6 px-4'>
        <div className='grid grid-cols-4 gap-8'>
          <div className='col-span-1 flex flex-col gap-6'>
            <div className='hidden lg:block'>
              <FilterPrice />
              <FilterType significances={significances} />
              {ads.adsVGaLeft && (
                <Image
                  src={ads.adsVGaLeft.image}
                  width={256}
                  height={510}
                  alt={ads.adsVGaLeft.title}
                  quality={80}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover'
                  }}
                />
              )}
            </div>
          </div>
          <div className='col-span-4 lg:col-span-3'>
            <div className='block md:flex justify-between gap-4'>
              <TitleVGA />
              <div className='block md:flex justify-between items-center gap-4'>
                <SearchVGACode />
                <PriceVGACode significances={significances} />
              </div>
            </div>
            <ListVGAs
              vgas={vgas.data}
              pagination={{
                from: vgas.from,
                total: vgas.total,
                last_page: vgas.last_page,
                per_page: vgas.per_page
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
