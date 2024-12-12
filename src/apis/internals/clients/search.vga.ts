'use client'
import { createAxiosInstanceClient } from '@/apis'
import { API_INTERNAL_ENDPOINT } from '@/configs'
import { TVga } from '@/types/type'

export type TParamsSearchVGA = {
  vga?: string
  significance_id?: number
  money_to?: number
  money_from?: number
  page?: number
  limit?: number
  direction?: string
}

type TReturnSeachAall = {
  success: boolean
  data: TVga[]
  total: number
  from: number
  per_page: number
  last_page: number
  limit: number
  redirect: null
}
export const apiSearchVGA = async (
  params: TParamsSearchVGA
): Promise<TReturnSeachAall> => {
  const axiosInstance = createAxiosInstanceClient(location.origin)
  const res = await axiosInstance.get<TReturnSeachAall>(
    API_INTERNAL_ENDPOINT.SEARCH_VGA,
    {
      params
    }
  )
  return res.data
}
