import { createAxiosInstanceServer } from '@/apis'
import { API_ENDPOINT } from '@/configs'
import { TPromotion } from '@/types/type'
import { getStoreDomain } from '@/utils/server'

type TPromotionResponse = {
  data: TPromotion[]
}
export const apiPromotion = async () => {
  const [origin] = getStoreDomain()
  if (origin) {
    const axiosInstance = createAxiosInstanceServer(origin)
    const res = await axiosInstance.get<TPromotionResponse>(
      API_ENDPOINT.PROMOTION_PROGRAM
    )
    return res.data.data
  }
  return []
}
