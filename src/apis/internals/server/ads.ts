// https://business.dev.vgcorp.vn/api/v1/other/ecommerce-banners-by-partner?mobile=1

import { createAxiosInstanceServer } from '@/apis'
import { API_ENDPOINT } from '@/configs'
import { TAds } from '@/types/type'
import { isMobile, getStoreDomain } from '@/utils/server'
import { PosAds } from '@/types/type'

type TAdsResponse = {
  data: TAds[]
  error_code: number
  message: string
}

export const apiAds = async () => {
  const [origin] = getStoreDomain()
  if (origin) {
    const axiosInstance = createAxiosInstanceServer(origin)
    const res = await axiosInstance.get<TAdsResponse>(
      API_ENDPOINT.ECOMMERCE_BANNERS_BY_PARTNER,
      {
        params: { mobile: isMobile() }
      }
    )
    const sliders = res.data.data
      .filter((images) => images.position == PosAds.HOME_SLIDER)
      .sort((a, b) => a.sort_order - b.sort_order)

    const adsHomeCenter = res.data.data.find(
      (images) => images.position == PosAds.HOME_CENTER
    )
    const adsMembershipCenter = res.data.data.find(
      (images) => images.position == PosAds.MEMBERSHIP_CENTER
    )
    const adsVGaLeft = res.data.data.find(
      (images) => images.position == PosAds.VGA_LEFT
    )
    return { sliders, adsHomeCenter, adsMembershipCenter, adsVGaLeft }
  }
  return {
    sliders: []
  }
}
