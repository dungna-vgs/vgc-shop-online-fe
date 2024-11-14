import { headers } from 'next/headers'
import { EDevice } from '@/types/type'
import { TYPE_ENVIRONMENT } from '@/configs'
import { NextRequest } from 'next/server'
import { TRequest } from '@/utils'

export function getStoreDomain(): [string | null, boolean] {
  if (TYPE_ENVIRONMENT.LOCALHOST === process.env.ENVIROMENT) {
    return [process.env.APP_URL!, true]
  }
  const headersList = headers()
  const host = headersList.get('referer')

  if (!!host) {
    const { origin } = new URL(host)
    return [origin, false]
  }
  return [null, true]
}

export function isMobile(): EDevice {
  const userAgent = headers().get('user-agent') || ''
  const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(
    userAgent
  )
  if (isMobile) {
    return EDevice.MOBILE
  }
  return EDevice.DESKTOP
}

export function getQueryRequest<T>(req: NextRequest) {
  const headersList = headers()
  const domain = headersList.get('referer') || req.url
  const { searchParams } = new URL(req.url)
  const { origin } = new URL(domain)
  const query = Object.fromEntries(searchParams) as T
  return {
    ...req,
    origin,
    query
  } as TRequest<T>
}
