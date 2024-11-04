import { headers } from 'next/headers'
import { EDevice } from '@/types/type'
import { TYPE_ENVIRONMENT } from '@/configs'

export function getStoreDomain(): [string | null, boolean] {
  if (TYPE_ENVIRONMENT.LOCALHOST === process.env.ENVIROMENT) {
    return [process.env.APP_URL!, true]
  }
  const headersList = headers()
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const origin = `${protocol}://${host}`
  if (!!(origin && origin.includes('-store.'))) {
    return [`${protocol}://${host}`, false]
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
