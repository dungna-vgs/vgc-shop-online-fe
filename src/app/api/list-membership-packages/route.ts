//Tìm kiếm tất cả
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { API_ENDPOINT } from '@/configs'
import { createAxiosInstanceServer } from '@/apis'
import { isValidDomainStore, TRequest } from '@/utils'
import { getQueryRequest } from '@/utils'

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

  const axiosInstance = createAxiosInstanceServer(origin)
  const [res, resStatus] = await Promise.all([
    axiosInstance.get(API_ENDPOINT.LIST_MEMBERSHIP_PACKAGES),
    axiosInstance.get(API_ENDPOINT.ECOMMERCE_STATUS)
  ])
  if (resStatus.data.data.maintenance_mode) {
    return NextResponse.json({
      success: false,
      data: null,
      redirect: `${origin}/maintainance`
    })
  }
  if (resStatus.data.data.show_special_discount) {
    // call api get
  }
  return NextResponse.json({
    success: true,
    data: res.data.data,
    resStatus: resStatus.data.data,
    redirect: null
  })
}
