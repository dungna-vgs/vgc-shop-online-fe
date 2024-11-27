'use client'
import { createAxiosInstanceClient } from '@/apis'
import { API_INTERNAL_ENDPOINT } from '@/configs'
import { TVoucher } from '@/types/type'

type TVoucherResponse = {
  error_code: number
  data: TVoucher
}
export type TParamsCheckDiscountCode = {
  voucher_code: string
  from?: string
  upgrade_id?: number
  number?: number
  provider: string
}

type TReturnDiscount = {
  success: boolean
  data: TVoucherResponse
  redirect: null | string
}
export const apiCheckDiscountCode = async (
  params: TParamsCheckDiscountCode
): Promise<TReturnDiscount> => {
  const axiosInstance = createAxiosInstanceClient(location.origin)
  const res = await axiosInstance.get<TReturnDiscount>(
    API_INTERNAL_ENDPOINT.CHECK_DISCOUNT_CODE,
    {
      params
    }
  )
  return res.data
}
