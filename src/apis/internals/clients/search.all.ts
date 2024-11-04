'use client'
import { createAxiosInstanceClient } from '@/apis'
import { API_INTERNAL_ENDPOINT } from '@/configs'
import { TVga } from '@/types/type'

type TParams = {
  keyword: string
}

type TSearchAllResponse = {
  success: boolean
  redirect: string | null
  data: {
    list_vga: TVga[]
    membership_package: []
  }
}

type TReturnSeachAall = {
  success: boolean
  redirect: string | null
  data: {
    vgas: TVga[]
    membershipPackage: []
  }
}
export const apiSearchAll = async (
  params: TParams
): Promise<TReturnSeachAall> => {
  const axiosInstance = createAxiosInstanceClient(location.origin)
  const res = await axiosInstance.get<TSearchAllResponse>(
    API_INTERNAL_ENDPOINT.SEARCH_ALL,
    {
      params
    }
  )
  return {
    success: res.data.success,
    redirect: res.data.redirect,
    data: {
      vgas: res.data.data.list_vga,
      membershipPackage: res.data.data.membership_package
    }
  }
}
