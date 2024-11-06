'use client'
import { createAxiosInstanceClient } from '@/apis'
import { API_INTERNAL_ENDPOINT } from '@/configs'
import { TPaymentInfo, TPaymentStatus } from '@/types/type'

export type TParamsCheckTransaction = {
  transaction_id: TPaymentInfo['transaction_id']
}

type TReturnCheckTransaction = {
  success: boolean
  data: TPaymentStatus
  redirect: null | string
}

export const apiCheckTransactionStatus = async (
  params: TParamsCheckTransaction
): Promise<TReturnCheckTransaction> => {
  const axiosInstance = createAxiosInstanceClient(location.origin)
  const res = await axiosInstance.get<TReturnCheckTransaction>(
    API_INTERNAL_ENDPOINT.CHECK_TRANSACTION_STATUS,
    { params }
  )
  return res.data
}
