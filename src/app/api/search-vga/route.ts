//Tìm kiếm tất cả
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { API_ENDPOINT } from '@/configs'
import { createAxiosInstanceServer } from '@/apis'
import { isValidDomainStore } from '@/utils'
import Joi from 'joi'
import { getQueryRequest } from '@/utils/server'

type TParams = {
  vga?: string
  significance_id?: number
  money_to?: number
  money_from?: number
  page?: number
  limit?: number
  direction?: string
}

function validation(params: TParams) {
  const schema = Joi.object<TParams>({
    page: Joi.number(),
    limit: Joi.number().default(24),
    vga: Joi.string().allow(''),
    money_to: Joi.number(),
    money_from: Joi.number(),
    significance_id: Joi.number(),
    direction: Joi.string().valid('asc', 'desc').default('desc')
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
  const res = await axiosInstance.get(API_ENDPOINT.SEARCH_VGA, {
    params
  })
  console.log('JSON.stringify(params): ')
  console.log(JSON.stringify(params))
  console.log('JSON.stringify(res.data): ')
  console.log(JSON.stringify(res.data))
  return NextResponse.json({
    success: true,
    data: res.data.data.data,
    total: res.data.data.total,
    from: res.data.data.from,
    per_page: res.data.data.per_page,
    last_page: res.data.data.last_page,
    limit: res.data.data.to,
    redirect: null
  })
}
