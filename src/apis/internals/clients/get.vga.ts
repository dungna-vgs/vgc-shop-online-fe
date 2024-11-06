'use client'
import { createAxiosInstanceClient } from '@/apis'
import { API_INTERNAL_ENDPOINT } from '@/configs'
import { TVga } from '@/types/type'

export type TParamsGetVga = {
  vga: string
}

type TReturnGetVga = {
  success: boolean
  data: TVga
  redirect: null | string
}

export const apiGetVga = async (
  params: TParamsGetVga
): Promise<TReturnGetVga> => {
  const axiosInstance = createAxiosInstanceClient(location.origin)
  const res = await axiosInstance.get<TReturnGetVga>(
    API_INTERNAL_ENDPOINT.GET_VGA,
    { params }
  )
  return res.data
}
