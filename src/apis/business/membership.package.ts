import { createAxiosInstanceServer } from '@/apis'
import { API_ENDPOINT } from '@/configs'
import { TFeePackage } from '@/types/type'
import { getStoreDomain } from '@/utils/server'

type TMembershipPackageResponse = {
  data: TFeePackage[]
}

export const getMembersipPackages = async () => {
  try {
    const [origin] = getStoreDomain()
    if (origin) {
      const axiosInstance = createAxiosInstanceServer(origin)
      const res = await axiosInstance.get<TMembershipPackageResponse>(
        API_ENDPOINT.LIST_MEMBERSHIP_PACKAGES,
        { params: { page: 1, limit: 1000 } }
      )
      return res.data.data
    }
  } catch (e) {
    console.log(e)
  }
  return []
}
