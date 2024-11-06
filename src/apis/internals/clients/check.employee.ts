'use client'
import { createAxiosInstanceClient } from '@/apis'
import { API_INTERNAL_ENDPOINT } from '@/configs'
import { TEmployeeResponse } from '@/types/type'

export type TParamsCheckEmployeeCode = {
  employee_code: string
}

type TReturnEmployee = {
  success: boolean
  data: TEmployeeResponse
  redirect: null | string
}
export const apiCheckEmployeeCode = async (
  params: TParamsCheckEmployeeCode
): Promise<TReturnEmployee> => {
  const axiosInstance = createAxiosInstanceClient(location.origin)
  const res = await axiosInstance.get<TReturnEmployee>(
    API_INTERNAL_ENDPOINT.CHECK_EMPLOYEE_CODE,
    {
      params
    }
  )
  return res.data
}
