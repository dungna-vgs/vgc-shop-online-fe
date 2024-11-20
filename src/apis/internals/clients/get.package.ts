'use client'
import { createAxiosInstanceClient } from '@/apis'
import { API_INTERNAL_ENDPOINT } from '@/configs'
import { TFeePackage, TGolfer } from '@/types/type'

export type TParamsGetFeePackage = {
  packageId: string
  userId?: TGolfer['id']
}

type TReturnGetFeePackage = {
  success: boolean
  data: TFeePackage
  redirect: null | string
}

export const apiGetFeePackage = async (
  params: TParamsGetFeePackage
): Promise<TReturnGetFeePackage> => {
  const axiosInstance = createAxiosInstanceClient(location.origin)
  const res = await axiosInstance.get<TReturnGetFeePackage>(
    API_INTERNAL_ENDPOINT.GET_MEMBERSHIP_PACKAGE,
    { params }
  )
  return res.data
}
