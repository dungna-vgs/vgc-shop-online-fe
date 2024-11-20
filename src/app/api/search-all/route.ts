//Tìm kiếm tất cả
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { API_ENDPOINT } from '@/configs'
import { createAxiosInstanceServer } from '@/apis'
import { isValidDomainStore } from '@/utils'
import Joi from 'joi'
import { getQueryRequest } from '@/utils/server'

type TParams = {
  keyword: string
  page?: number
  limit?: number
}

function validation(params: TParams) {
  const schema = Joi.object({
    keyword: Joi.string().required(),
    page: Joi.number(),
    limit: Joi.number().default(20)
  })
  return schema.validate(params)
}

export async function GET(request: NextRequest) {
  const req = getQueryRequest<TParams>(request)
  const { origin, query } = req
  const { error, warning, value: params } = validation(query)
  if (error || warning) {
    return NextResponse.json({
      success: false,
      error,
      warning,
      redirect: `${origin}/not-found`
    })
  }

  if (!isValidDomainStore(req)) {
    return NextResponse.json({
      success: false,
      message: origin,
      data: null,
      redirect: `${origin}/not-found`
    })
  }
  const axiosInstance = createAxiosInstanceServer(origin)
  const res = await axiosInstance.get(API_ENDPOINT.SEARCH_ALL, {
    params
  })
  let total = res.data.data.list_vga.total
  if (total < res.data.data.membership_package.total) {
    total = res.data.data.membership_package.total
  }

  let page = res.data.data.list_vga.last_page
  if (page < res.data.data.membership_package.last_page) {
    page = res.data.data.membership_package.last_page
  }
  return NextResponse.json({
    success: true,
    data: {
      list_vga: res.data.data.list_vga.data,
      membership_package: res.data.data.membership_package.data,
      total,
      page
    },
    redirect: null
  })
}
