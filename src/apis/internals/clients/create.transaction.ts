'use client'
import { createAxiosInstanceClient } from '@/apis'
import { TTransactionBodyRequest } from '@/app/api/create-transaction/route'
import { API_INTERNAL_ENDPOINT } from '@/configs'
import { STATUS_VGA } from '@/types/enum'
import { TPaymentInfo } from '@/types/type'

type TReturnCreateTransaction = {
  success: boolean
  data: TPaymentInfo
  redirect: null | string
  error: STATUS_VGA | null
}

export const apiCreateTransaction = async (
  bodyRequest: TTransactionBodyRequest
): Promise<TReturnCreateTransaction> => {
  const axiosInstance = createAxiosInstanceClient(location.origin)
  const res = await axiosInstance.post<TReturnCreateTransaction>(
    API_INTERNAL_ENDPOINT.CREATE_TRANSACTION,
    bodyRequest
  )
  return res.data
}
