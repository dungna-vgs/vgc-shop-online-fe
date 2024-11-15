import { headers } from 'next/headers'
import { EDevice } from '@/types/type'
import { TYPE_ENVIRONMENT } from '@/configs'
import { NextRequest } from 'next/server'
import { TRequest } from '@/utils'

const getValidDomain = () => {
  const headersList = headers()
  console.log('-----------------------------------------------')
  console.log('headersList: ', headersList)
  const domainFromHost = headersList.get('host')
  const domainFromReferer = headersList.get('referer')
  const domainFromXForwardedHost = headersList.get('x-forwarded-host')

  let domain = [
    domainFromHost,
    domainFromReferer,
    domainFromXForwardedHost
  ].find((url: string | null) => {
    if (url) {
      return url.includes('vgcorp.vn') || url.includes('.shop')
    }
  })
  console.log({ domain })
  if (!!domain) {
    if (!domain.includes('http')) {
      domain = `https://${domain}`
    }
    const { origin } = new URL(domain)
    return origin
  }
  return null
}

export const getIps = () => {
  const headersList = headers()
  const forwardedIps = headersList.get('x-forwarded-for')
  const cfIp = headersList.get('cf-connecting-ip')
  return {
    forwardedIps,
    cfIp
  }
}

export function getStoreDomain(): [string | null, boolean] {
  if (TYPE_ENVIRONMENT.LOCALHOST === process.env.ENVIROMENT) {
    return [process.env.APP_URL!, true]
  }
  const domain = getValidDomain()
  if (domain) {
    const { origin } = new URL(domain)
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
  const domain = getValidDomain()
  const { searchParams } = new URL(req.url)
  const query = Object.fromEntries(searchParams) as T
  if (domain) {
    const { origin } = new URL(domain!)
    return {
      ...req,
      origin,
      query
    } as TRequest<T>
  } else {
    return {
      ...req,
      origin: '',
      query
    } as TRequest<T>
  }
}
