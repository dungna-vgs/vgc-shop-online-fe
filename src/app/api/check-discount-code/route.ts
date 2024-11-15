//Tìm kiếm tất cả
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { API_ENDPOINT } from '@/configs'
import { createAxiosInstanceServer } from '@/apis'
import { isValidDomainStore } from '@/utils'
import Joi from 'joi'
import { getQueryRequest } from '@/utils/server'

type TParams = {
  voucher_code: string
}

function validation(params: TParams) {
  const schema = Joi.object<TParams>({
    voucher_code: Joi.string().required()
  })
  return schema.validate(params)
}

export async function GET(request: NextRequest) {
  const req = getQueryRequest<TParams>(request)
  const { origin, query } = req
  const { error, warning, value: params } = validation(query)
  if (error || warning) {
    return NextResponse.json({
      message: 'Dữ liệu không hợp lệ!',
      success: false,
      error,
      warning,
      redirect: `${origin}/not-found`
    })
  }

  if (!isValidDomainStore(req)) {
    return NextResponse.json({
      message: 'Không tìm thấy đại lý này!',
      success: false,
      origin,
      data: null,
      redirect: `${origin}/not-found`
    })
  }

  const axiosInstance = createAxiosInstanceServer(origin)
  const res = await axiosInstance.get(API_ENDPOINT.CHECK_DISCOUNT_CODE, {
    params
  })
  console.log('JSON.stringify(params): ')
  console.log(JSON.stringify(params))
  console.log('JSON.stringify(res.data): ')
  console.log(JSON.stringify(res.data))
  console.log(origin)
  return NextResponse.json({
    success: true,
    data: res.data,
    redirect: null,
    origin 
  })
}
