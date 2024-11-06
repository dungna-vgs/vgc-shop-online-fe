import { createAxiosInstanceServer } from '@/apis'
import { API_ENDPOINT } from '@/configs'
import { getStoreDomain } from '@/utils/server'

export const getConfigs = async () => {
  const [origin] = getStoreDomain()
  if (origin) {
    const axiosInstance = createAxiosInstanceServer(origin)
    const res = await axiosInstance.get(API_ENDPOINT.ECOMMERCE_STATUS)
    return {
      isMaintain: res.data.data.maintenance_mode,
      showSpecialDiscount: res.data.data.show_special_discount
    }
  }
  return {
    isMaintain: false,
    showSpecialDiscount: false
  }
}
