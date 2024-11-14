//Tìm kiếm tất cả
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { API_ENDPOINT } from '@/configs'
import { createAxiosInstanceServer } from '@/apis'
import { isValidDomainStore, TRequest } from '@/utils'
import { getQueryRequest } from '@/utils/server'
import { getConfigs } from '@/apis/business/configs'

export async function GET(request: NextRequest) {
  const req: TRequest = getQueryRequest<null>(request)
  const { origin } = req
  if (!isValidDomainStore(req)) {
    return NextResponse.json({
      success: false,
      message: origin,
      data: null,
      redirect: `${origin}/not-found`
    })
  }

  const isMaintain = await getConfigs()
  if (isMaintain) {
    return NextResponse.json({
      success: false,
      data: null,
      redirect: `${origin}/maintainance`
    })
  }
  const axiosInstance = createAxiosInstanceServer(origin)
  const res = await axiosInstance.get(API_ENDPOINT.GET_SIGNIFICANCES)
  return NextResponse.json({
    success: true,
    data: res.data.data,
    isMaintain,
    redirect: null
  })
}
