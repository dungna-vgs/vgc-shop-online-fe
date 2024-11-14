import OfferCard from '@/components/customize/offer'
import { apiAds } from '@/apis/internals/server/ads'
import BannerImage from '@/components/customize/banner'
import MemberShip from '@/components/customize/membership'
import getSignificances from '@/apis/internals/significances'
import SerialNumber from '@/components/customize/serial.number'
import BannerCarousel from '@/app/[locale]/_components/banner.carousel'
import { getConfigs } from '@/apis/business/configs'
import { redirect } from 'next/navigation'
import { apiPromotion } from '@/apis/business/promotion.program'
import { getMembersipPackages } from '@/apis/business/membership.package'
import { getVGAs } from '@/apis/business/vga'
import ResultSearchAll from '@/components/customize/result.search.all'
import styles from './page.module.css'

export const runtime = 'edge'

export default async function Home() {
  const { isMaintain, showSpecialDiscount } = await getConfigs()
  if (isMaintain) {
    redirect('/maintainance')
  }
  const [data, images, memberships, vgas, promotions] = await Promise.all([
    getSignificances(),
    apiAds(),
    getMembersipPackages(),
    getVGAs(),
    showSpecialDiscount && apiPromotion()
  ])

  return (
    <div className={styles.containerBg}>
      <ResultSearchAll />
      <BannerCarousel sliders={images.sliders} />
      <div className='max-w-[1200px] mx-auto md:p-6 p-4'>
        {!!showSpecialDiscount && <OfferCard promotions={promotions} />}
        <SerialNumber infoVGA={vgas} typeVga={data} />
        <BannerImage banner={images.adsHomeCenter} />
        <MemberShip memberships={memberships.filter((m) => m.year_add <= 3)} />
      </div>
    </div>
  )
}
