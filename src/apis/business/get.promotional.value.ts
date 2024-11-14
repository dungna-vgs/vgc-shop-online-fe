import { createAxiosInstanceServer } from '@/apis'
import { API_ENDPOINT } from '@/configs'
import { TPromotionValue } from '@/types/type'
import { getStoreDomain } from '@/utils/server'

export type TQueryParamsPromotional = {
  type: string
  item_id: number | string
}

type TReturnGetPromotionalValue = {
  success: boolean
  data: TPromotionValue
  redirect: null | string
}

export const apiGetPromotionalValue = async (
  params: TQueryParamsPromotional
): Promise<TReturnGetPromotionalValue> => {
  const [origin] = getStoreDomain()
  console.log('origin: ', origin)
  const axiosInstance = createAxiosInstanceServer(origin!)
  if (origin) {
    const res = await axiosInstance.get<TReturnGetPromotionalValue>(
      API_ENDPOINT.GET_PROMOTIONAL_VALUE,
      { params }
    )
    console.log('return here')
    console.log(res.data)
    return res.data
  }
  console.log('return 222222')
  return {
    success: false,
    data: {} as TPromotionValue,
    redirect: null
  }
}
