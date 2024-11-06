import { createAxiosInstanceServer } from '@/apis'
import { API_ENDPOINT } from '@/configs'
import { TFeePackage } from '@/types/type'
import { getStoreDomain } from '@/utils/server'

type TMembershipPackageResponse = {
  data: TFeePackage[]
}

export const getMembersipPackages = async () => {
  const [origin] = getStoreDomain()
  if (origin) {
    const axiosInstance = createAxiosInstanceServer(origin)
    const res = await axiosInstance.get<TMembershipPackageResponse>(
      API_ENDPOINT.LIST_MEMBERSHIP_PACKAGES
    )
    return res.data.data
  }
  return []
}
