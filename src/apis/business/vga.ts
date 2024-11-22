// SEARCH_VGA

import { createAxiosInstanceServer } from '@/apis'
import { API_ENDPOINT } from '@/configs'
import { TVga } from '@/types/type'
import { getStoreDomain } from '@/utils/server'

type TMembershipPackageResponse = {
  data: {
    data: TVga[]
    total: number
    from: number
    per_page: number
    last_page: number
  }
}

export type TQueryParamsVGA = {
  limit: number
  page: number
  significance_id?: number
  money_to?: number
  money_from?: number
  direction?: string
}

type TApiVGAs = {
  data: TVga[]
  total: number
  from: number
  per_page: number
  last_page: number
  redirect: string | null
}
export const getVGAs = async (
  params: TQueryParamsVGA = {
    page: 1,
    limit: 24
  }
): Promise<TApiVGAs> => {
  const [origin] = getStoreDomain()
  console.log('origin: ', params)
  try {
    if (origin) {
      const axiosInstance = createAxiosInstanceServer(origin)
      const res = await axiosInstance.get<TMembershipPackageResponse>(
        API_ENDPOINT.SEARCH_VGA,
        { params }
      )
      return {
        data: res.data.data.data,
        total: res.data.data.total,
        from: res.data.data.from,
        per_page: res.data.data.per_page,
        last_page: res.data.data.last_page,
        redirect: null
      }
    }
  } catch (error) {
    console.log(error)
  }
  return {
    data: [],
    total: 0,
    from: 0,
    per_page: 0,
    last_page: 0,
    redirect: `${origin}/not-found`
  }
}
