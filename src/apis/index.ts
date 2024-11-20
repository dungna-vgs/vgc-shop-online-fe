import { TYPE_ENVIRONMENT } from '@/configs'
import axios from 'axios'

// để gọi ở server nextjs lên server business
export function createAxiosInstanceServer(
  origin: string,
  cfIp?: string | null,
  forwardedIps?: string | null
) {
  if (TYPE_ENVIRONMENT.LOCALHOST === process.env.ENVIROMENT) {
    origin = 'https://store.dev.vgcorp.vn'
  }

  return axios.create({
    baseURL: process.env.API_URL,
    headers: {
      'Content-Type': 'application/json',
      'x-client-domain': origin,
      'x-api-key': process.env.API_KEY,
      'vgs-client-ips': forwardedIps,
      'cf-client-ip': cfIp
    }
  })
}

// để sử dụng gọi ở client lên server nextjs
export function createAxiosInstanceClient(origin: string) {
  if (TYPE_ENVIRONMENT.LOCALHOST === process.env.ENVIROMENT) {
    origin = process.env.APP_URL!
  }
  return axios.create({
    baseURL: origin
  })
}
