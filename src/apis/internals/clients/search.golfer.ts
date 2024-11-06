'use client'
import { createAxiosInstanceClient } from '@/apis'
import { API_INTERNAL_ENDPOINT } from '@/configs'
import { TGolfer } from '@/types/type'

export type TParamsSearchGolfer = {
  keyword: string
}

type TReturnSeachGolfers = {
  success: boolean
  data: TGolfer[]
  redirect: null | string
}
export const apiSearchGolfer = async (
  params: TParamsSearchGolfer
): Promise<TReturnSeachGolfers> => {
  const axiosInstance = createAxiosInstanceClient(location.origin)
  const res = await axiosInstance.get<TReturnSeachGolfers>(
    API_INTERNAL_ENDPOINT.SEARCH_GOLFER,
    {
      params
    }
  )
  return res.data
}
